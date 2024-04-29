import { createRouter, createWebHashHistory } from "vue-router"
import Login from '@/Login.vue'
import Home from '@/Home.vue'
// import MapView from '@/MapView.vue'
// import PartnerView from '@/PartnerView.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
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
// router.beforeEach((to, from, next) => {
//   const authUser = localStorage.getItem('authUser')
//   if (to.name !== 'login' && !authUser) {
//     next({ name: 'Login' })
//   } else {
//     if (to.name == 'login' && authUser != null) {
//       next({ name: 'MapView' })
//     } else {
//       next()
//     }
//   }
// })

export default router