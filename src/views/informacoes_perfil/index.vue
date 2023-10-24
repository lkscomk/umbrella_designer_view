<template>
  <pagina
    :loading="loading"
    titulo="Informações de Perfil"
    subtitulo="Cadastro e Manutenção"
  >
    <validation-observer ref="observer">
      <v-container
        fluid
        grid-list-xs
      >
        <v-row dense>
          <v-col cols="1">
            <v-text-field
              v-model="formulario.login"
              hide-details
              disabled
              dense
              label="Login"
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
          <v-col cols="6">
            <v-text-field
              v-model="formulario.email"
              hide-details
              disabled
              dense
              label="Email"
              outlined
            />
          </v-col>
          <v-col cols="3">
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
          <v-col cols="3">
            <validation-provider
              v-slot="{ errors }"
              name="CPF"
              vid="cpf"
              rules="required|min:11|numeric"
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
          <v-col cols="3">
            <v-autocomplete
              v-model="formulario.tipoUsuarioId"
              :items="dropdownTipoUsuario"
              hide-details
              disabled
              dense
              item-value="item"
              item-text="descricao"
              label="Tipo de Usuário"
              class="required"
              outlined
            />
          </v-col>
          <v-col cols="3">
            <v-text-field
              v-model="formulario.criadoEm"
              hide-details
              label="Usuário desde"
              disabled
              dense
              outlined
            />
          </v-col>
          <v-col
            cols="12"
            class="d-flex justify-end"
          >
            <v-btn
              v-if="!!(!controle.exibir && (controle.inserir || controle.editar))"
              color="success"
              class="mx-1"
              @click="salvarPerfilUsuario()"
            >
              Salvar
            </v-btn>
            <v-btn
              v-if="!!(controle.exibir && !controle.inserir)"
              color="success"
              class="mx-1"
              @click="controle.editar = true, controle.exibir = false"
            >
              Editar
            </v-btn>
            <v-btn
              v-if="!!(!controle.exibir && (controle.inserir || controle.editar))"
              color="error"
              class="mx-1"
              @click="buscarPerfilUsuario()"
            >
              CANCELAR
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </validation-observer>
  </pagina>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Perfil',
  data: () => ({
    modal: false,
    loading: false,
    perfil: window.atob(localStorage.getItem('umbrella:perfil')),
    formulario: {
      id: null,
      login: null,
      nome: null,
      email: null,
      dataNascimento: null,
      cpf: null,
      criadoEm: null,
      tipoUsuarioId: null
    },
    controle: {
      exibir: false,
      editar: false,
      inserir: false
    }
  }),
  computed: {
    ...mapState('perfil', [
      'dropdownTipoUsuario'
    ]),
    formularioNome: {
      get () {
        return this.formulario.nome ? this.formulario.nome.toUpperCase() : this.formulario.nome
      },
      set (valor) {
        this.formulario.nome = valor.toUpperCase()
      }
    }
  },
  async created () {
    await this.buscarDropdownTipoUsuario(2) // TIPOS DE PERFIS
    this.buscarPerfilUsuario()
  },
  methods: {
    ...mapActions('perfil', [
      'buscarUsuario',
      'salvarUsuario',
      'buscarDropdownTipoUsuario'
    ]),
    async buscarPerfilUsuario () {
      this.loading = true
      const res = await this.buscarUsuario(this.perfil)
      if (res && !res.erro) {
        this.formulario = {
          id: res.id || null,
          login: window.atob(localStorage.getItem('umbrella:login')),
          nome: res.nome || null,
          email: res.email || null,
          dataNascimento: res.data_nascimento || null,
          criadoEm: res.created_at ? this.$day(res.created_at).format('DD/MM/YYYY HH:mm:ss') : null,
          tipoUsuarioId: res.tipo_usuario_id || null,
          cpf: res.cpf || null
        }
        this.controle = {
          exibir: true,
          editar: false,
          inserir: false
        }
      }
      this.loading = false
    },
    async salvarPerfilUsuario () {
      if (await this.$refs.observer.validate()) {
        this.loading = true
        const res = await this.salvarUsuario({
          id: this.formulario.id || null,
          nome: this.formulario.nome || null,
          cpf: this.formulario.cpf || null,
          data_nascimento: this.formulario.dataNascimento || null
        })
        if (res && !res.erro) {
          this.buscarPerfilUsuario()
        }
        this.loading = false
      }
    }
  }
}
</script>
