<template lang="html">
  <div>

    <!-- see all receipts -->
    <receipt-list></receipt-list>
    <!-- list of [storename], [date], [sum]€ -->
    <!-- click to show entire receipt, allow edit mode -->

    <!-- see aggregate view -->
    <!-- Monthly -->
    <!-- By Store -->
    <!-- By item -->
  </div>

</template>

<script>
import ReceiptList from '@/components/ReceiptList'

export default {
  name: 'index',
  components: {
    'receipt-list': ReceiptList
  }
}
</script>

<style lang="css">
</style>
