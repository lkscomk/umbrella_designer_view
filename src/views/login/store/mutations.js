export default {
  setRegistros (state, param) {
    param.forEach(el => {
      el.tipoGerenciamento = el.tipoGerenciamento && el.tipoGerenciamento === '1' ? 'FILIAL' : 'MTZ'
    })
    state.registros = param
  },
  setRegistrosSecao (state, param) {
    state.registrosSecao = param
  },

  dropdownEmpresas (state, param) {
    state.empresas = param
  },

  md033Acess (state, param) {
    state.md033Acess = param
  },
  md033Url (state, param) {
    state.md033Url = param
  },

  reset: () => {}
}
