import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SuccessView from '../views/SuccessView.vue'
import CancelledView from '../views/CancelledView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/',
    name: 'success',
    alias: '/success',
    component: SuccessView
  },
  {
    path: '/',
    name: 'cancel',
    alias: '/cancel',
    component: CancelledView
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
