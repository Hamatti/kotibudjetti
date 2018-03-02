<template lang="html">
  <div>
    <h3>Rekisteröityminen suljettu</h3>

    <p>
      Kiitos kiinnostuksestasi Kotibudjettia kohtaan. Valitettavasti tuote on tällä hetkellä beta-testissä ensimmäisillä käyttäjillämme.
    </p>
    <p>
      Mikäli haluat kuulla ensimmäisten joukossa kun palvelu aukeaa käyttäjille, jätä yhteystietosi alle.
    </p>
    <div class="loginform">
      <input type="text" name="email" placeholder="Sähköposti" v-model="email" >
      <button class="button button-block" @click="subscribe">Lisää listalle</button>
      <div class="success" v-if="msg"> {{ msg }} </div>
    </div>
  </div>
</template>

<script>
import db from '@/firebase.js'

export default {
  name: 'register',
  data () {
    return {
      email: '',
      msg: ''
    }
  },
  methods: {
    subscribe () {
      let ref = db.ref(`/subscribed`).push()
      ref.set(this.email).then(() => {
        this.msg = 'Sähköpostisi on lisätty listalle! Mukavaa päivänjatkoa'
      })
    }
  }
}
</script>

<style lang="css">
</style>
