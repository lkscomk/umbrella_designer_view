<template>
  <pagina
    :loading="loading"
    subtitulo="Fazer pedido"
    titulo="Pedido"
  >
    <v-main>
      <v-container
        fluid
        class="d-flex justify-center"
      >
        <v-row>
          <v-col cols="4">
            <v-text-field
              v-model="formulario.titulo"
              label="Titúlo*"
              outlined
              requerid
              hide-details
            />
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model="formulario.subtitulo"
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
              v-model="formulario.tipo"
              :items="items"
              label="Tipo*"
              outlined
              hide-details
            />
          </v-col>
          <v-col
            class="d-flex"
            cols="2"
          >
            <v-text-field
              v-model="formulario.corPrimaria"
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
              v-model="formulario.corSecundaria"
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
              v-model="formulario.outrosDetalhes"
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
              v-model="formulario.redeSocialReferencia"
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
              @click="salvar()"
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
  </pagina>
</template>
<style scoped>
.v-card {
  width: 100%;
  max-width: 800px;
}
</style>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'Pedido',
  data () {
    return {
      items: null,
      modal: false,
      loading: false,
      Pedido: window.atob(localStorage.getItem('umbrella:pedido')),
      formulario: {
        titulo: null,
        subtitulo: null,
        tipo: null,
        corPrimaria: null,
        corSecundaria: null,
        outrosDetalhes: null,
        logotipo: null,
        referencia: null,
        redeSocialReferencia: null
      }
    }
  },
  methods: {
    ...mapActions('pedido', [
      'salvarPedido',
      'buscarDropdownTiposUsuarios'
    ]),
    async salvar () {
      this.loading = true
      this.salvarPedido({
        titulo: this.formulario.titulo || null,
        subtitulo: this.formulario.subtitulo || null,
        tipo: this.formulario.tipo || null,
        corPrimaria: this.formulario.corPrimaria || null,
        corSecundaria: this.formulario.corSecundaria || null,
        logotipo: this.formulario.logotipo || null,
        referencia: this.formulario.referencia || null,
        outrosDetalhes: this.formulario.outrosDetalhes || null,
        redeSocialReferencia: this.formulario.redeSocialReferencia || null
      })
      this.loading = false
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
    }
  }
}
</script>
