import Vue from 'vue'
import Router from 'vue-router'

// Components for routes
import Index from '@/views/Index'
import Login from '../views/Login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
