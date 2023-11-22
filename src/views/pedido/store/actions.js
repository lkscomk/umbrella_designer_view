import axios from '@/plugins/axios_local'

export const buscarDropdownTiposPedidos = async ({ commit }, grupo) => {
  try {
    const res = await axios.get('/sistema/opcoes/' + grupo)

    if (!res.data.erro) {
      commit('dropdownTiposPedidos', res.data)
    }

    return res.data
  } catch (error) {
    return null
  }
}

export const salvarPedido = async ({ commit }, dados) => {
  try {
    const res = await axios.post('/pedido', dados)
    return res.data
  } catch (error) {
    return null
  }
}

// export const listar = async ({ commit }, filtros) => {
//   try {
//     const res = await axios.get('/pedido', {
//       params: filtros
//     })

//     if (!res.data.erro) {
//       commit('setRegistros', res.data)
//     }

//     return res.data
//   } catch (error) {
//     return null
//   }
// }

// export const exibir = async ({ commit }, id) => {
//   try {
//     const res = await axios.get('/pedido/' + id)

//     return res.data
//   } catch (error) {
//     return null
//   }
// }

// export const listarRelacionamento = async ({ commit }, filtros) => {
//   try {
//     const res = await axios.get('/pedido', {
//       params: filtros
//     })

//     if (!res.data.erro) {
//       commit('setRegistrosRelacionamento', res.data)
//     }

//     return res.data
//   } catch (error) {
//     return null
//   }
// }

// export const editar = async ({ commit }, dados) => {
//   try {
//     const res = await axios.put('/pedido/' + dados.id, dados)

//     return res.data
//   } catch (error) {
//     return null
//   }
// }
