<template lang="html">
  <div>
    <div class="nav">
      <ul class="tab-group">
        <li class="tab" @click="activeTab = 'List'" :class="{ active: isActive('List') }">Kuittiselain</li>
        <li class="tab" @click="activeTab = 'Aggregate'" :class="{ active: isActive('Aggregate') }">Koosteet</li>
      </ul>
    </div>
    <receipt-list v-if="isActive('List')"></receipt-list>

    <receipt-aggregate v-if="isActive('Aggregate')"></receipt-aggregate>
  </div>

</template>

<script>
import ReceiptList from '@/components/ReceiptList'
import ReceiptAggregate from '@/components/ReceiptAggregate'

export default {
  name: 'index',
  components: {
    'receipt-list': ReceiptList,
    'receipt-aggregate': ReceiptAggregate
  },
  data () {
    return {
      activeTab: 'List'
    }
  },
  methods: {
    isActive (tab) {
      return tab === this.activeTab
    }
  }
}
</script>

<style lang="scss">
@import '../assets/variables.scss';

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
    width:46%;
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

.nav {
  width: 90%;
  margin: auto;
}
</style>
