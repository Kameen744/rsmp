import { createRouter, createWebHashHistory } from "vue-router"
import Login from '@/Login.vue'
import Home from '@/Home.vue'
// import MapView from '@/MapView.vue'
// import PartnerView from '@/PartnerView.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/map',
    name: 'home',
    component: Home
  },
  // {
  //   path: '/partner',
  //   name: 'PartnerView',
  //   component: PartnerView
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// ACtivate for auth
router.beforeEach((to, from, next) => {
  const authUser = localStorage.getItem('authUser')
  if (to.name !== 'login' && !authUser) {
    next({ name: 'login' })
  } else {
    if (to.name == 'login' && authUser != null) {
      next({ name: 'home' })
    } else {
      next()
    }
  }
})

export default router