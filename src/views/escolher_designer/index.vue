<template>
  <v-container
    fluid
    class="fill-height d-flex align-center justify-center"
  >
    <v-row class="ma-0 pa-0 d-flex justify-center">
      <v-col
        cols="12"
        class="text-h4 font-weight-bold d-flex justify-center pb-6 primary--text"
      >
        Opa! Seu pedido foi encaminhado para...
      </v-col>
      <v-col
        cols="6"
        class="d-flex justify-end"
      >
        <div style="border-radius: 50%; width: 150px; height: 150px;">
          <v-icon
            size="150"
            color="black"
          >
            mdi-account
          </v-icon>
        </div>
      </v-col>
      <v-col
        cols="6"
        class="grey--text my-auto"
      >
        <span class="text-h5 font-weight-bold pb-0 mb-0">Fulano de Tal</span><br>
        <span class="text-caption pt-0 mt-0">Há 4 anos na área de social media</span><br>
        <span>Photoshop&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ilustrator&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Canvas</span><br>
        <v-icon color="yellow">
          mdi-star
        </v-icon>
        <v-icon color="yellow">
          mdi-star
        </v-icon>
        <v-icon color="yellow">
          mdi-star
        </v-icon>
        <v-icon color="yellow">
          mdi-star
        </v-icon>
        <v-icon>mdi-star</v-icon><br>
        <span class="text-caption font-weight-bold text-decoration-underline primary--text">Ver portfólio do(a) designer.</span>
      </v-col>
      <v-col
        cols="6"
        class="d-flex justify-end pt-12"
      >
        <v-btn
          type="submit"
          color="primary"
          class="my-3"
        >
          Buscar outro&nbsp;<v-icon>mdi-reload</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="6 pt-12">
        <v-btn
          type="submit"
          color="success"
          class="my-3"
          @click="abrirJenela('/tela-designer')"
        >
          Prosseguir&nbsp;<v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'TelaEscolherDesign',
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
