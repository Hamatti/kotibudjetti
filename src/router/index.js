import Vue from 'vue'
import Router from 'vue-router'

// Components for routes
import Index from '@/views/Index'
import Login from '../views/Login'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})

router.beforeEach((to, from, next) => {
  let currentUser = false
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !currentUser) {
    next('login')
  } else if (to.name === 'login' && currentUser) {
    next('')
  } else {
    next()
  }
})

export default router
