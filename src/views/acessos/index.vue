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
              @pesquisar="listarRegistro()"
            >
              <template slot="filtros">
                <v-container
                  class="my-0 py-0"
                  fluid
                >
                  <v-row dense>
                    <v-col cols="3">
                      <v-autocomplete
                        v-model="filtro.grupo"
                        :items="dropdownGrupos"
                        disabled
                        hide-details
                        dense
                        item-value="item"
                        item-text="descricao"
                        label="Grupo"
                        outlined
                      />
                    </v-col>
                    <v-col cols="3">
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
              @exibir="listarRelacionamentoRegistro($event.item)"
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
            @click="modalAdicionar = false, resetVoltarRelacionamento()"
          >
            <v-icon dark>
              mdi-chevron-left
            </v-icon>
          </v-btn>
          <v-toolbar-title class="px-2">
            Cadastrado e Manutenção
          </v-toolbar-title>
        </v-toolbar>
        <v-card-text class="pa-0 ma-0">
          <v-container>
            <v-row>
              <v-col
                cols="12"
              >
                <filtro
                  :options="optionsFilterRelacionamento"
                  @adicionar="controle.inserir = true, modalAdicionar = true, formulario.item = encontrarProximoItem(registrosRelacionamento)"
                  @pesquisar="listarRelacionamentoRegistro(filtroRelacionamento.grupo)"
                >
                  <template slot="filtros">
                    <v-container
                      class="my-0 py-0"
                      fluid
                    >
                      <v-row dense>
                        <v-col cols="3">
                          <v-autocomplete
                            v-model="filtroRelacionamento.grupo"
                            :items="dropdownGrupos"
                            disabled
                            hide-details
                            dense
                            item-value="item"
                            item-text="descricao"
                            label="Grupo"
                            outlined
                          />
                        </v-col>
                        <v-col cols="3">
                          <v-text-field
                            v-model="filtroRelacionamento.descricao"
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
                  :registros="registrosRelacionamento"
                  exibir
                  @exibir="exibirRegistro($event)"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="error"
            @click="modal = false, resetVoltar()"
          >
            Fechar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- exibir item -->
    <v-dialog
      v-model="modalAdicionar"
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
            @click="modalAdicionar = false, resetVoltarRelacionamento()"
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
                    cols="1"
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
                    :cols="formulario.id ? 4 : 5"
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
                  <v-col cols="2">
                    <v-text-field
                      v-model="formulario.item"
                      hide-details
                      disabled
                      dense
                      label="Item*"
                      outlined
                    />
                  </v-col>
                  <v-col cols="5">
                    <validation-provider
                      v-slot="{ errors }"
                      name="Nome"
                      vid="nome"
                      rules="required"
                    >
                      <v-text-field
                        v-model="formulario.descricao"
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
                    cols="4"
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
                    cols="4"
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
            disabled
            @click="controle.editar = true, controle.exibir = false"
          >
            Editar
          </v-btn>
          <v-btn
            color="error"
            @click="modalAdicionar = false, resetVoltarRelacionamento()"
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
        text: 'Grupo',
        align: 'start',
        sortable: false,
        value: 'grupo'
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
      descricao: null,
      grupo: 1
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
    modal: false,
    modalAdicionar: false
  }),
  computed: {
    ...mapState('acessos', [
      'registros',
      'registrosRelacionamento',
      'dropdownGrupos'
    ]),
    optionsFilter () {
      return {
        adicionar: false,
        values: !!(this.filtro.descricao)
      }
    },
    optionsFilterRelacionamento () {
      return {
        adicionar: true,
        values: !!(this.filtroRelacionamento.descricao)
      }
    }
  },
  async created () {
    await this.buscarDropdownGrupos(1) // GRUPOS DE OPÇOES
    this.listarRegistro()
  },
  methods: {
    ...mapMutations('acessos', [
      'setRegistrosRelacionamento'
    ]),
    ...mapActions('acessos', [
      'listar',
      'salvar',
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
        const res = await this.salvar({
          item: this.formulario.item || null,
          grupo: this.formulario.grupo || null,
          descricao: this.formulario.descricao || null
        })
        if (res && !res.erro) {
          this.modalAdicionar = false
          this.resetVoltarRelacionamento()
          this.listarRelacionamentoRegistro(this.filtroRelacionamento.grupo)
        }
        this.loading = false
      }
    },
    async excluirRegistro () {
      this.loading = true
      const res = await this.excluir(this.formulario.id)
      if (res && !res.erro) {
        this.listarRelacionamentoRegistro(this.formulario.grupo)
        this.modalAdicionar = false
        this.resetVoltarRelacionamento()
      }
      this.loading = false
    },
    encontrarProximoItem (sequencia) {
      const valoresItem = sequencia.map((obj) => obj.item)
      const maiorItem = Math.max(...valoresItem)

      const proximoItem = maiorItem + 1

      return proximoItem
    },

    exibirRegistro (registro) {
      this.formulario = {
        id: registro.id || null,
        created_at: registro.created_at || null,
        created_by: registro.created_by || null,
        item: registro.item || null,
        grupo: registro.grupo || null,
        descricao: registro.descricao || null
      }
      this.modalAdicionar = true
      this.controle.exibir = true
    },
    resetVoltar () {
      this.setRegistrosRelacionamento([])
    },
    resetVoltarRelacionamento () {
      this.modalAdicionar = false
      this.controle = {
        exibir: null,
        inserir: null,
        editar: null
      }
      this.formulario.created_at = null
      this.formulario.created_by = null
      this.formulario.id = null
      this.formulario.item = null
      this.formulario.descricao = null
    }
  }
}
</script>
