<template>
  <v-main>
    <v-container
      fluid
      class="d-flex justify-center"
    >
      <v-row>
        <v-col cols="4">
          <v-text-field
            label="Titúlo*"
            outlined
            requerid
            hide-details
          />
        </v-col>
        <v-col cols="4">
          <v-text-field
            label="Subtitúlo*"
            outlined
            requerid
            hide-details
          />
        </v-col>
        <v-col
          class="d-flex"
          cols="4"
        >
          <v-select
            :items="items"
            label="Tipo*"
            outlined
            requerid
            hide-details
          />
        </v-col>
        <v-col
          class="d-flex"
          cols="2"
        >
          <v-text-field
            label="Cor primária"
            outlined
            requerid
            hide-details
          />
        </v-col>
        <v-col
          class="d-flex"
          cols="2"
        >
          <v-text-field
            label="Cor Secundária"
            outlined
            requerid
            hide-details
          />
        </v-col>
        <v-col
          class="d-flex"
          cols="2"
        >
          <v-btn
            color="primary"
            class="white--text"
            elevation="2"
            large
          >
            Mais cores
            <v-icon
              right
              dark
            >
              mdi-plus
            </v-icon>
          </v-btn>
        </v-col>
        <v-col cols="12">
          <v-textarea
            outlined
            requerid
            hide-details
            label="Outros detalhes"
          />
        </v-col>
        <v-col cols="4">
          <v-file-input
            label="Carregue seu logotipo"
            outlined
            hide-details="18"
          />
        </v-col>
        <v-col cols="4">
          <v-file-input
            label="Carregue alguma referência"
            outlined
            hide-details="18"
          />
        </v-col>
        <v-col cols="4">
          <v-text-field
            label="Rede Sociais Referências*"
            outlined
            requerid
            hide-details
          />
        </v-col>
        <v-col
          cols="10"
          class="d-flex justify-end"
        >
          <v-btn
            depressed
            color="error"
          >
            <v-icon
              right
              dark
              class="mr-1"
            >
              mdi-chevron-left
            </v-icon>Voltar
          </v-btn>
        </v-col>
        <v-col cols="1">
          <v-btn
            depressed
            color="success"
            @click="abrirJenela('/escolher-designer')"
          >
            Solicitar
            <v-icon
              right
              dark
              class="ml-1"
            >
              mdi-chevron-right
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>
<style scoped>
.v-card {
  width: 100%;
  max-width: 800px;
}
</style>
<script>

export default {
  name: 'HomePedido',
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
