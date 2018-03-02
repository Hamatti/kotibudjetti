<template lang="html">
  <div class="loginform">
    <input type="text" name="email" placeholder="Sähköposti" v-model="email" >
    <button class="button button-block" @click="recoverPassword">Palauta salasana</button>
    <div class="success" v-if="resetMsg"> {{ resetMsg }} </div>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'login',
  data () {
    return {
      email: '',
      resetMsg: ''
    }
  },
  methods: {
    recoverPassword () {
      if (!this.email) {
        return
      }
      firebase.auth().sendPasswordResetEmail(this.email).then((res) => {
        this.resetMsg = 'Salasanan palautus onnistui. Tarkista sähköpostisi!'
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

.success {
  background-color: $white;
  color: $main-dark;
  margin-top: 10px;

}
</style>
