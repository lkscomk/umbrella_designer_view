<template>
  <pagina
    :loading="loading"
    subtitulo="Fazer pedido"
    titulo="Pedido"
  >
    <!-- listagem -->
    <v-form
      v-if="!controle.exibir && !controle.editar && !controle.inserir"
      @submit.prevent="''"
    >
      <v-container
        class="my-0 py-0"
        fluid
      >
        <v-row dense>
          <v-col cols="12">
            <filtro
              :options="optionsFilter"
              @adicionar="
                controle.inserir = true
              "
              @pesquisar="listarRegistro()"
            >
              <template slot="filtros">
                <v-container
                  class="my-0 py-0"
                  fluid
                >
                  <v-row dense>
                    <v-col
                      xl="3"
                      lg="3"
                      md="10"
                      sm="12"
                      cols="12"
                    >
                      <v-autocomplete
                        v-model="filtro.grupo"
                        :items="dropdownGrupos"
                        hide-details
                        dense
                        item-value="item"
                        item-text="descricao"
                        label="Grupo"
                        outlined
                        @change="listarRegistro()"
                      />
                    </v-col>
                    <v-col
                      xl="4"
                      lg="4"
                      md="10"
                      sm="12"
                      cols="12"
                    >
                      <v-text-field
                        v-model="filtro.descricao"
                        hide-details
                        dense
                        label="Descrição"
                        outlined
                      />
                    </v-col>
                  </v-row>
                </v-container>
              </template>
            </filtro>
          </v-col>
          <v-col cols="12">
            <tabela
              :colunas="colunas"
              :registros="registros"
              exibir
              @exibir="exibirRegistro($event)"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-form>

    <!-- exibir -->
    <v-container
      v-if="controle.exibir || controle.editar || controle.inserir"
      fluid
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
            @click="resetFormulario(), controle = { exibir: false, inserir: false, editar: false }"
          >
            <v-icon dark>
              mdi-chevron-left
            </v-icon>
          </v-btn>
          <v-toolbar-title class="px-2">
            {{ controle.editar ? 'Editar Registro' : controle.inserir ? 'Adicionar Registro' : 'Exibir Registro' }}
          </v-toolbar-title>
          <v-spacer />
          <v-menu
            offset-y
            left
          >
            <template v-slot:activator="{ on }">
              <v-btn
                id="pg-btn-mais-opcoes"
                class="mx-0"
                small
                icon
                v-on="on"
              >
                <v-icon>
                  mdi-dots-vertical
                </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="excluirRegistro()">
                <v-list-item-icon class="mr-3">
                  <v-icon color="error'">
                    mdi-cancel
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    Excluir
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>

        <v-card-text class="ma-0 pa-0 px-2">
          <v-form @submit.prevent="''">
            <validation-observer ref="observer">
              <v-container
                fluid
                grid-list-xs
              >
                <v-row dense>
                  <v-col cols="4">
                    <v-text-field
                      v-model="formulario.titulo"
                      :disabled="controle.exibir"
                      label="Titúlo*"
                      outlined
                      dense
                      requerid
                      hide-details
                    />
                  </v-col>
                  <v-col cols="4">
                    <v-text-field
                      v-model="formulario.subtitulo"
                      :disabled="controle.exibir"
                      label="Subtitúlo*"
                      outlined
                      dense
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
                      :disabled="controle.exibir"
                      item-value="item"
                      item-text="descricao"
                      label="Tipo*"
                      outlined
                      dense
                      hide-details
                    />
                  </v-col>
                  <v-col
                    class="d-flex"
                    cols="2"
                  >
                    <v-text-field
                      v-model="formulario.corPrimaria"
                      :disabled="controle.exibir"
                      label="Cor primária"
                      append-icon="mdi-eye"
                      outlined
                      dense
                      requerid
                      hide-details
                      @click:append="modalCorUm = true"
                    />
                  </v-col>
                  <v-col
                    class="d-flex align-center justify-center ma-0 pa-0"
                    cols="1"
                  >
                    <v-card
                      :color="formulario.corPrimaria"
                      class="elevation-0"
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
                      :disabled="controle.exibir"
                      label="Cor Secundária"
                      append-icon="mdi-eye"
                      outlined
                      dense
                      requerid
                      hide-details
                      @click:append="modalCorDois = true"
                    />
                  </v-col>
                  <v-col
                    class="d-flex align-center justify-center ma-0 pa-0"
                    cols="1"
                  >
                    <v-card
                      :color="formulario.corSecundaria"
                      class="elevation-0"
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
                      :disabled="controle.exibir"
                      outlined
                      dense
                      requerid
                      hide-details
                      label="Outros detalhes"
                    />
                  </v-col>
                  <v-col cols="3">
                    <v-btn
                      color="success"
                      small
                      @click="openFilePickerLogo"
                    >
                      {{ logo ? 'Substituir Logo' : 'Escolher Logo' }}
                    </v-btn>
                    <input
                      ref="fileInputLogo"
                      type="file"
                      style="display: none"
                      accept="image/*"
                      @change="handleFileSelectLogo"
                    >
                  </v-col>
                  <v-col
                    class="d-flex ma-0 pa-0 mt-3"
                    cols="1"
                  >
                    <v-col
                      class="d-flex ma-0 pa-0"
                      cols="1"
                    >
                      <v-btn
                        color="primary"
                        class="white--text ma-0 pa-0 pr-3"
                        elevation="2"
                        width="40"
                        height="30"
                        small
                        block
                        @click="modalLogotipo = true"
                      >
                        <v-icon
                          right
                          dark
                        >
                          mdi-eye
                        </v-icon>
                      </v-btn>
                    </v-col>
                  </v-col>
                  <v-col cols="3">
                    <v-btn
                      color="success"
                      small
                      @click="openFilePickerReferencia"
                    >
                      {{ referencia ? 'Substituir Referência' : 'Escolher Referência' }}
                    </v-btn>
                    <input
                      ref="fileInputReferencia"
                      type="file"
                      style="display: none"
                      accept="image/*"
                      @change="handleFileSelectReferencia"
                    >
                  </v-col>
                  <v-col
                    class="d-flex  ma-0 pa-0 mt-3"
                    cols="1"
                  >
                    <v-col
                      class="d-flex ma-0 pa-0"
                      cols="1"
                    >
                      <v-btn
                        color="primary"
                        class="white--text ma-0 pa-0 pr-3"
                        elevation="2"
                        width="40"
                        height="30"
                        small
                        block
                        @click="modalReferencia = true"
                      >
                        <v-icon
                          right
                          dark
                        >
                          mdi-eye
                        </v-icon>
                      </v-btn>
                    </v-col>
                  </v-col>
                  <v-col cols="4">
                    <v-text-field
                      v-model="formulario.redeSocialReferencia"
                      :disabled="controle.exibir"
                      label="Rede Sociais Referências*"
                      outlined
                      dense
                      requerid
                      hide-details
                    />
                  </v-col>
                </v-row>
              </v-container>
            </validation-observer>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="success"
            @click="controle.exibir ? (controle.exibir = false, controle.editar = true) : (salvarRegistro())"
          >
            {{ controle.exibir ? 'Editar' : 'Salvar' }}
          </v-btn>
          <v-btn
            color="error"
            @click="resetFormulario(), controle = { exibir: false, inserir: false, editar: false }"
          >
            Fechar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>

    <!-- modal da cor um -->
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
          <v-color-picker v-model="corPrimariaRetorno" />
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
    <!-- modal da cor dois -->
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
          <v-color-picker v-model="corSecundariaRetorno" />
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
    <!-- modal da logo -->
    <v-dialog
      v-model="modalLogotipo"
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
            @click="modalLogotipo = false"
          >
            <v-icon dark>
              mdi-chevron-left
            </v-icon>
          </v-btn>
          <v-toolbar-title class="px-2">
            Logotipo inserida
          </v-toolbar-title>
          <v-spacer />
        </v-toolbar>
        <v-card-text class="d-flex justify-center">
          <v-img
            v-if="logotipo"
            :src="logotipo"
            alt="Profile Image"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="success"
            @click="modalLogotipo = false"
          >
            Ok
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--Modal Referencias -->
    <v-dialog
      v-model="modalReferencia"
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
            @click="modalReferencia = false"
          >
            <v-icon dark>
              mdi-chevron-left
            </v-icon>
          </v-btn>
          <v-toolbar-title class="px-2">
            Referência inserida
          </v-toolbar-title>
          <v-spacer />
        </v-toolbar>
        <v-card-text class="d-flex justify-center">
          <v-img
            v-if="referencia"
            :src="referencia"
            alt="Profile Image"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="success"
            @click="modalReferencia = false"
          >
            Ok
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </pagina>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
// import axios from '@/plugins/axios_local'

