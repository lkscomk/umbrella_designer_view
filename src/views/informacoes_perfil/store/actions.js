import axios from '@/plugins/axios_local'

export const buscarDropdownTipoUsuario = async ({ commit }, grupo) => {
  try {
    const res = await axios.get('/opcoes/' + grupo)

    if (!res.data.erro) {
      commit('dropdownTipoUsuario', res.data)
    }

    return res.data
  } catch (error) {
    return null
  }
}

export const buscarUsuario = async ({ commit }, id) => {
  try {
    const res = await axios.get('/usuario/' + id)

    return res.data
  } catch (error) {
    return null
  }
}
