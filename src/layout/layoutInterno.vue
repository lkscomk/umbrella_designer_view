<template>
  <v-main>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer">
      </v-app-bar-nav-icon>

      <v-spacer></v-spacer>

      <v-list-item-avatar>
              <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
            </v-list-item-avatar>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      temporary
      app
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-title>Fazer Pedido</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Histórico de Pedidos</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Informações do Perfil</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Configurações</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Ajuda</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-container fluid class="ma-0 pa-0">
      <router-view/>
    </v-container>
  </v-main>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    drawer: false,
    group: null
  }),

  watch: {
    group () {
      this.drawer = false
    }
  }
}
</script>
