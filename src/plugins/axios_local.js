import Vue from 'vue'
import axios from 'axios'
import router from '@/router'

const Axios = axios.create({
  baseURL: `${process.env.VUE_APP_URL}/api`,
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('umbrella:token')
  }
})

Axios.interceptors.response.use((response) => {
  if (response.data) {
    if (typeof response.data.mensagem === 'string') Vue.prototype.$notificacao(response.data.mensagem)
    else if (typeof response.data.erro === 'string') Vue.prototype.$notificacao(response.data.erro, 'erro')
    else if (typeof response.data.atencao === 'string') Vue.prototype.$notificacao(response.data.atencao, 'atencao')
    else if (typeof response.data.informacao === 'string') Vue.prototype.$notificacao(response.data.informacao, 'informacao')
  }

  return response
}, (error) => {
  if (!error.response) {
    Vue.prototype.$notificacao('Erro ao processar requisição. Tente novamente!', 'erro')
    localStorage.removeItem('umbrella:token')
    localStorage.removeItem('umbrella:nome')
    localStorage.removeItem('umbrella:email')
    localStorage.removeItem('umbrella:login')

    delete axios.defaults.headers.Authorization

    router.push('/login')
  } else if (error.response.status === 401) {
    window.console.log(error.response)
    localStorage.removeItem('umbrella:token')
    localStorage.removeItem('umbrella:nome')
    localStorage.removeItem('umbrella:email')

    router.push('/login')
    Vue.prototype.$notificacao(error.response.erro, 'atencao')
  } else if (error.response.status === 403) {
    Vue.prototype.$notificacao('Usuário sem permissão', 'atencao')
  } else if (error.response.status === 404) {
    Vue.prototype.$notificacao('Requisição não encontrada!', 'erro')
    return Promise.reject(error)
  } else if (error.response.status === 500) {
    Vue.prototype.$notificacao(error.response.data.erro || error.response.data.error, 'erro', true)
  } else {
    Vue.prototype.$notificacao('Erro ao processar requisição. Tente novamente!', 'erro')
  }

  return Promise.resolve(error.response)
})

Vue.prototype.$axiosLocal = Axios

export default Axios
