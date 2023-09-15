import Vue from 'vue'
import axios from 'axios'
import router from '@/router'
import store from '../store'

const Axios = axios.create({
  baseURL: `${process.env.VUE_APP_URL}/api`,
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('igerp-web:token'),
    'X-Login': localStorage.getItem('igerp-web:login') ? window.atob(localStorage.getItem('igerp-web:login')) : '',
    'X-Empresa': localStorage.getItem('igerp-web:empresa') ? window.atob(localStorage.getItem('igerp-web:empresa')) : '',
    'X-Grupo': localStorage.getItem('igerp-web:empresa-grupo') ? window.atob(localStorage.getItem('igerp-web:empresa-grupo')) : ''
  }
})

Axios.interceptors.response.use((response) => {
  if (response.data) {
    if (typeof response.data.message === 'string') Vue.prototype.$notificacao(response.data.message)
    if (typeof response.data.mensagem === 'string') Vue.prototype.$notificacao(response.data.mensagem)
    else if (typeof response.data.erro === 'string') {
      if (response.data.tipo === 'Error') Vue.prototype.$notificacao(response.data.erro, 'erro')
      else Vue.prototype.$notificacao(response.data.erro, 'erro', true)
    } else if (typeof response.data.atencao === 'string') Vue.prototype.$notificacao(response.data.atencao, 'atencao')
    else if (typeof response.data.informacao === 'string') Vue.prototype.$notificacao(response.data.informacao, 'informacao')
  }

  return response
}, (error) => {
  if (!error.response) {
    Vue.prototype.$notificacao('Erro ao processar requisição. Tente novamente!', 'erro')
    localStorage.removeItem('igerp-web:token')
    localStorage.removeItem('igerp-web:nome')
    localStorage.removeItem('igerp-web:empresa')
    localStorage.removeItem('igerp-web:rotas')
    localStorage.removeItem('igerp-web:bloqueio-tela')
    localStorage.removeItem('igerp-web:tempo-atividade')

    store.commit('app/bloqueioTela', false)

    delete axios.defaults.headers.Authorization
    delete axios.defaults.headers['X-Login']
    delete axios.defaults.headers['X-Empresa']
    delete axios.defaults.headers['X-Grupo']

    router.push('/login')
  } else if (error.response.status === 401) {
    localStorage.removeItem('igerp-web:token')
    localStorage.removeItem('igerp-web:bloqueio-tela')
    localStorage.removeItem('igerp-web:tempo-atividade')

    store.commit('app/bloqueioTela', false)

    router.push('/login')
    Vue.prototype.$notificacao('Por Favor faça login novamente', 'atencao')
  } else if (error.response.status === 403) {
    Vue.prototype.$notificacao('Usuário sem permissão', 'atencao')
  } else if (error.response.status === 404) {
    Vue.prototype.$notificacao('Requisição não encontrada!', 'erro')
    return Promise.reject(error)
  } else if (error.response.status === 500) {
    if (error.response.data && (typeof error.response.data.erro === 'string' || typeof error.response.data.error === 'string')) {
      Vue.prototype.$notificacao(error.response.data.erro || error.response.data.error, 'erro', true)
    } else if (error.response.data && typeof error.response.data.message === 'string') {
      Vue.prototype.$notificacao(error.response.data.message, 'erro', true)
    }
  } else {
    Vue.prototype.$notificacao('Erro ao processar requisição. Tente novamente!', 'erro')
    store.commit('app/bloqueioTela', false)
  }

  return Promise.resolve(error.response)
})

Vue.prototype.$axiosLocal = Axios

export default Axios
