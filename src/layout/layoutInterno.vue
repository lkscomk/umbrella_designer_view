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
              <v-img
                v-if="imagemPerfil"
                :src="imagemPerfil"
                alt="Profile Image"
              />
              <div v-else>
                {{ nome.substring(0,2) }}
              </div>
            </v-avatar>
          </template>

          <v-card width="220">
            <v-card-title class="subtitle mb-3">
              {{ `${nome.split(' ')[0]}` }}
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
          <v-list-item
            v-for="(tela, index) in acessos_usuario"
            :key="index"
            @click="abrirJenela(tela.url)"
          >
            <v-list-item-title>{{ tela.nome }}</v-list-item-title>
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
import { mapActions, mapState } from 'vuex'
import axios from '@/plugins/axios_local'

export default {
  name: 'App',

  data: () => ({
    loading: true,
    perfil: window.atob(localStorage.getItem('umbrella:perfil')),
    dataAtual: '',
    drawer: false,
    group: null,
    nome: window.atob(localStorage.getItem('umbrella:nome')),
    email: window.atob(localStorage.getItem('umbrella:email')),
    imagemPerfil: null
  }),

  computed: {
    ...mapState('app', [
      'acessos_usuario'
    ])
  },
  watch: {
    group () {
      this.drawer = false
    }
  },

  created () {
    setTimeout(() => {
      this.atualizarData()
    }, 200)
    setTimeout(async () => {
      await this.buscarAcessos(this.perfil)
      await this.buscarImagem()
    }, 200)
  },

  methods: {
    ...mapActions('app', [
      'logout',
      'buscarAcessos',
      'buscarPathImagem'
    ]),
    async buscarImagem () {
      const res = await this.buscarPathImagem(this.perfil)
      let foto = null
      if (res && !res.erro && res.checksum) {
        await axios
          .get(`https://servidor-arquivos-umbrella.lukasrocha.repl.co/download${res.checksum}`, {
            responseType: 'arraybuffer'
          })
          .then(function (response) {
            foto = response.data
          })
          .catch(function (error) {
            window.console.log(error)
          })
        const buffer = Buffer.from(foto, 'binary')
        const blob = new Blob([buffer], { type: 'image/png' })
        const imageUrl = URL.createObjectURL(blob)
        this.imagemPerfil = imageUrl
      }
    },
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
