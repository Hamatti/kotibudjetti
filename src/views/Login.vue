<template lang="html">
  <div>
    <div class="form">
      <ul class="tab-group">
        <li class="tab" :class="{ active: isActive('Login') }" @click="activeTab = 'Login'">Kirjautuminen</li>
        <li class="tab" :class="{ active: isActive('Register') }" @click="activeTab = 'Register'">Rekisteröityminen</li>
      </ul>
      <div class="tab-content">
        <app-login v-if="isActive('Login')" @forgotPassword="activeTab = 'ForgotPassword'"></app-login>
        <app-register v-if="isActive('Register')"></app-register>
        <app-recover v-if="isActive('ForgotPassword')"></app-recover>
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from '@/components/Login'
import RegisterForm from '@/components/Register'
import RecoverForm from '@/components/Recover'

export default {
  name: 'login',
  components: {
    'app-login': LoginForm,
    'app-register': RegisterForm,
    'app-recover': RecoverForm
  },
  data () {
    return {
      activeTab: 'Login'
    }
  },
  methods: {
    isActive (tab) {
      return this.activeTab === tab
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/variables.scss';
.form {
  background:rgba($form-bg,.9);
  border-radius:$br;
  box-shadow:0 4px 10px 4px rgba($form-bg,.3);
  display: inline-block;
  margin:40px 20px;
  max-width:600px;
  padding: 40px;
  width: 45%;
}

.tab-group {
  list-style:none;
  padding:0;
  width: 90%;
  margin: auto;
  &:after {
    content: "";
    display: table;
    clear: both;
  }
  li {
    display:inline-block;
    text-decoration:none;
    padding:15px;
    background:rgba($gray-light,.25);
    color:$gray-light;
    font-size:20px;
    float:left;
    width:44%;
    text-align:center;
    cursor:pointer;
    transition:.5s ease;
    &:hover {
      background:$main-dark;
      color:$white;
    }
  }
  .active {
    background:$main;
    color:$white;
  }
  .submit {
    background:$button;
    color:$white;

    &:hover {
      background: $button-dark;
      color: $white;
    }
  }
}

ul.tab-group:last-child {
  margin-bottom: 0;
}
</style>
