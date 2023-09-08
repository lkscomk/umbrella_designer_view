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
        component: () => import('../views/home/index.vue')
      },
      {
        path: '/cadastro',
        name: 'cadastro',
        component: () => import('../views/cadastro/index.vue')
      },
      {
        path: '/login',
        name: 'login',
        component: () => import('../views/login/index.vue')
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
        component: () => import('../views/tela_principal/index.vue')
      },
      {
        path: '/tela-designer',
        name: 'telaEnviadoDesigner',
        component: () => import('../views/tela_enviado_designer/index.vue')
      },
      {
        path: '/portfolio',
        name: 'portfolio',
        component: () => import('../views/portfolio/index.vue')
      },
      {
        path: '/meus-pedidos',
        name: 'meusPedidos',
        component: () => import('../views/meus_pedidos/index.vue')
      },
      {
        path: '/escolher-designer',
        name: 'escolherDesigner',
        component: () => import('../views/escolher_designer/index.vue')
      },
      {
        path: '/pedido',
        name: 'pedido',
        component: () => import('../views/pedido/index.vue')
      },
      {
        path: '/finalizar-pedido',
        name: 'finalizar-pedido',
        component: () => import('../views/finalizar_pedido/index.vue')
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
