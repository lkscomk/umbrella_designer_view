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
        component: () => import('@/views/home/index.vue')
      }
    ],
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('umbrella:token')) {
        next('/tela-principal')
      } else {
        localStorage.removeItem('umbrella:token')
        localStorage.removeItem('umbrella:nome')
        localStorage.removeItem('umbrella:login')
        localStorage.removeItem('umbrella:email')
        localStorage.removeItem('umbrella:perfil')
        next()
      }
    }
  },
  {
    path: '/login',
    component: () => import('@/layout/layoutLoginCadastro.vue'),
    children: [
      {
        path: '/cadastro',
        name: 'cadastro',
        component: () => import('@/views/cadastro/index.vue')
      },
      {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/index.vue')
      }
    ],
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('umbrella:token')) {
        next('/tela-principal')
      } else {
        localStorage.removeItem('umbrella:token')
        localStorage.removeItem('umbrella:nome')
        localStorage.removeItem('umbrella:login')
        localStorage.removeItem('umbrella:email')
        localStorage.removeItem('umbrella:perfil')
        next()
      }
    }
  },
  {
    path: '/',
    component: () => import('@/layout/layoutInterno.vue'),
    children: [
      {
        path: '/tela-principal',
        name: 'telaprincipal',
        component: () => import('@/views/tela_principal/index.vue')
      },
      {
        path: '/tela-designer',
        name: 'telaEnviadoDesigner',
        component: () => import('@/views/tela_enviado_designer/index.vue')
      },
      {
        path: '/portfolio',
        name: 'portfolio',
        component: () => import('@/views/portfolio/index.vue')
      },
      {
        path: '/meus-pedidos',
        name: 'meusPedidos',
        component: () => import('@/views/meus_pedidos/index.vue')
      },
      {
        path: '/escolher-designer',
        name: 'escolherDesigner',
        component: () => import('@/views/escolher_designer/index.vue')
      },
      {
        path: '/pedido',
        name: 'Pedido',
        component: () => import('@/views/pedido/index.vue')
      },
      {
        path: '/finalizar-pedido',
        name: 'Finalizar Pedido',
        component: () => import('@/views/finalizar_pedido/index.vue')
      },
      {
        path: '/perfil',
        name: 'Perfil',
        component: () => import('@/views/informacoes_perfil/index.vue')
      },
      {
        path: '/opcoes',
        name: 'Opções Globais',
        component: () => import('@/views/opcoes/index.vue')
      },
      {
        path: '/usuarios',
        name: 'Usuários',
        component: () => import('../views/usuarios/index.vue')
      },
      {
        path: '/acessos',
        name: 'Acessos',
        component: () => import('../views/acessos/index.vue')
      }
    ],
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('umbrella:token')) {
        next()
      } else {
        Vue.prototype.$notificacao('Usuário não autenticado', 'atencao')
        next('/login')
      }
    }
  },
  {
    path: '*',
    component: () => import('@/views/error/404')
  },
  {
    path: '/proibido',
    name: 'Proibido',
    component: () => import('@/views/error/403'),
    beforeEnter: (to, from, next) => localStorage.getItem('umbrella:token') ? next() : next('/login')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