export default {
  name: 'TelaMeusPedidos',
  data: () => ({
    perfil: window.atob(localStorage.getItem('umbrella:perfil')),
    loading: false,
    colunas: [
      {
        text: 'Ver',
        align: 'start',
        sortable: false,
        value: 'acao'
      },
      {
        text: 'Número do pedido',
        align: 'start',
        sortable: false,
        value: 'id'
      },
      {
        text: 'Cliente',
        align: 'start',
        sortable: false,
        value: 'nome'
      },
      {
        text: 'Designer',
        align: 'start',
        sortable: false,
        value: 'nome_prestador'
      },
      {
        text: 'Titulo',
        align: 'start',
        sortable: false,
        value: 'titulo'
      },
      {
        text: 'Data de entrega',
        align: 'start',
        sortable: false,
        value: 'created_at'
      }
    ],
    controle: {
      exibir: false,
      editar: false,
      inserir: false
    },
    filtro: {
      grupo: 1,
      descricao: null
    },
    modalCorDois: false,
    modalCorUm: false,
    modalLogotipo: false,
    modalReferencia: false,
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
      redeSocialReferencia: null,
      corUmId: null,
      corDoisId: null
    },
    corPrimariaRetorno: null,
    corSecundariaRetorno: null,
    logo: null,
    selectedFileLogo: null,
    referencia: null,
    selectedFileReferencia: null
  }),
  computed: {
    ...mapState('meusPedidos', [
      'registros',
      'dropdownTiposPedidos'
    ]),
    optionsFilter () {
      return {
        adicionar: true,
        values: !!(this.filtro.descricao || this.filtro.grupo)
      }
    }
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
    this.listarRegistro()
    await this.buscarDropdownTiposPedidos(5) // tipos de pedido
  },
  methods: {
    ...mapMutations('meusPedidos', [
      'setRegistrosRelacionamento'
    ]),
    ...mapActions('meusPedidos', [
      'listar',
      'exibir',
      'salvar',
      'editar',
      'excluir',
      'buscarDropdownTiposPedidos',
      'salvarImagemPedido'
    ]),
    ...mapActions('app', [
      'buscarPathImagem'
    ]),
    async listarRegistro () {
      this.loading = true
      await this.listar({
        perfil: this.perfil || null
      })
      this.loading = false
    },
    async exibirRegistro (formulario) {
      this.loading = true
      const res = await this.exibir(formulario.id)
      if (res && !res.erro) {
        this.formulario = {
          id: res.id || null,
          titulo: res.titulo || null,
          subtitulo: res.subtitulo || null,
          tipo: res.tipo_pedido_id || null,
          corPrimaria: res.cor_um || null,
          corSecundaria: res.cor_dois || null,
          outrosDetalhes: res.outros_detalhes || null,
          logotipo: res.logotipo || null,
          referencia: res.referencia || null,
          redeSocialReferencia: res.redes_sociais_referencia || null,
          corUmId: res.cor_um_id || null,
          corDoisId: res.cor_dois_id || null
        }
        this.controle.exibir = true
      }
      this.loading = false
    },
    async salvarRegistro () {
      this.loading = true

      const form = {
        id: this.formulario.id || null,
        titulo: this.formulario.titulo || null,
        subtitulo: this.formulario.subtitulo || null,
        tipo: this.formulario.tipo || null,
        corPrimaria: this.formulario.corPrimaria || null,
        corSecundaria: this.formulario.corSecundaria || null,
        outrosDetalhes: this.formulario.outrosDetalhes || null,
        redeSocialReferencia: this.formulario.redeSocialReferencia || null,
        corUmId: this.formulario.corUmId || null,
        corDoisId: this.formulario.corDoisId || null
      }

      let res
      if (form.id) res = await this.editar(form)
      else res = await this.salvar(form)

      if (res && !res.erro) {
        if (res.id && !form.id) {
          const tipoReferencia = 2 // tipo de anexo - referencia
          await this.salvarImagem(res.id, tipoReferencia, this.selectedFileReferencia)
          const tipoLogo = 1 // tipo de anexo - logo
          await this.salvarImagem(res.id, tipoLogo, this.selectedFileLogo)
        }
        this.exibirRegistro({ id: res.id })
        this.controle = {
          exibir: true,
          editar: false,
          inserir: false
        }
      }
      this.loading = false
    },
    async excluirRegistro () {
      this.loading = true
      const res = await this.excluir(this.formulario.id)
      if (res && !res.erro) {
        this.listarRegistro()
        this.resetFormulario()
        this.controle = {
          exibir: false,
          editar: false,
          inserir: false
        }
      }
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
    },
    async salvarImagem (id, tipo, img) {
      const form = new FormData()
      form.append('tabela', 'pedido')
      form.append('tipo_anexo_id', tipo)
      form.append('tabela_id', id)
      form.append('file', img)

      await this.salvarImagemPedido(form)
    },
    openFilePickerLogo () {
      this.$refs.fileInputLogo.click()
    },
    handleFileSelectLogo (event) {
      this.selectedFileLogo = event.target.files[0]
      if (this.selectedFileLogo) {
        const reader = new FileReader()
        reader.onload = () => {
          this.logo = reader.result
        }
        reader.readAsDataURL(this.selectedFileLogo)
      }
    },
    openFilePickerReferencia () {
      this.$refs.fileInputReferencia.click()
    },
    handleFileSelectReferencia (event) {
      this.selectedFileReferencia = event.target.files[0]
      if (this.selectedFileReferencia) {
        const reader = new FileReader()
        reader.onload = () => {
          this.referencia = reader.result
        }
        reader.readAsDataURL(this.selectedFileReferencia)
      }
    },
    resetFormulario () {
      this.formulario = {
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
  }
}
</script>
