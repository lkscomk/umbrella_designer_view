import '@/plugins/axios_local'
import '@/plugins/notificacao'
import Vue from 'vue'
import App from './App.vue'
import '@/plugins/dayjs'
import router from './router'
import store from './store'
import '@/plugins/validate'
import vuetify from './plugins/vuetify'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false

Vue.component('date-selector', () => import('./components/dataSelecionar'))
Vue.component('selecao-all', () => import('./components/selecao-all'))
Vue.component('notificacao', () => import('./components/notificacao'))
Vue.component('tabela', () => import('./components/tabela'))
Vue.component('filtro', () => import('./components/filtro'))
Vue.component('pagina', () => import('./components/pagina'))
Vue.component('loading', () => import('./components/loading'))

new Vue({
  router,
  store,
  vuetify,
  render: function (h) { return h(App) }
}).$mount('#app')
