import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/tela-principal',
    name: 'telaprincipal',
    component: function () {
      return import('../views/telaPrincipal/index.vue')
    }
  },
  {
    path: '/escolher-designer',
    name: 'escolherDesigner',
    component: function () {
      return import('../views/escolher_designer/index.vue')
    }
  },
  {
    path: '/cadastro',
    name: 'cadastro',
    component: function () {
      return import('../views/cadastro/index.vue')
    }
  },
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: function () {
      return import('../views/AboutView.vue')
    }
  },
  {
    path: '/login',
    name: 'login',
    component: function () {
      return import('../views/login/index.vue')
    }
  },
  {
    path: '/pedido',
    name: 'pedido',
    component: function () {
      return import('../views/pedido/index.vue')
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
