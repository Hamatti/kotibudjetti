<template lang="html">
  <div>
    <div class="info" v-if="message">
      <span v-if="level === 'success'" class="fa fa-check-circle"></span>
      <span v-if="level === 'warning'" class="fa fa-exclamation-circle"></span>
       {{ message }}
     </div>
  </div>
</template>

<script>
export default {
  name: 'info-box',
  props: ['message', 'level']
}
</script>

<style lang="scss" scoped>
@import '../assets/variables.scss';

.info {
  background-color: $white;
  color: $main-dark;
  margin-top: 10px;
  padding: 10px 0;
}
</style>
