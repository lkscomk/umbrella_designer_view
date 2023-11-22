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
            <v-autocomplete
              v-model="formulario.tipo"
              :items="dropdownTiposPedidos"
              item-value="id"
              item-text="descricao"
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
              append-icon="mdi-eye"
              outlined
              requerid
              hide-details
              @click:append="modalCorUm = true"
              />
            </v-col>
            <v-col
              class="d-flex align-center justify-start ma-0 pa-0"
              cols="1"
            >
            <v-card
              :color="formulario.corPrimaria"
              width="40"
              height="40"
            />
          </v-col>
          <v-col
            class="d-flex"
            cols="2"
          >
            <v-text-field
              v-model="formulario.corSecundaria"
              label="Cor Secundária"
              append-icon="mdi-eye"
              outlined
              requerid
              hide-details
              @click:append="modalCorDois = true"
            />
          </v-col>
          <v-col
              class="d-flex align-center justify-start ma-0 pa-0"
              cols="1"
            >
            <v-card
              :color="formulario.corSecundaria"
              width="40"
              height="40"
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
              disabled
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
    <v-dialog
      v-model="modalCorUm"
      width="350"
    >
      <v-card>
        <v-toolbar
          :class="$vuetify.theme.dark ? '' : 'grey--text text--darken-2'"
          :color="$vuetify.theme.dark ? 'accent' : 'white'"
          class="font-weight-bold"
          flat
          height="40"
        >
          <v-btn
            color="error"
            data-cy="btnFechar"
            icon
            small
            title="Voltar"
            @click="modalCorUm = false"
          >
            <v-icon dark>
              mdi-chevron-left
            </v-icon>
          </v-btn>
          <v-toolbar-title class="px-2">
            Escolher Cor Primaria
          </v-toolbar-title>

          <v-spacer />

        </v-toolbar>
        <v-card-text class="d-flex justify-center">
        <v-color-picker v-model="corPrimariaRetorno"></v-color-picker>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="success"
            @click="modalCorUm = false"
          >
            Ok
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="modalCorDois"
      width="350"
    >
      <v-card>
        <v-toolbar
        :class="$vuetify.theme.dark ? '' : 'grey--text text--darken-2'"
        :color="$vuetify.theme.dark ? 'accent' : 'white'"
        class="font-weight-bold"
        flat
        height="40"
      >
        <v-btn
          color="error"
          data-cy="btnFechar"
          icon
          small
          title="Voltar"
          @click="modalCorDois = false"
        >
          <v-icon dark>
            mdi-chevron-left
          </v-icon>
        </v-btn>
          <v-toolbar-title class="px-2">
            Escolher Cor Secundaria
          </v-toolbar-title>

          <v-spacer />

        </v-toolbar>
        <v-card-text class="d-flex justify-center">
          <v-color-picker v-model="corSecundariaRetorno"></v-color-picker>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="success"
            @click="modalCorDois = false"
          >
            Ok
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </pagina>
</template>
<style scoped>
.v-card {
  width: 100%;
  max-width: 800px;
}
</style>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'Pedido',
  data () {
    return {
      modal: false,
      loading: false,
      modalCorDois: false,
      modalCorUm: false,
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
      },
      corPrimariaRetorno: null,
      corSecundariaRetorno: null
    }
  },
  computed: {
    ...mapState('pedido', [
      'dropdownTiposPedidos'
    ])
  },
  watch: {
    corPrimariaRetorno (value) {
      if (value) this.formulario.corPrimaria = value.hex
    },
    corSecundariaRetorno (value) {
      if (value) this.formulario.corSecundaria = value.hex
    }
  },
  async created () {
    await this.buscarDropdownTiposPedidos(5) // tipos de pedido
  },
  methods: {
    ...mapActions('pedido', [
      'salvarPedido',
      'buscarDropdownTiposPedidos'
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
