<template>
  <v-card
    class="d-flex text-center"
    style="height: 100%; padding-top: 10vw;"
  >
    <v-row class="justify-center">
      <v-col xs="12">
        <span class="display-4 font-weight-bold pr-1 grey--text">
          4
          <v-icon
            color="grey"
            size="100"
          >
            mdi-emoticon-dead-outline
          </v-icon>
          4
        </span>
        <p class="display-1 pt-3">
          Ops! Página não encontrada
        </p>
        <v-btn
          :color="$vuetify.theme.dark ? '' : 'primary'"
          dark
          large
          @click="voltarInicio()"
        >
          <v-icon left>
            mdi-reply
          </v-icon>
          Retornar
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: 'PaginaError',
  methods: {
    voltarInicio () {
      this.$router.go(-1)
    }
  }
}
</script>
