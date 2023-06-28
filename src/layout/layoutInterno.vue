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

      <div class="d-flex d-inline-flex pl-2">
        <v-menu
          bottom
          left
          width="400"
          offset-y
        >
          <template v-slot:activator="{ on }">
            <v-list-item-avatar v-on="on">
              <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
            </v-list-item-avatar>
          </template>

          <v-card>
            <v-card-title class="subtitle justify-center mb-3">
              ogin
            </v-card-title>

            <v-card-subtitle>
              ome
            </v-card-subtitle>

            <v-divider class="mb-1" />

            <v-card-actions>
              <v-btn
                :color="$vuetify.theme.dark
                  ? ''
                  : 'primary'"
                block
              >
                <v-icon
                  left
                  size="28"
                >
                  mdi-logout-variant
                </v-icon>SAIR
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </div>
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

    <v-footer
      :color="$vuetify.theme.dark
        ? ''
        : 'primary'"
      app
      class="pa-0"
      dark
      height="20"
    >
      <v-col
        class="text-center ma-0 pa-0 caption"
        cols="12"
      >
        <span class="caption font-weight-bold mr-10">
          {{ dataAtual }}
        </span>
        <strong v-if="!$vuetify.breakpoint.mobile">
          Umbrella Designer
        </strong>
        <span v-if="!$vuetify.breakpoint.mobile">
          - Versão {{ versao }}
        </span>
      </v-col>
    </v-footer>
  </v-main>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    dataAtual: '',
    drawer: false,
    group: null
  }),

  watch: {
    group () {
      this.drawer = false
    }
  },

  created () {
    setTimeout(() => {
      this.atualizarData()
    }, 200)
  },

  methods: {
    atualizarData () {
      this.dataAtual = this.$day().format('dddd - DD - MMMM - YYYY HH:mm:ss')

      setTimeout(() => {
        this.atualizarData()
      }, 1000)
    }
  }
}
</script>
