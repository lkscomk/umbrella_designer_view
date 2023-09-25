<template>
  <v-app>
    <loading :value="loading" />
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
      />
      <div class="d-flex align-center">
        <v-img
          class="shrink mx-2"
          contain
          src="@/assets/logoUmbrellaBranca.png"
          transition="scale-transition"
          width="120"
          @click="abrirJenela('/tela-principal')"
        />
      </div>
      <v-spacer />

      <div class="d-flex d-inline-flex pl-2">
        <v-menu
          bottom
          left
          width="400"
          offset-y
        >
          <template v-slot:activator="{ on }">
            <v-avatar
              color="primary elevation-4"
              class="white--text font-weight-black headline"
              size="45"
              v-on="on"
            >
              {{ nome.substring(0,2) }}
            </v-avatar>
          </template>

          <v-card width="220">
            <v-card-title class="subtitle mb-3">
              {{ `${nome.split(' ')[0]} ${nome.split(' ')[1]}` }}
            </v-card-title>

            <v-card-subtitle>
              {{ email }}
            </v-card-subtitle>

            <v-divider class="mb-1" />

            <v-card-actions>
              <v-btn
                :color="$vuetify.theme.dark
                  ? ''
                  : 'primary'"
                block
                @click="deslogar()"
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
      :permanent="drawer"
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
          <v-list-item @click="abrirJenela('/pedido')">
            <v-list-item-title>Fazer Pedido</v-list-item-title>
          </v-list-item>

          <v-list-item @click="abrirJenela('/meus-pedidos')">
            <v-list-item-title>Histórico de Pedidos</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title @click="abrirJenela('/portfolio')">
              Meu Portfolio
            </v-list-item-title>
          </v-list-item>

          <v-list-item @click="abrirJenela('/perfil')">
            <v-list-item-title>Informações do Perfil</v-list-item-title>
          </v-list-item>

          <v-list-item @click="abrirJenela('/opcoes')">
            <v-list-item-title>Opções Globais</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Configurações</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Ajuda</v-list-item-title>
          </v-list-item>

          <v-list-item @click="deslogar()">
            <v-list-item-title>
              Sair
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>

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
          - Versão
        </span>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'App',

  data: () => ({
    loading: true,
    dataAtual: '',
    drawer: true,
    group: null,
    nome: window.atob(localStorage.getItem('umbrella:nome')),
    email: window.atob(localStorage.getItem('umbrella:email'))
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
    ...mapActions('app', [
      'logout'
    ]),
    atualizarData () {
      this.dataAtual = this.$day().format('dddd - DD - MMMM - YYYY HH:mm:ss')

      setTimeout(() => {
        this.atualizarData()
      }, 1000)
    },
    abrirJenela (tela) {
      if (tela !== this.$router.currentRoute.path) {
        const route = this.$router.resolve({ path: tela })

        if (tela) {
          this.$router.push(route.href)
        }
      } else {
        window.location.reload(true)
      }
    },
    deslogar () {
      this.loading = true
      this.logout()
      this.$router.push('/login')
      this.$notificacao('Usuário desconectado com sucesso!')
      this.loading = false
    }
  }
}
</script>
