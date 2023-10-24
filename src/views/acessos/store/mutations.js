import day from '@/plugins/dayjs'

export default {
  dropdownGrupos (state, param) {
    state.dropdownGrupos = param
  },
  setRegistros (state, param) {
    param.forEach(element => {
      element.created_at = element.created_at ? day(element.created_at).format('DD/MM/YYYY HH:mm:ss') : null
    })
    state.registros = param
  },
  setRegistrosRelacionamento (state, param) {
    param.forEach(element => {
      element.created_at = element.created_at ? day(element.created_at).format('DD/MM/YYYY HH:mm:ss') : null
    })
    state.registrosRelacionamento = param
  }
}
