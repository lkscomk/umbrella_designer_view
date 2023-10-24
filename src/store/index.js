import Vue from 'vue'
import Vuex from 'vuex'
import app from './app/'
import cadastro from '../views/cadastro/store'
import perfil from '../views/informacoes_perfil/store'
import opcoes from '../views/opcoes/store'
import usuarios from '../views/usuarios/store'
import acessos from '../views/acessos/store'

Vue.use(Vuex)

export default new Vuex.Store({
  // state: {
  // },
  // getters: {
  // },
  // mutations: {
  // },
  // actions: {
  // },
  modules: {
    app,
    cadastro,
    perfil,
    opcoes,
    usuarios,
    acessos
  }
})
