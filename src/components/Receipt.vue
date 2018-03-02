<template>
  <div>
    <header>
      <span class="store">{{ receipt.meta.store }}</span><br>
      <span class="date"> {{ receipt.meta.date }} </span>
    </header>

    <table>
      <tr v-for="(item, index) in receipt.items" :key="index">
        <td class="delete" @click="deleteItem(item)">x</td>
        <td class="product"> {{ item.name }}</td>
        <td class="price"> {{ item.price.toFixed(2) }}</td>
      </tr>
      <tfoot>
        <td></td>
        <td>YHTEENSÄ</td>
        <td class="price"> {{ sum.toFixed(2) }}</td>
      </tfoot>
    </table>
  </div>
</template>

<script>
export default {
  name: 'receipt',
  computed: {
    sum () {
      return this.receipt.items.map(i => i.price).reduce((a, b) => a + b, 0)
    }
  },
  methods: {
    deleteItem (item) {
      let idx = this.receipt.items.indexOf(item)
      this.receipt.items.splice(idx, 1)
    }
  },
  props: ['receipt']
}
</script>

<style scoped>

  div {
    background: #f7f7f7;
    color: black;
    display: inline-block;
    font-family: monospace;
    margin-right: 20px;
    margin-top: 20px;
    width: 80%;
    padding: 10px 15px;
  }

  header {
    margin-bottom: 20px;
    position: relative;
  }

  header .store {
    font-weight: 800;
  }

  header .date {
    font-style: italic;
    font-size: 0.8em;
  }

  table {
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    border-collapse: collapse;
  }

  td {
    text-align: left;
  }

  td:first-child {
    width: 10%;
  }

  td.delete {
    text-align: center;
    cursor: pointer;
    color: red;
  }

  td.price {
    text-align: right;
  }

  tfoot {
    border-top: 1px solid black;
    font-weight: 800;
  }
</style>
