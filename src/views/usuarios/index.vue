<template>
  <pagina
    :loading="loading"
    subtitulo="Página de Manutenção de Usuários"
    titulo="Usuários"
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
              @clearFilters="limparFiltros()"
              @pesquisar="listarRegistro()"
            >
              <template slot="filtros">
                <v-container
                  class="my-0 py-0"
                  fluid
                >
                  <v-row dense>
                    <v-col
                      xl="1"
                      lg="1"
                      md="4"
                      sm="12"
                      cols="12"
                    >
                      <v-text-field
                        v-model="filtro.id"
                        hide-details
                        dense
                        label="Id"
                        outlined
                      />
                    </v-col>
                    <v-col
                      xl="3"
                      lg="3"
                      md="8"
                      sm="12"
                      cols="12"
                    >
                      <v-text-field
                        v-model="filtro.nome"
                        hide-details
                        dense
                        label="Nome"
                        outlined
                      />
                    </v-col>
                    <v-col
                      xl="2"
                      lg="2"
                      md="4"
                      sm="12"
                      cols="12"
                    >
                      <selecao-all
                        v-model="filtro.tipo"
                        :items="dropdownTiposUsuarios"
                        hide-details
                        dense
                        item-value="item"
                        item-text="descricao"
                        label="Tipo"
                        outlined
                      />
                    </v-col>
                    <v-col
                      xl="3"
                      lg="3"
                      md="8"
                      sm="12"
                      cols="12"
                    >
                      <v-text-field
                        v-model="filtro.email"
                        hide-details
                        dense
                        label="Email"
                        outlined
                      />
                    </v-col>
                    <v-col
                      xl="3"
                      lg="3"
                      md="8"
                      sm="12"
                      cols="12"
                    >
                      <v-text-field
                        v-model="filtro.cpf"
                        hide-details
                        dense
                        label="CPF"
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
    <v-dialog
      v-model="modal"
      persistent
      max-width="1000px"
    >
      <v-card>
        <v-card-title>
          {{ controle.editar ? 'Editar Registro' : controle.inserir ? 'Adicionar Registro' : 'Exibir Registro' }}
        </v-card-title>
        <v-card-text class="ma-0 pa-0 px-2">
          <v-form @submit.prevent="''">
            <validation-observer ref="observer">
              <v-container
                class="my-0 py-0"
                fluid
              >
                <v-row dense>
                  <v-col
                    xl="2"
                    lg="2"
                    md="2"
                    sm="2"
                    cols="12"
                  >
                    <v-text-field
                      v-model="formulario.id"
                      disabled
                      hide-details
                      dense
                      label="Id"
                      outlined
                    />
                  </v-col>
                  <v-col
                    xl="2"
                    lg="2"
                    md="2"
                    sm="4"
                    cols="12"
                  >
                    <v-text-field
                      v-model="formulario.login"
                      disabled
                      hide-details
                      dense
                      label="Login"
                      outlined
                    />
                  </v-col>
                  <v-col
                    xl="4"
                    lg="4"
                    md="4"
                    sm="6"
                    cols="12"
                  >
                    <validation-provider
                      v-slot="{ errors }"
                      name="Nome"
                      vid="nome"
                      rules="required"
                    >
                      <v-text-field
                        v-model="formularioNome"
                        :error-messages="errors"
                        :hide-details="!errors.length"
                        :disabled="controle.exibir"
                        dense
                        label="Nome"
                        outlined
                      />
                    </validation-provider>
                  </v-col>
                  <v-col
                    xl="4"
                    lg="4"
                    md="4"
                    sm="4"
                    cols="12"
                  >
                    <validation-provider
                      v-slot="{ errors }"
                      name="Tipo"
                      vid="tipo"
                      rules="required"
                    >
                      <v-autocomplete
                        v-model="formulario.tipo"
                        :items="dropdownTiposUsuarios"
                        :error-messages="errors"
                        :hide-details="!errors.length"
                        :disabled="controle.exibir"
                        dense
                        item-value="item"
                        item-text="descricao"
                        label="Tipo"
                        outlined
                      />
                    </validation-provider>
                  </v-col>
                  <v-col
                    xl="4"
                    lg="4"
                    md="4"
                    sm="8"
                    cols="12"
                  >
                    <v-text-field
                      v-model="formulario.email"
                      disabled
                      hide-details
                      dense
                      label="Email"
                      outlined
                    />
                  </v-col>
                  <v-col
                    xl="3"
                    lg="3"
                    md="3"
                    sm="4"
                    cols="12"
                  >
                    <validation-provider
                      v-slot="{ errors }"
                      name="Data de Nascimento"
                      vid="dataNascimento"
                      rules="required"
                    >
                      <date-selector
                        ref="dataSelector"
                        v-model="formulario.dataNascimento"
                        :error-messages="errors"
                        :hide-details="!errors.length"
                        :disabled="controle.exibir"
                        dense
                        label="Data de Nascimento"
                        outlined
                        readonly
                        clearable
                      />
                    </validation-provider>
                  </v-col>
                  <v-col
                    xl="2"
                    lg="2"
                    md="2"
                    sm="4"
                    cols="12"
                  >
                    <validation-provider
                      v-slot="{ errors }"
                      name="CPF"
                      vid="cpf"
                      rules="required|numeric|cpf"
                    >
                      <v-text-field
                        v-model="formulario.cpf"
                        :error-messages="errors"
                        :hide-details="!errors.length"
                        :disabled="controle.exibir"
                        dense
                        label="CPF"
                        outlined
                      />
                    </validation-provider>
                  </v-col>
                  <v-col
                    xl="3"
                    lg="3"
                    md="3"
                    sm="4"
                    cols="12"
                  >
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
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            v-if="!!(!controle.exibir && (controle.inserir || controle.editar))"
            color="success"
            @click="editarRegistro()"
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
  name: 'PaginaUsuarios',
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
        text: 'Tipo',
        align: 'start',
        sortable: false,
        value: 'tipo'
      },
      {
        text: 'Email',
        align: 'start',
        sortable: false,
        value: 'email'
      },
      {
        text: 'CPF',
        align: 'start',
        sortable: false,
        value: 'cpf'
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
      tipo: [],
      nome: null,
      email: null,
      cpf: null
    },
    controle: {
      exibir: false,
      editar: false,
      inserir: false
    },
    formulario: {
      id: null,
      nome: null,
      login: null,
      tipo: null,
      dataNascimento: null,
      email: null,
      cpf: null,
      created_at: null
    },
    modal: false
  }),
  computed: {
    ...mapState('usuarios', [
      'registros',
      'registrosRelacionamento',
      'dropdownTiposUsuarios'
    ]),
    formularioNome: {
      get () {
        return this.formulario.nome ? this.formulario.nome.toUpperCase() : this.formulario.nome
      },
      set (valor) {
        this.formulario.nome = valor.toUpperCase()
      }
    },
    filtroValor () {
      return !!(
        (this.filtro.tipo
          ? this.filtro.tipo.length
          : null) ||
        this.filtro.nome ||
        this.filtro.email ||
        this.filtro.id ||
        this.filtro.cpf
      )
    },
    optionsFilter () {
      return {
        adicionar: false,
        values: this.filtroValor
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
    await this.buscarDropdownTiposUsuarios(2) // TIPOS USUARIOS
    this.listarRegistro()
  },
  methods: {
    ...mapMutations('usuarios', [
      'setRegistrosRelacionamento'
    ]),
    ...mapActions('usuarios', [
      'listar',
      'exibir',
      'editar',
      'listarRelacionamento',
      'buscarDropdownTiposUsuarios'
    ]),
    async listarRegistro () {
      this.loading = true
      await this.listar({
        id: this.filtro.id || null,
        tipo: this.filtro.tipo && this.filtro.tipo.length ? this.filtro.tipo : null,
        nome: this.filtro.nome || null,
        email: this.filtro.email || null,
        cpf: this.filtro.cpf || null
      })
      this.loading = false
    },
    async exibirRegistro (usuario) {
      this.loading = true
      const res = await this.exibir(usuario.id)
      if (res && !res.erro) {
        this.formulario = {
          id: res.id || null,
          nome: res.nome || null,
          login: `${res.id}-${res.nome.split(' ')[0]}`,
          tipo: res.tipo_usuario_id || null,
          dataNascimento: res.data_nascimento || null,
          email: res.email || null,
          cpf: res.cpf || null,
          created_at: res.created_at ? this.$day(res.created_at).format('DD/MM/YYYY HH:mm:ss') : null
        }
      }
      this.modal = true
      this.loading = false
      this.controle.exibir = true
    },
    async editarRegistro () {
      if (await this.$refs.observer.validate()) {
        this.loading = true

        const form = {
          id: this.formulario.id || undefined,
          nome: this.formulario.nome || undefined,
          tipo: this.formulario.tipo || undefined,
          email: this.formulario.email || undefined,
          data_nascimento: this.formulario.dataNascimento || undefined,
          cpf: this.formulario.cpf || undefined
        }

        const res = await this.editar(form)
        if (res && !res.erro) {
          this.modal = false
          this.listarRegistro()
        }
        this.loading = false
      }
    },
    resetFormulario () {
      this.$refs.observer.reset()
      this.formulario = {
        id: null,
        nome: null,
        login: null,
        tipo: null,
        dataNascimento: null,
        email: null,
        cpf: null,
        created_at: null
      }
    },
    limparFiltros () {
      this.filtro = {
        id: null,
        tipo: [],
        nome: null,
        email: null,
        cpf: null
      }
    }
  }
}
</script>
