<template>
  <pagina
    :loading="loading"
    subtitulo="Página de Manutenção de Acessos"
    titulo="Acessos"
  >
    <!-- listagem -->
    <v-form @submit.prevent="''">
      <v-container
        class="my-0 py-0"
        fluid
      >
        <v-row dense>
          <v-col cols="12">
            <filtro
              :options="optionsFilter"
              @pesquisar="listarRegistro()"
              @adicionar="modal = true, controle.inserir = true"
            >
              <template slot="filtros">
                <v-container
                  class="my-0 py-0"
                  fluid
                >
                  <v-row dense>
                    <v-col cols="3">
                      <v-text-field
                        v-model="filtro.codigo"
                        hide-details
                        dense
                        label="Id"
                        outlined
                      />
                    </v-col>
                    <v-col cols="3">
                      <v-text-field
                        v-model="filtro.nome"
                        hide-details
                        dense
                        label="Nome"
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
              @exibir="exibirRegistro($event.id)"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-form>

    <!-- exibir item e listar relacionamento-->
    <v-dialog
      v-model="modal"
      persistent
      max-width="1200px"
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
            @click="modal = false, resetFormulario()"
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
              <v-tooltip
                activator="#pg-btn-mais-opcoes"
                bottom
              >
                <span>Mais Opções</span>
              </v-tooltip>
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
        <v-card-text class="pa-0 ma-0">
          <v-form @submit.prevent="''">
            <validation-observer ref="observer">
              <v-container
                class="my-2 py-0"
                fluid
              >
                <v-row dense>
                  <v-col cols="1">
                    <v-text-field
                      v-model="formulario.id"
                      hide-details
                      disabled
                      dense
                      label="Id"
                      outlined
                    />
                  </v-col>
                  <v-col cols="3">
                    <v-text-field
                      v-model="formulario.nome"
                      :disabled="controle.exibir"
                      hide-details
                      dense
                      label="Nome"
                      outlined
                    />
                  </v-col>
                  <v-col cols="3">
                    <v-text-field
                      v-model="formulario.url"
                      :disabled="controle.exibir"
                      hide-details
                      dense
                      label="Url"
                      outlined
                    />
                  </v-col>
                  <v-col cols="2">
                    <v-text-field
                      v-model="formulario.created_by"
                      disabled
                      hide-details
                      dense
                      label="Criado Por"
                      outlined
                    />
                  </v-col>
                  <v-col cols="3">
                    <v-text-field
                      v-model="formulario.created_at"
                      disabled
                      hide-details
                      dense
                      label="Criado Em"
                      outlined
                    />
                  </v-col>
                </v-row>
              </v-container>
            </validation-observer>
          </v-form>
          <v-card-actions>
            <v-spacer />
            <v-btn
              v-if="!!(!controle.exibir && (controle.inserir || controle.editar))"
              color="success"
              @click="salvarRegistro()"
            >
              Salvar
            </v-btn>
            <v-btn
              v-if="!!(controle.exibir && !controle.inserir)"
              color="success"
              @click="controle.editar = true, controle.exibir = false"
            >
              Editar
            </v-btn>
            <v-btn
              v-if="!!(!controle.exibir && (controle.inserir || controle.editar))"
              color="error"
              @click="formulario.id ? (modal = true, exibirRegistro(formulario.id)) : (modal = false, resetFormulario())"
            >
              Cancelar
            </v-btn>
          </v-card-actions>
          <v-divider v-if="formulario.id" />
          <v-container
            v-if="formulario.id"
            class="my-2 py-0"
            fluid
          >
            <v-row dense>
              <v-col
                class="body-2 font-weight-bold"
                cols="12"
              >
                Quem pode ter acesso a essa tela?
              </v-col>
              <v-col cols="3">
                <v-autocomplete
                  v-model="formularioRelacionamento.tipoUsuario"
                  :items="dropdownGrupos"
                  hide-details
                  dense
                  item-value="item"
                  item-text="descricao"
                  label="Tipo Usuário"
                  outlined
                />
              </v-col>
              <v-col cols="3">
                <v-btn
                  v-if="controle.exibir || controle.editar"
                  color="primary"
                  @click="salvarRegistroTipos()"
                >
                  Adicionar
                </v-btn>
              </v-col>
              <v-col
                cols="12"
              >
                <tabela
                  :colunas="colunasTipo"
                  :registros="registrosTipo"
                  excluir
                  @excluir="excluirRegistroTipos($event.id)"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            v-if="controle.exibir || controle.editar"
            color="error"
            @click="modal = false, resetFormulario()"
          >
            Fechar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </pagina>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'PaginaAcessos',
  data: () => ({
    loading: false,
    perfil: window.atob(localStorage.getItem('umbrella:perfil')),
    colunas: [
      {
        text: 'Ação',
        align: 'start',
        sortable: false,
        value: 'acao'
      },
      {
        text: 'Id',
        align: 'start',
        sortable: false,
        value: 'id'
      },
      {
        text: 'Nome',
        align: 'start',
        sortable: false,
        value: 'nome'
      },
      {
        text: 'Url',
        align: 'start',
        sortable: false,
        value: 'url'
      },
      {
        text: 'Criado Por',
        align: 'start',
        sortable: false,
        value: 'created_by'
      },
      {
        text: 'Criado Em',
        align: 'start',
        sortable: false,
        value: 'created_at'
      }
    ],
    colunasTipo: [
      {
        text: 'Ação',
        align: 'start',
        sortable: false,
        value: 'acao'
      },
      {
        text: 'Id',
        align: 'start',
        sortable: false,
        value: 'id'
      },
      {
        text: 'Nome',
        align: 'start',
        sortable: false,
        value: 'nome'
      },
      {
        text: 'Tipo Usuário',
        align: 'start',
        sortable: false,
        value: 'item'
      },
      {
        text: 'Tipo Descrição',
        align: 'start',
        sortable: false,
        value: 'descricao'
      },
      {
        text: 'Criado Por',
        align: 'start',
        sortable: false,
        value: 'created_by'
      },
      {
        text: 'Criado Em',
        align: 'start',
        sortable: false,
        value: 'created_at'
      }
    ],
    filtro: {
      id: null,
      nome: null
    },
    controle: {
      exibir: false,
      editar: false,
      inserir: false
    },
    formulario: {
      id: null,
      nome: null,
      url: null,
      created_at: null,
      created_by: null
    },
    formularioRelacionamento: {
      tipoUsuario: null
    },
    modal: false,
    modalAdicionar: false
  }),
  computed: {
    ...mapState('acessos', [
      'registros',
      'registrosTipo',
      'dropdownGrupos'
    ]),
    optionsFilter () {
      return {
        adicionar: true,
        values: !!(this.filtro.descricao)
      }
    }
  },
  async created () {
    this.listarRegistro()
  },
  methods: {
    ...mapActions('app', [
      'buscarAcessos'
    ]),
    ...mapActions('acessos', [
      'listar',
      'exibir',
      'editar',
      'salvar',
      'excluir',
      'listarTiposAcesso',
      'salvarTiposAcesso',
      'excluirTiposAcesso',
      'buscarDropdownGrupos'
    ]),
    async listarRegistro () {
      this.loading = true
      await this.listar({
        codigo: this.filtro.codigo || null,
        nome: this.filtro.nome || null
      })
      this.loading = false
    },
    async exibirRegistro (id) {
      this.loading = true
      const res = await this.exibir(id)

      if (res && !res.erro) {
        this.formulario = {
          id: res.id,
          nome: res.nome,
          url: res.url,
          created_at: res.created_at ? this.$day(res.created_at).format('DD/MM/YYYY HH:mm:ss') : null,
          created_by: res.created_by
        }
        this.listarRegistroTipos()
        await this.buscarDropdownGrupos(2) // tipos de usuarios
      }
      this.controle.exibir = true
      this.modal = true
      this.loading = false
    },
    async salvarRegistro () {
      if (await this.$refs.observer.validate()) {
        this.loading = true
        const form = {
          id: this.formulario.id || null,
          nome: this.formulario.nome || null,
          url: this.formulario.url || null
        }

        let res
        if (form.id) res = await this.editar(form)
        else res = await this.salvar(form)

        if (res && !res.erro) {
          this.modal = false
          this.resetFormulario()
          this.listarRegistro()
          await this.buscarAcessos(this.perfil)
        }
        this.loading = false
      }
    },
    async excluirRegistro () {
      this.loading = true
      const res = await this.excluir(this.formulario.id)
      if (res && !res.erro) {
        this.modal = false
        this.resetFormulario()
        this.listarRegistro()
        await this.buscarAcessos(this.perfil)
      }
      this.loading = false
    },
    // tipos
    async listarRegistroTipos () {
      this.loading = true
      await this.listarTiposAcesso({
        tela: this.formulario.id
      })
      this.loading = false
    },
    async salvarRegistroTipos () {
      this.loading = true
      const form = {
        tela: this.formulario.id || null,
        tipo: this.formularioRelacionamento.tipoUsuario || null
      }

      const res = await this.salvarTiposAcesso(form)

      if (res && !res.erro) {
        this.formularioRelacionamento.tipoUsuario = null
        this.listarRegistroTipos()
        await this.buscarAcessos(this.perfil)
      }
      this.loading = false
    },
    async excluirRegistroTipos (id) {
      this.loading = true
      const res = await this.excluirTiposAcesso(id)
      if (res && !res.erro) {
        this.listarRegistroTipos()
        await this.buscarAcessos(this.perfil)
      }
      this.loading = false
    },
    resetFormulario () {
      this.formulario = {
        id: null,
        nome: null,
        url: null,
        created_at: null,
        created_by: null
      }
      this.formularioRelacionamento = {
        tipoUsuario: null
      }
      this.controle = {
        exibir: false,
        editar: false,
        inserir: false
      }
    }
  }
}
</script>
