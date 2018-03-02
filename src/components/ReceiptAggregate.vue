<template lang="html">
  <div>
    <div class="stats">
      <h4>Kulutus kuukausittain</h4>
      <table>
        <thead>
          <th>Kuukausi</th>
          <th>Kulutus</th>
        </thead>
        <tr v-for="(spend, name) in months" :key="name">
          <td> {{ name }}</td>
          <td class="price"> {{ spend.toFixed(2) }}</td>
        </tr>
      </table>
    </div>
    <div class="stats">
      <h4>Kulutus kaupoittain</h4>
      <table>
        <thead>
          <th @click="storeSortBy('name')">Kauppa</th>
          <th @click="storeSortBy('spend')">Kulutus</th>
        </thead>
        <tr v-for="(spend, name) in stores" :key="name">
          <td> {{ name }}</td>
          <td class="price"> {{ spend.toFixed(2) }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import db from '@/firebase.js'
import firebase from 'firebase'

export default {
  name: 'receipt-aggregate',
  data () {
    return {
      receipts: [],
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
  computed: {
    months () {
      return this.sumByMonth(this.receipts)
    },
    stores () {
      return this.sumByStore(this.receipts)
    }
  },
  methods: {
    sum (receipts) {
      let prices = Object.values(receipts).map(rs => rs.items).map(i => i.map(r => r.price))
      return prices.reduce((sum, price) => sum + parseFloat(price), 0)
    },
    sumByMonth (receipts) {
      let aggregate = {}
      let months = Object.values(receipts)
        .map(r => r.meta.date)
        .map(d => `${d.split('-')[1]}-${d.split('-')[0]}`)
        .filter((m, idx, self) => self.indexOf(m) === idx)

      months.forEach(month => {
        let matchingReceipts = Object.values(receipts)
          .filter(r => {
            let d = r.meta.date
            let match = `${d.split('-')[1]}-${d.split('-')[0]}`
            return month === match
          })
        aggregate[month] = this.sum(matchingReceipts)
      })
      return Object.assign({}, aggregate)
    },
    sumByStore (receipts) {
      let aggregate = {}
      let stores = Object.values(receipts)
        .map(r => r.meta.store)
        .filter((s, idx, self) => self.indexOf(s) === idx)

      stores.forEach(store => {
        let matchingReceipts = Object.values(receipts)
          .filter(r => {
            return store === r.meta.store
          })
        aggregate[store] = this.sum(matchingReceipts)
      })
      return Object.assign({}, aggregate)
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

h4 {
  font-weight: 600;
  text-decoration: underline;
}

.stats {
  width: 40%;
  display: inline-block;

  table {
    margin: auto;
    width: 60%;
    text-align: left;

    .price {
      text-align: right;
    }
    .price:after {
      content: ' €'
    }

    th:last-child {
      text-align: right;
    }
  }
}

</style>
