export default {
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
