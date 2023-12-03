import axios from '@/plugins/axios_local'

export const buscarDropdownGrupos = async ({ commit }, grupo) => {
  try {
    const res = await axios.get('/sistema/opcoes/' + grupo)

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
    const res = await axios.get('/acessos', {
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

export const exibir = async ({ commit }, id) => {
  try {
    const res = await axios.get('/acessos/' + id)

    return res.data
  } catch (error) {
    return null
  }
}

export const salvar = async ({ commit }, dados) => {
  try {
    const res = await axios.post('/acessos', dados)

    return res.data
  } catch (error) {
    return null
  }
}

export const editar = async ({ commit }, dados) => {
  try {
    const res = await axios.put('/acessos/' + dados.id, dados)

    return res.data
  } catch (error) {
    return null
  }
}

export const excluir = async ({ commit }, id) => {
  try {
    const res = await axios.delete('/acessos/' + id)

    return res.data
  } catch (error) {
    return null
  }
}

export const listarTiposAcesso = async ({ commit }, filtros) => {
  try {
    const res = await axios.get('/acessos-tipo', {
      params: filtros
    })

    if (!res.data.erro) {
      commit('setRegistrosTipo', res.data)
    }

    return res.data
  } catch (error) {
    return null
  }
}

export const salvarTiposAcesso = async ({ commit }, dados) => {
  try {
    const res = await axios.post('/acessos-tipo', dados)

    return res.data
  } catch (error) {
    return null
  }
}

export const excluirTiposAcesso = async ({ commit }, id) => {
  try {
    const res = await axios.delete('/acessos-tipo/' + id)

    return res.data
  } catch (error) {
    return null
  }
}
