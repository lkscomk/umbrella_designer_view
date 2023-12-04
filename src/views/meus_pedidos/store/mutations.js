import day from '@/plugins/dayjs'
export default {
  setRegistros (state, param) {
    param.forEach(element => {
      element.created_at = element.created_at ? day(element.created_at).format('DD/MM/YYYY HH:mm:ss') : null
    })
    state.registros = param
  },
  dropdownTiposPedidos (state, param) {
    state.dropdownTiposPedidos = param
  }
}
