<template>
  <pagina
    :loading="loading"
    subtitulo="Página de Manutenção de Opções"
    titulo="Opções"
  >
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

    <v-dialog
      v-model="modal"
      persistent
      max-width="1200px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Cadastrado e Manutenção</span>
        </v-card-title>
        <v-card-text class="pa-0 ma-0">
          <v-container>
            <v-row>
              <v-col
                cols="12"
              >
                <filtro
                  :options="optionsFilterRelacionamento"
                  @adicionar="controle.inserir = true, modalAdicionar = true, formulario.item = Number(registrosRelacionamento.reduce((maior, objeto) => objeto.item > maior? objeto.item : maior.item)) + 1"
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
            @click="modal = false"
          >
            Fechar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="modalAdicionar"
      persistent
      max-width="800px"
    >
      <v-card>
        <v-card-title>
          {{ controle.editar ? 'Editar Registro' : controle.inserir ? 'Adicionar Registro' : 'Exibir Registro' }}
        </v-card-title>
        <v-card-text class="ma-0 pa-0 px-2">
          <v-form @submit.prevent="''">
            <validation-observer ref="observer">
              <v-container
                fluid
                grid-list-xs
              >
                <v-row dense>
                  <v-col cols="4">
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
                  <v-col cols="3">
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
      grupo: null,
      item: null,
      descricao: null
    },
    modal: false,
    modalAdicionar: false
  }),
  computed: {
    ...mapState('opcoes', [
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
    ...mapMutations('opcoes', [
      'setRegistrosRelacionamento'
    ]),
    ...mapActions('opcoes', [
      'listar',
      'salvar',
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
        grupo: grupo
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
          this.resetFormulario()
          this.listarRelacionamentoRegistro(this.filtroRelacionamento.grupo)
        }
        this.loading = false
      }
    },
    exibirRegistro (registro) {
      this.formulario = {
        item: registro.item || null,
        grupo: registro.grupo || null,
        descricao: registro.descricao || null
      }
      this.modalAdicionar = true
      this.controle.exibir = true
    },
    resetFormulario () {
      this.modal = false
      this.formulario = {
        item: null,
        grupo: null,
        descricao: null
      }
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
      this.resetFormulario()
    }
  }
}
</script>
