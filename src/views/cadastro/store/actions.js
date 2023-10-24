import axios from '@/plugins/axios_local'

export const buscarDropdownTipoUsuarioRestrito = async ({ commit }, grupo) => {
  try {
    const res = await axios.get('/sistema/opcoes/' + grupo)

    if (!res.data.erro) {
      commit('dropdownTipoUsuarioRestrito', res.data)
    }

    return res.data
  } catch (error) {
    return null
  }
}

export const cadastrar = async ({ commit }, dados) => {
  try {
    const res = await axios.post('/usuario', dados)

    return res.data
  } catch (error) {
    return null
  }
}
