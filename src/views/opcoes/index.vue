<template>
  <pagina
    :loading="loading"
    subtitulo="Página de Manutenção de Opções"
    titulo="Opções"
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
              @adicionar="controle.inserir = true, modal = true, formulario.item = encontrarProximoItem(registros), formulario.grupo = filtro.grupo"
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

    <!-- exibir item -->
    <v-dialog
      v-model="modal"
      persistent
      max-width="800px"
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
        </v-toolbar>

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
        <v-card-text class="ma-0 pa-0 px-2">
          <v-form @submit.prevent="''">
            <validation-observer ref="observer">
              <v-container
                fluid
                grid-list-xs
              >
                <v-row dense>
                  <v-col
                    v-if="formulario.id"
                    xl="1"
                    lg="1"
                    md="1"
                    sm="3"
                    cols="12"
                  >
                    <v-text-field
                      v-model="formulario.id"
                      hide-details
                      disabled
                      dense
                      label="Id"
                      outlined
                    />
                  </v-col>
                  <v-col
                    :xl="formulario.id ? 4 : 5"
                    :lg="formulario.id ? 4 : 5"
                    :md="formulario.id ? 4 : 5"
                    :sm="formulario.id ? 6 : 5"
                    cols="12"
                  >
                    <v-autocomplete
                      v-model="formulario.grupo"
                      :items="dropdownGrupos"
                      disabled
                      hide-details
                      dense
                      item-value="item"
                      item-text="descricao"
                      label="Grupo*"
                      outlined
                    />
                  </v-col>
                  <v-col
                    xl="2"
                    lg="2"
                    md="2"
                    sm="2"
                    cols="12"
                  >
                    <v-text-field
                      v-model="formulario.item"
                      hide-details
                      disabled
                      dense
                      label="Item*"
                      outlined
                    />
                  </v-col>
                  <v-col
                    xl="5"
                    lg="5"
                    md="5"
                    sm="5"
                    cols="12"
                  >
                    <validation-provider
                      v-slot="{ errors }"
                      name="Descrição"
                      vid="descricao"
                      rules="required"
                    >
                      <v-text-field
                        v-model="formularioDescricao"
                        :error-messages="errors"
                        :hide-details="!errors.length"
                        :disabled="controle.exibir"
                        dense
                        label="Descrição*"
                        outlined
                      />
                    </validation-provider>
                  </v-col>
                  <v-col
                    v-if="formulario.id"
                    xl="3"
                    lg="3"
                    md="3"
                    sm="3"
                    cols="12"
                  >
                    <v-text-field
                      v-model="formulario.created_by"
                      hide-details
                      disabled
                      dense
                      label="Criado Por"
                      outlined
                    />
                  </v-col>
                  <v-col
                    v-if="formulario.id"
                    xl="4"
                    lg="4"
                    md="4"
                    sm="4"
                    cols="12"
                  >
                    <v-text-field
                      v-model="formulario.created_at"
                      hide-details
                      disabled
                      dense
                      label="Criado Em"
                      outlined
                    />
                  </v-col>
                  <v-col cols="12">
                    <small>* Campos Obrigatórios</small>
                  </v-col>
                </v-row>
              </v-container>
            </validation-observer>
          </v-form>
        </v-card-text>
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
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  name: 'OpcoesGlobais',
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
        text: 'Grupo',
        align: 'start',
        sortable: false,
        value: 'grupo'
      },
      {
        text: 'Descrição Grupo',
        align: 'start',
        sortable: false,
        value: 'descricaoGrupo'
      },
      {
        text: 'Item',
        align: 'start',
        sortable: false,
        value: 'item'
      },
      {
        text: 'Descrição',
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
      grupo: 1,
      descricao: null
    },
    filtroRelacionamento: {
      descricao: null,
      grupo: null
    },
    controle: {
      exibir: false,
      editar: false,
      inserir: false
    },
    formulario: {
      id: null,
      created_at: null,
      created_by: null,
      grupo: null,
      item: null,
      descricao: null
    },
    modal: false
  }),
  computed: {
    ...mapState('opcoes', [
      'registros',
      'registrosRelacionamento',
      'dropdownGrupos'
    ]),
    formularioDescricao: {
      get () {
        return this.formulario.descricao ? this.formulario.descricao.toUpperCase() : this.formulario.descricao
      },
      set (valor) {
        this.formulario.descricao = valor.toUpperCase()
      }
    },
    optionsFilter () {
      return {
        adicionar: true,
        values: !!(this.filtro.descricao || this.filtro.grupo)
      }
    }
  },
  async created () {
    await this.buscarDropdownGrupos(1) // GRUPOS DE OPÇOES
    this.listarRegistro()
  },
  methods: {
    ...mapMutations('opcoes', [
      'setRegistrosRelacionamento'
    ]),
    ...mapActions('opcoes', [
      'listar',
      'exibir',
      'salvar',
      'editar',
      'excluir',
      'listarRelacionamento',
      'buscarDropdownGrupos'
    ]),
    async listarRegistro () {
      this.loading = true
      await this.listar({
        grupo: this.filtro.grupo || null,
        descricao: this.filtro.descricao || null
      })
      this.loading = false
    },
    async listarRelacionamentoRegistro (grupo) {
      this.loading = true
      this.filtroRelacionamento.grupo = grupo
      await this.listarRelacionamento({
        grupo: this.filtroRelacionamento.grupo || null,
        descricao: this.filtroRelacionamento.descricao || null
      })
      this.formulario = {
        grupo: grupo,
        item: null,
        descricao: null
      }
      this.modal = true
      this.loading = false
    },
    async salvarRegistro () {
      if (await this.$refs.observer.validate()) {
        this.loading = true
        const form = {
          id: this.formulario.id || undefined,
          item: this.formulario.item || null,
          grupo: this.formulario.grupo || null,
          descricao: this.formulario.descricao || null
        }

        let res
        if (form.id) res = await this.editar(form)
        else res = await this.salvar(form)

        if (res && !res.erro) {
          this.modal = false
          this.resetFormulario()
          this.listarRegistro()
        }
        this.loading = false
      }
    },
    async excluirRegistro () {
      this.loading = true
      const res = await this.excluir(this.formulario.id)
      if (res && !res.erro) {
        this.listarRegistro(this.formulario.grupo)
        this.modal = false
        this.resetFormulario()
      }
      this.loading = false
    },
    encontrarProximoItem (sequencia) {
      const valoresItem = sequencia.map((obj) => obj.item)
      const maiorItem = Math.max(...valoresItem)

      const proximoItem = maiorItem + 1

      return proximoItem
    },

    async exibirRegistro (registro) {
      this.loading = true
      const res = await this.exibir(registro.id)
      if (res && !res.erro) {
        this.formulario = {
          id: res.id || null,
          created_at: res.created_at || null,
          created_by: res.created_by || null,
          item: res.item || null,
          grupo: res.grupo || null,
          descricao: res.descricao || null
        }
      }
      this.loading = false
      this.modal = true
      this.controle.exibir = true
    },
    async resetFormulario () {
      await this.buscarDropdownGrupos(1) // GRUPOS DE OPÇOES
      this.modal = false
      this.controle = {
        exibir: null,
        inserir: null,
        editar: null
      }
      this.formulario = {
        id: null,
        created_at: null,
        created_by: null,
        item: null,
        grupo: null,
        descricao: null
      }
    }
  }
}
</script>
