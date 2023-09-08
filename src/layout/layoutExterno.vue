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
        href="#home"
        text
        color="primary"
      >
        <span class="mr-2">HOME</span>
      </v-btn>
      <v-btn
        href="#sobre"
        text
        color="primary"
      >
        <span class="mr-2">SOBRE</span>
      </v-btn>
      <v-btn
        href="#perfis"
        text
        color="primary"
      >
        <span class="mr-2">PERFIS</span>
      </v-btn>
      <v-btn
        href="#quemSomos"
        text
        color="primary"
      >
        <span class="mr-2">QUEM SOMOS</span>
      </v-btn>
      <v-btn
        text
        color="primary"
        @click="abrirJenela('/cadastro')"
      >
        <span class="mr-2">Cadastre - se</span>
      </v-btn>
      <v-btn
        color="primary"
        @click="abrirJenela('/login')"
      >
        <span class="mr-2">LOGIN</span>
      </v-btn>
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
      const route = this.$router.resolve({ path: tela })

      if (tela) {
        this.$router.push(route.href)
      }
    }
  }
}
</script>
