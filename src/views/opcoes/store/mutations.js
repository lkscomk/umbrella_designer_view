import day from '@/plugins/dayjs'

export default {
  dropdownGrupos (state, param) {
    state.dropdownGrupos = param
  },
  setRegistros (state, param) {
    param.forEach(element => {
      element.created_at = element.created_at ? day(element.created_at, 'YYYY-MM-DD').format('DD/MM/YYYY') : null
    })
    state.registros = param
  },
  setRegistrosRelacionamento (state, param) {
    param.forEach(element => {
      element.created_at = element.created_at ? day(element.created_at, 'YYYY-MM-DD').format('DD/MM/YYYY') : null
    })
    state.registrosRelacionamento = param
  }
}
