<template>
  <pagina
    :loading="loading"
    titulo="Informações de Perfil"
    subtitulo="Cadastro e Manutenção"
  >
    <v-row class="px-5">
      <v-col cols="6">
        <validation-provider
          v-slot="{ errors }"
          name="Nome"
          vid="nome"
          rules="required"
        >
          <v-text-field
            v-model="formulario.nome"
            :error-messages="errors"
            :hide-details="!errors.length"
            disabled
            dense
            label="Nome"
            outlined
          />
        </validation-provider>
      </v-col>
      <v-col cols="6">
        <validation-provider
          v-slot="{ errors }"
          name="Email"
          vid="email"
          rules="required|email"
        >
          <v-text-field
            v-model="formulario.email"
            :error-messages="errors"
            :hide-details="!errors.length"
            disabled
            dense
            label="Email"
            outlined
          />
        </validation-provider>
      </v-col>
      <v-col cols="3">
        <validation-provider
          v-slot="{ errors }"
          name="Data de Nascimento"
          vid="dataNascimento"
          rules="required"
        >
          <date-selector
            v-model="formulario.dataNascimento"
            :error-messages="errors"
            :hide-details="!errors.length"
            disabled
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
            disabled
            dense
            label="CPF"
            outlined
          />
        </validation-provider>
      </v-col>
      <v-col cols="3">
        <validation-provider
          v-slot="{ errors }"
          name="Tipo de Usuário"
          vid="empresaOrigem"
          rules="required"
        >
          <v-autocomplete
            v-model="formulario.tipoUsuarioId"
            :items="dropdownTipoUsuario"
            :error-messages="errors"
            :hide-details="!errors.length"
            disabled
            dense
            item-value="item"
            item-text="descricao"
            label="Tipo de Usuário"
            class="required"
            outlined
          />
        </validation-provider>
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
    </v-row>
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
      nome: null,
      email: null,
      dataNascimento: null,
      cpf: null,
      criadoEm: null,
      tipoUsuarioId: null
    }
  }),
  computed: {
    ...mapState('perfil', [
      'dropdownTipoUsuario'
    ])
  },
  async created () {
    await this.buscarDropdownTipoUsuario(2) // TIPOS DE PERFIS
    this.buscarPerfilUsuario()
  },
  methods: {
    ...mapActions('perfil', [
      'buscarUsuario',
      'buscarDropdownTipoUsuario'
    ]),
    async buscarPerfilUsuario () {
      this.loading = true
      const res = await this.buscarUsuario(this.perfil)
      if (res && !res.erro) {
        this.formulario = {
          nome: res.nome || null,
          email: res.email || null,
          dataNascimento: res.data_nascimento || null,
          criadoEm: res.created_at ? this.$day(res.created_at).format('DD/MM/YYYY HH:mm:ss') : null,
          tipoUsuarioId: res.tipo_usuario_id || null,
          cpf: res.cpf || null
        }
      }
      this.loading = false
    }
  }
}
</script>
