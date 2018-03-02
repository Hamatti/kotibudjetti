<template lang="html">
  <div>
    <receipt-form @addReceipt="addReceipt"></receipt-form>
    </div>

</template>

<script>
import ReceiptForm from '@/components/ReceiptForm'
import firebase from 'firebase'
import db from '@/firebase.js'

export default {
  name: 'index',
  components: {
    'receipt-form': ReceiptForm
  },
  methods: {
    addReceipt (receipt) {
      let currentUser = firebase.auth().currentUser
      let ref = db.ref(`${currentUser.uid}/receipts`).push()
      ref.set(receipt)
    }
  }
}
</script>

<style lang="css">
</style>
