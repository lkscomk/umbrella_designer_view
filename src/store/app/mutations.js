export default {
  acessos_usuario (state, param) {
    state.acessos_usuario = param
  },
  login (state, param) {
    state.login = param
  },
  reset: () => { },
  setNotificacao (state, { ativo, cor, icone, mensagem, tempo }) {
    state.notificacao = {
      ativo,
      cor,
      icone,
      mensagem,
      tempo
    }
  }
}
