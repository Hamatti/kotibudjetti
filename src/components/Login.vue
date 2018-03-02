<template lang="html">
  <div class="loginform">
    <input type="text" name="email" placeholder="Sähköposti" v-model="login.email" >
    <input type="password" name="password" placeholder="Salasana" v-model="login.password">
    <button class="button button-block">Kirjaudu sisään</button>
    <button type="button" class="link" name="button">Unohtuiko salasana?</button>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      login: {
        email: '',
        password: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/variables.scss';

.loginform {
  width: 70%;
  margin: auto;
  margin-top: 30px;
}
</style>
