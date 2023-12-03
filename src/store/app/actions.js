import axios from '@/plugins/axios_local'

export const login = async ({ commit }, dados) => {
  try {
    const res = await axios.post('/sistema/login', dados)

    if (res.data.token) {
      localStorage.setItem('umbrella:token', res.data.token)
      localStorage.setItem('umbrella:email', window.btoa(res.data.email))
      localStorage.setItem('umbrella:nome', window.btoa(res.data.nome))
      localStorage.setItem('umbrella:login', window.btoa(res.data.login))
      localStorage.setItem('umbrella:perfil', window.btoa(res.data.id))

      axios.defaults.headers.Authorization = 'Bearer ' + res.data.token
      axios.defaults.headers['X-Login'] = res.data.login
    }

    return res.data
  } catch (error) {
    return null
  }
}

export const buscarAcessos = async ({ commit }, id) => {
  try {
    const res = await axios.get('/sistema/acessos_tela/' + id)

    if (!res.data.erro) {
      localStorage.setItem('umbrella:acessos_usuario', window.btoa(res.data))
      commit('acessos_usuario', res.data)
    }

    return res.data
  } catch (error) {
    return null
  }
}

export const logout = async ({ commit }) => {
  localStorage.removeItem('umbrella:token')
  localStorage.removeItem('umbrella:nome')
  localStorage.removeItem('umbrella:email')
  localStorage.removeItem('umbrella:login')

  delete axios.defaults.headers.Authorization
}

export const buscarPathImagem = async ({ commit }, id) => {
  try {
    const res = await axios.get('/anexos/usuario/' + id)

    return res.data
  } catch (error) {
    return null
  }
}
