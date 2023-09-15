<template>
  <v-container
    fluid
    class="mt-5 d-flex justify-center"
  >
    <v-row class="mt-5">
      <v-col
        cols="12"
        class="text-h4 font-weight-bold d-flex justify-center pb-6 primary--text text-center"
      >
        Seu banner foi encaminhado para <br>produção!
      </v-col>
      <v-col
        cols="12"
        class="d-flex justify-center"
      >
        <v-img
          :src="require('@/assets/equipe.jpg')"
          class="my-3"
          max-width="500"
        />
      </v-col>
      <v-col
        cols="6"
        class="d-flex justify-end pt-12"
      >
        <v-btn
          type="submit"
          color="primary"
          class="my-3"
          @click="abrirJenela('/meus-pedidos')"
        >
          Ver Meus Pedidos&nbsp;
        </v-btn>
      </v-col>
      <v-col cols="6 pt-12">
        <v-btn
          type="submit"
          color="success"
          class="my-3"
          icon
        >
          <v-icon>mdi-home</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'TelaEnviadoDesigner',
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
