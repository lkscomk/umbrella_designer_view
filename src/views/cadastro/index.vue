<template>
  <v-container
    fluid
    class="fill-height d-flex align-center justify-center"
  >
    <v-row class="ma-0 pa-0 d-flex justify-center">
      <v-col
        cols="6"
        class="ma-0 pa-0"
      >
        <v-col
          cols="12"
          class="d-flex justify-center"
        >
          <v-img
            max-width="400"
            src="@/assets/logotipo.png"
          />
        </v-col>
        <v-card
          flat
          width="1200"
        >
          <v-card-title class="d-flex justify-center pa-0">
            Cadastro
          </v-card-title>
          <v-card-text>
            <v-form
              ref="form"
              @submit.prevent="''"
            >
              <validation-observer ref="observer">
                <v-container
                  fluid
                  grid-list-xs
                >
                  <v-row dense>
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
                          label="Email"
                          outlined
                        />
                      </validation-provider>
                    </v-col>
                    <v-col cols="4">
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
                          label="Data de Nascimento"
                          outlined
                          readonly
                          clearable
                        />
                      </validation-provider>
                    </v-col>
                    <v-col cols="4">
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
                          label="CPF"
                          outlined
                        />
                      </validation-provider>
                    </v-col>
                    <v-col cols="4">
                      <validation-provider
                        v-slot="{ errors }"
                        name="Tipo de Usuário"
                        vid="empresaOrigem"
                        rules="required"
                      >
                        <v-autocomplete
                          v-model="formulario.tipoUsuarioId"
                          :items="dropdownTipoUsuarioRestrito"
                          :error-messages="errors"
                          :hide-details="!errors.length"
                          item-value="item"
                          item-text="descricao"
                          label="Tipo de Usuário"
                          class="required"
                          outlined
                        />
                      </validation-provider>
                    </v-col>
                    <v-col cols="6">
                      <validation-provider
                        v-slot="{ errors }"
                        name="Senha"
                        vid="senha"
                        rules="required|min:8"
                      >
                        <v-text-field
                          v-model="formulario.senha"
                          :error-messages="errors"
                          :hide-details="!errors.length"
                          label="Senha"
                          outlined
                          type="password"
                        />
                      </validation-provider>
                    </v-col>
                    <v-col cols="6">
                      <validation-provider
                        v-slot="{ errors }"
                        name="Confirmação de Senha"
                        vid="confirmacaoSenha"
                        rules="required|min:8"
                      >
                        <v-text-field
                          v-model="formulario.confirmacaoSenha"
                          :error-messages="errors"
                          :hide-details="!errors.length"
                          label="Confirmação de Senha"
                          outlined
                          type="password"
                        />
                      </validation-provider>
                    </v-col>
                    <v-col
                      cols="12"
                      class="mt-3"
                    >
                      <v-btn
                        color="primary"
                        block
                        class="rounded-button"
                        @click="cadastrarUsuario()"
                      >
                        ENTRAR
                      </v-btn>
                    </v-col>
                    <v-col cols="12">
                      <div class="text-center mt-3">
                        Já tem uma conta? <a @click="abrirJenela('/login')">Entre aqui</a>
                      </div>
                    </v-col>
                  </v-row>
                </v-container>
              </validation-observer>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'TelaCadastro',
  data: () => ({
    formulario: {
      nome: null,
      email: null,
      dataNascimento: null,
      cpf: null,
      senha: null,
      confirmacaoSenha: null
    }
  }),
  computed: {
    ...mapState('cadastro', [
      'dropdownTipoUsuarioRestrito'
    ])
  },
  async created () {
    await this.buscarDropdownTipoUsuarioRestrito(2) // TIPOS DE PERFIS
  },
  methods: {
    ...mapActions('cadastro', [
      'buscarDropdownTipoUsuarioRestrito',
      'cadastrar'
    ]),
    async cadastrarUsuario () {
      if (await this.$refs.observer.validate()) {
        if (this.formulario.senha === this.formulario.confirmacaoSenha) {
          const res = await this.cadastrar({
            tipoUsuarioId: this.formulario.tipoUsuarioId || null,
            dataNascimento: this.formulario.dataNascimento || null,
            nome: this.formulario.nome || null,
            email: this.formulario.email || null,
            senha: this.formulario.senha || null,
            cpf: this.formulario.cpf || null
          })

          if (res && !res.erro) {
            this.abrirJenela('/login')
          }
        } else {
          this.$notificacao('As senhas devem ser iguais.', 'erro')
        }
      }
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
