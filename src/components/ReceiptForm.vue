<template lang="html">
<div class="wrapper">
  <div class="form">
    <ul class="tab-group">
      <li class="tab" @click="config.activeTab = 'Meta'" :class="{ active: isActive('Meta') }">Kuitin perustiedot</li>
      <li class="tab" @click="config.activeTab = 'Products'" :class="{ active: isActive('Products') }">Ostokset</li>
    </ul>

    <div class="tab-content">
      <div class="recipe_area" v-if="isActive('Meta')">
        <input  type="text" v-model="formData.metadata.store" placeholder="Kauppa" @keyup="receipt.meta.store = formData.metadata.store"> <br>
        <input  type="date" v-model="formData.metadata.date" @change="receipt.meta.date = formData.metadata.date"> <br>
      </div>
    </div>
    <div v-if="isActive('Products')">
      <ul class="tab-group sm">
        <li @click="config.inputMode = 'SINGLE'" :class="{active: isInputMode('SINGLE')}">
          Yksittäin
        </li>
        <li @click="config.inputMode = 'BATCH'" :class="{active: isInputMode('BATCH')}">
          Listana
        </li>
      </ul>

      <div v-if="isInputMode('SINGLE')">
        <input ref="product" type="text" v-model="formData.singleProduct.name" value="" placeholder="Syötä uusi tuote"> <br>
        <input type="number" name="" value="" placeholder="Syötä hinta" v-model="formData.singleProduct.price" @keyup.enter="addProduct"> <br>
        <button type="button" class="button" @click="processProducts" name="button"><span class="fa fa-plus"></span> Lisää tuote</button>
        <button type="button" class="button" @click="duplicatePrevious" name="button"><span class="fa fa-copy"></span> Toista edellinen</button>
      </div>

      <div v-if="isInputMode('BATCH')">
        <textarea v-model="formData.batchProduct.itemList" value="" placeholder="Syötä tuotteet\ntuote|hinta"></textarea> <br>
        <button type="button" class="button" @click="processProducts" name="button">Lisää tuotteet</button>
      </div>

    </div>

    <hr class="divider">
      <button class="button" @click="addReceipt" :disabled="!(canAddReceipt)">Tallenna kuitti</button>
  </div>
  <div class="receipt">
    <receipt :receipt="receipt" :editable="false"></receipt>
  </div>
</div>
</template>

<script>
import receipt from './Receipt.vue'

// Helper function to get today's date in Y-m-d format for date picker default value
const toDateInputValue = (date) => {
  var local = new Date(date)
  local.setMinutes(date.getMinutes() - date.getTimezoneOffset())
  return local.toJSON().slice(0, 10)
}

export default {
  name: 'receipt-form',
  components: {
    receipt
  },
  computed: {
    canAddReceipt () {
      let validMeta = this.receipt.meta.store && this.receipt.meta.date
      let validProducts = this.receipt.items.length > 0
      return !!(validMeta) && validProducts
    }
  },
  data () {
    return {
      config: {
        activeTab: 'Meta',
        inputMode: 'SINGLE',
        confirm: {}
      },
      formData: {
        singleProduct: {
          name: '',
          price: ''
        },
        batchProduct: {
          itemList: ''
        },
        metadata: {
          store: '',
          date: this.today()
        }
      },
      receipt: {
        meta: {
          store: '',
          date: this.today()
        },
        items: [],
        origin: -1
      }
    }
  },
  methods: {
    isActive (tab) {
      return this.config.activeTab === tab
    },
    isInputMode (mode) {
      return this.config.inputMode === mode
    },
    addReceipt () {
      if (!this.canAddReceipt) {
        return
      }
      this.receipt.meta = this.formData.metadata
      // TODO: Refactor into a method and component
      this.config.confirm = {
        status: 0,
        msg: 'Kuitti tallennettu onnistuneesti!'
      }
      this.$emit('addReceipt', this.receipt)
      this.resetForm()
    },
    duplicatePrevious () {
      if (this.receipt.items.length === 0) {
        return
      }
      let newProduct = this.receipt.items[this.receipt.items.length - 1]
      this.receipt.items.push(Object.assign({}, newProduct))
    },
    today () {
      return toDateInputValue(new Date())
    },
    processProducts () {
      if (this.isInputMode('SINGLE')) {
        this.processSingleProduct()
      } else {
        this.processBatchProducts()
      }
    },
    processSingleProduct () {
      let newProduct = Object.assign({}, this.formData.singleProduct)
      newProduct.price = parseFloat(newProduct.price)
      this.formData.singleProduct = {
        name: '',
        price: ''
      }
      this.receipt.items.push(newProduct)
      if (this.config.inputMode === 'SINGLE') {
        this.$refs.product.focus()
      }
    },
    processBatchProducts () {
      let products = this.formData.batchProduct.itemList
      products.split('\n').forEach(p => {
        let parts = p.split('|')
        this.formData.singleProduct = {
          name: parts[0],
          price: parts[1]
        }
        this.processSingleProduct()
      })
      this.formData.batchProduct.itemList = ''
    },
    resetForm () {
      this.config = {
        activeTab: 'Meta',
        inputMode: 'SINGLE',
        confirm: {}
      }
      this.formData = {
        singleProduct: {
          name: '',
          price: ''
        },
        batchProduct: {
          itemList: ''
        },
        metadata: {
          store: '',
          date: this.today()
        }
      }
      this.receipt = {
        meta: {
          store: '',
          date: this.today()
        },
        items: [],
        origin: -1
      }
    }
  }
}

