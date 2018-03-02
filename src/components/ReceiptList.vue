<template lang="html">
  <div>
    <div class="receipt-list">
      <h3>Kaikki kuitit</h3>
      <div v-if="loading">
        <p>Ladataan kuitteja...</p>
      </div>
      <table>
        <tr v-for="(receipt, idx) in sorted(receipts)" :key="idx" @click="selected = receipt" :class="{active: selected == receipt}">
          <td>{{ formatDate(receipt.meta.date) }}</td>
          <td>{{ truncate(receipt.meta.store) }}</td>
          <td>{{ sum(receipt).toFixed(2) }}</td>
          <td><span v-if="selected == receipt">&gt;&gt;</span></td>
        </tr>
      </table>
    </div>
    <div class="selected-receipt">
      <div class="receipt-area">
        <receipt v-if="selected.hasOwnProperty('meta')" :receipt="selected"></receipt>
      </div>
    </div>
  </div>
</template>

<script>
import db from '@/firebase.js'
import firebase from 'firebase'

import Receipt from '@/components/Receipt'

export default {
  name: 'receipt-list',
  components: {
    receipt: Receipt
  },
  data () {
    return {
      receipts: [],
      selected: {},
      loading: true
    }
  },
  mounted () {
    let currentUser = firebase.auth().currentUser
    db.ref(`${currentUser.uid}/receipts`).once('value').then((snap) => {
      this.receipts = snap.val()
      this.loading = false
    })
  },
  methods: {
    sortByDate (a, b) {
      if (a.meta.date < b.meta.date) {
        return 1
      } else {
        return -1
      }
    },
    sum (receipt) {
      return Object.values(receipt.items).map(r => r.price).reduce((price, sum) => price + sum, 0)
    },
    formatDate (date) {
      let splits = date.split('-')
      let year = splits[0]
      let month = splits[1]
      let day = splits[2]

      return `${day}.${month}.${year}`
    },
    sorted (receipts) {
      return Object.values(receipts).sort(this.sortByDate)
    },
    truncate (storeName) {
      if (storeName.length > 18) {
        return `${storeName.substring(0, 18)}...`
      } else { return storeName }
    }
  }
}
</script>

<style lang="scss" scoped>
.receipt-list {
  width: 50%;
  display: inline-block;
  text-align: left;

  tr {
    cursor: pointer;
  }
}

.selected-receipt {
  min-width: 40%;
  min-height: 1px;
  display: inline-block;
  float: right;
  clear: both;
}

h3 {
  font-weight: 600;
  text-decoration: underline;
}

tr.active {
  font-weight: 600
}
</style>
