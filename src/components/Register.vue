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
      <info-box :message="msg" level="success"></info-box>
    </div>
  </div>
</template>

<script>
import db from '@/firebase.js'
import InfoBox from '@/components/InfoBox'

export default {
  name: 'register',
  components: {
    'info-box': InfoBox
  },
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
        this.email = ''
      })
    }
  }
}
</script>

<style lang="css">
</style>