</script>

<style lang="scss" scoped>
// @import "compass/css3";

$body-bg: #c1bdba;
$form-bg: #13232f;
$white: #ffffff;

$main: #1ab188;
$main-light: lighten($main,5%);
$main-dark: darken($main,5%);

$button: #ff0000;
$button-dark: #ae0404;

$gray-light: #a0b3b0;
$gray: #ddd;

$thin: 300;
$normal: 400;
$bold: 600;
$br: 4px;

*, *:before, *:after {
  box-sizing: border-box;
}

html {
  overflow-y: scroll;
}

body {
  background: $body-bg;
  font-family: 'Titillium Web', sans-serif;
}

a {
  text-decoration:none;
  color:$main;
  transition:.5s ease;
  &:hover {
    color:$main-dark;
  }
}

.form {
  background:rgba($form-bg,.9);
  border-radius:$br;
  box-shadow:0 4px 10px 4px rgba($form-bg,.3);
  display: inline-block;
  margin:40px 20px;
  max-width:600px;
  padding: 40px;
  width: 45%;
}

.receipt {
  display: inline-block;
  margin-top: 30px;
  vertical-align: top;
  width: 45%;
}

.tab-group {
  list-style:none;
  padding:0;
  margin:0 30px 30px 0;
  &:after {
    content: "";
    display: table;
    clear: both;
  }
  li {
    display:inline-block;
    text-decoration:none;
    padding:15px;
    background:rgba($gray-light,.25);
    color:$gray-light;
    font-size:20px;
    float:left;
    width:45%;
    text-align:center;
    cursor:pointer;
    transition:.5s ease;
    &:hover {
      background:$main-dark;
      color:$white;
    }
  }
  .active {
    background:$main;
    color:$white;
  }
  .submit {
    background:$button;
    color:$white;

    &:hover {
      background: $button-dark;
      color: $white;
    }
  }
}

ul.tab-group:last-child {
  margin-bottom: 0;
}

.tab-group.sm {
  li {
    font-size: 14px;
    width: 20%;
    text-align: center;
  }
}

h1 {
  text-align:center;
  color:$white;
  font-weight:$thin;
  margin:0 0 40px;
}

label {
  position:absolute;
  transform:translateY(6px);
  left:13px;
  color:rgba($white,.5);
  transition:all 0.25s ease;
  -webkit-backface-visibility: hidden;
  pointer-events: none;
  font-size:22px;
  .req {
    margin:2px;
    color:$main;
  }
}

label.active {
  transform:translateY(50px);
  left:2px;
  font-size:14px;
  .req {
    opacity:0;
  }
}

label.highlight {
  color:$white;
}

input, textarea {
  font-size:22px;
  display:block;
  width:100%;
  height:100%;
  padding:5px 10px;
  background:none;
  background-image:none;
  border:1px solid $gray-light;
  color:$white;
  border-radius:0;
  transition:border-color .25s ease, box-shadow .25s ease;
  &:focus {
    outline:0;
    border-color:$main;
  }
}

textarea {
  border:2px solid $gray-light;
  resize: vertical;
}

.field-wrap {
  position:relative;
  margin-bottom:40px;
}

.top-row {
  &:after {
    content: "";
    display: table;
    clear: both;
  }

  > div {
    float:left;
    width:48%;
    margin-right:4%;
    &:last-child {
      margin:0;
    }
  }
}

.button {
  border:0;
  outline:none;
  border-radius:0;
  padding:15px 15px;
  font-size:1.0rem;
  font-weight:$bold;
  text-transform: none;
  letter-spacing:.1em;
  background:$main;
  color:$white;
  transition:all.5s ease;
  -webkit-appearance: none;
  &:hover, &:focus {
    background:$main-dark;
  }
}

.button-block {
  display:block;
  width:100%;
}

button[disabled], button[disabled]:hover {
  background-color: $gray;
  color: $gray-light;
  cursor: default;
}
</style>
