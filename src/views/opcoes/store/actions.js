import axios from '@/plugins/axios_local'

export const buscarDropdownGrupos = async ({ commit }, grupo) => {
  try {
    const res = await axios.get('/opcoes/' + grupo)

    if (!res.data.erro) {
      commit('dropdownGrupos', res.data)
    }

    return res.data
  } catch (error) {
    return null
  }
}

export const listar = async ({ commit }, filtros) => {
  try {
    const res = await axios.get('/opcoes', {
      params: filtros
    })

    if (!res.data.erro) {
      commit('setRegistros', res.data)
    }

    return res.data
  } catch (error) {
    return null
  }
}
export const listarRelacionamento = async ({ commit }, filtros) => {
  try {
    const res = await axios.get('/opcoes', {
      params: filtros
    })

    if (!res.data.erro) {
      commit('setRegistrosRelacionamento', res.data)
    }

    return res.data
  } catch (error) {
    return null
  }
}

export const exibir = async ({ commit }, grupo) => {
  try {
    const res = await axios.get('/opcoes/' + grupo)

    return res.data
  } catch (error) {
    return null
  }
}

export const salvar = async ({ commit }, dados) => {
  try {
    const res = await axios.post('/opcoes', dados)

    return res.data
  } catch (error) {
    return null
  }
}
