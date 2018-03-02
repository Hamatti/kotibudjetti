<template lang="html">
  <div class="loginform">
    <input type="text" name="email" placeholder="Sähköposti" v-model="email" >
    <button class="button button-block" @click="recoverPassword">Palauta salasana</button>
    <info-box :message="resetMsg" level="success"></info-box>
  </div>
</template>

<script>
import firebase from 'firebase'
import InfoBox from '@/components/InfoBox'

export default {
  name: 'login',
  components: {
    'info-box': InfoBox
  },
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
        this.email = ''
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
