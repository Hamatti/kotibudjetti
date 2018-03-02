<template lang="html">
  <div>
    <receipt-form @addReceipt="addReceipt"></receipt-form>
  </div>

</template>

<script>
import ReceiptForm from '@/components/ReceiptForm'

export default {
  name: 'index',
  components: {
    'receipt-form': ReceiptForm
  },
  methods: {
    addReceipt () {

    }
  }
}
</script>

<style lang="css">
</style>
