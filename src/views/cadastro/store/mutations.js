export default {
  dropdownTipoUsuarioRestrito (state, param) {
    state.dropdownTipoUsuarioRestrito = param.filter((e) => e.item !== 1)// perfil tipo administrador
  },

  reset: () => {}
}
