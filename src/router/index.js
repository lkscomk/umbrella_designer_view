import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/layout/layoutExterno.vue'),
    children: [
      {
        path: '/',
        name: 'home',
        component: function () {
          return import('../views/home/index.vue')
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
        path: '/login',
        name: 'login',
        component: function () {
          return import('../views/login/index.vue')
        }
      }
    ]
  },
  {
    path: '/',
    component: () => import('@/layout/layoutInterno.vue'),
    children: [
      {
        path: '/tela-principal',
        name: 'telaprincipal',
        component: function () {
          return import('../views/telaPrincipal/index.vue')
        }
      },
      {
        path: '/tela-designer',
        name: 'telaEnviadoDesigner',
        component: function () {
          return import('../views/tela_enviado_designer/index.vue')
        }
      },
      {
        path: '/portfolio',
        name: 'portfolio',
        component: function () {
          return import('../views/portfolio/index.vue')
        }
      },
      {
        path: '/meus-pedidos',
        name: 'meusPedidos',
        component: function () {
          return import('../views/meus_pedidos/index.vue')
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
        path: '/about',
        name: 'about',
        component: function () {
          return import('../views/AboutView.vue')
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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
