<template>
  <div id="app">
    <header>
      <h1>Kotibudjetti</h1>
      <h2>Yksinkertaista kulujen seurantaa laiskalle</h2>
      <span @click="logout">Log out</span>
      <hr class="divider">
    </header>
    <router-view/>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'App',
  methods: {
    logout () {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    }
  }
}
</script>

<style lang="scss">
@import '/assets/variables.scss';

body {
  background-color: $main-bg;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $white;
  margin-top: 10px;
}

h1 {
  font-weight: 400;
}

h2, h3, h4, h5 {
  font-weight: 200;
}

.button {
  background: $main;
  border-radius: 0;
  border: 0;
  color: $white;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: $bold;
  letter-spacing: .1em;
  outline: none;
  padding: 15px 0;
  text-transform: uppercase;
  transition: all .5s ease;
  -webkit-appearance: none;
  &:hover, &:focus {
    background: $main-dark;
  }
}

.button-block {
  display: block;
  width: 100%;
}

input, textarea {
  background-image: none;
  background: none;
  border-radius: 0;
  border: 1px solid $gray-light;
  color: $white;
  display: block;
  font-size: 22px;
  height: 100%;
  margin-bottom: 10px;
  padding: 5px 10px;
  transition: border-color .25s ease, box-shadow .25s ease;
  width: 96%;
  &:focus {
    outline: 0;
    border-color: $main;
  }
}

button.link {
  background-color: transparent;
  border-radius: 0;
  border: none;
  box-shadow: none;
  color: $white;
  cursor: pointer;
  font-size: 0.8em;
  font-weight: 400;
  margin-top: 10px;
  text-decoration: underline;
}

</style>
