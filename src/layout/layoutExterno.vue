<template>
  <v-app>
    <v-app-bar
      app
      color="white"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          class="shrink mx-2"
          contain
          src="@/assets/nav_bar_icon.png"
          transition="scale-transition"
          width="50"
          @click="abrirJenela('/')"
        />
      </div>

      <v-spacer />

      <v-btn
        v-if="$vuetify.breakpoint.name === 'xl' || $vuetify.breakpoint.name === 'lg' || $vuetify.breakpoint.name === 'md'"
        href="#home"
        text
        color="primaryHome"
      >
        <span class="mr-2">HOME</span>
      </v-btn>
      <v-btn
        v-if="$vuetify.breakpoint.name === 'xl' || $vuetify.breakpoint.name === 'lg' || $vuetify.breakpoint.name === 'md'"
        href="#quemSomos"
        text
        color="primaryHome"
      >
        <span class="mr-2">QUEM SOMOS</span>
      </v-btn>
      <v-btn
        v-if="$vuetify.breakpoint.name === 'xl' || $vuetify.breakpoint.name === 'lg' || $vuetify.breakpoint.name === 'md'"
        href="#banner"
        text
        color="primaryHome"
      >
        <span class="mr-2">O QUE É UM BANNER?</span>
      </v-btn>
      <v-btn
        v-if="$vuetify.breakpoint.name === 'xl' || $vuetify.breakpoint.name === 'lg' || $vuetify.breakpoint.name === 'md'"
        href="#perfis"
        text
        color="primaryHome"
      >
        <span class="mr-2">PERFIS</span>
      </v-btn>
      <v-btn
        text
        color="primaryHome"
        @click="abrirJenela('/cadastro')"
      >
        <span class="mr-2">Cadastre - se</span>
      </v-btn>
      <v-btn
        color="primaryHome"
        @click="abrirJenela('/login')"
      >
        <span class="mr-2">LOGIN</span>
      </v-btn>

      <v-menu
        v-if="$vuetify.breakpoint.name === 'sm' || $vuetify.breakpoint.name === 'xs'"
        offset-y
        left
      >
        <template v-slot:activator="{ on }">
          <v-tooltip
            activator="#mo-modal-tooltip"
            bottom
          >
            <span>Mais Opções</span>
          </v-tooltip>
          <v-btn
            class="ml-2 pa-0"
            icon
            color="primaryHome"
            v-on="on"
          >
            <v-icon>
              mdi-menu
            </v-icon>
          </v-btn>
        </template>
        <v-list
          class="pa-0"
          dense
        >
          <v-list-item @click="abrirJenela('/')">
            <v-list-item-content>
              <v-list-item-title> HOME </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="abrirJenela('#sobre')">
            <v-list-item-content>
              <v-list-item-title> SOBRE </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="abrirJenela('#perfis')">
            <v-list-item-content>
              <v-list-item-title> PERFIS </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="abrirJenela('#quemSomos')">
            <v-list-item-content>
              <v-list-item-title> QUEM SOMOS </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'LayoutSitema',

  data: () => ({
    //
  }),

  methods: {
    abrirJenela (tela) {
      if (tela !== this.$router.currentRoute.path) {
        const route = this.$router.resolve({ path: tela })

        if (tela) {
          this.$router.push(route.href)
        }
      } else {
        window.location.reload(true)
      }
    }
  }
}
</script>
