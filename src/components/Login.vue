<template lang="html">
  <div class="loginform">
    <input type="text" name="email" placeholder="Sähköposti" v-model="login.email" >
    <input type="password" name="password" placeholder="Salasana" v-model="login.password">
    <button class="button button-block" @click="log_in">Kirjaudu sisään</button>
    <button type="button" class="link" name="button" @click="$emit('forgotPassword')">Unohtuiko salasana?</button>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'login',
  data () {
    return {
      login: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    log_in () {
      firebase.auth().signInWithEmailAndPassword(this.login.email, this.login.password)
        .catch(err => {
          console.log(err)
        })
        .then((res) => {
          this.$router.replace('/')
        })
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
