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
            <v-row
              align="center"
              justify="center"
              class="mt-5"
            >
              <v-col cols="6">
                <v-text-field
                  v-model="formulario.nome"
                  label="Nome"
                  outlined
                  hide-details
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="formulario.email"
                  label="Email"
                  outlined
                  hide-details
                />
              </v-col>
              <v-col cols="6">
                <date-selector
                  v-model="formulario.dataNascimento"
                  hide-details
                  label="Data de Nascimento"
                  outlined
                  readonly
                  clearable
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="formulario.cpf"
                  label="CPF"
                  outlined
                  hide-details
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="formulario.senha"
                  label="Senha"
                  outlined
                  hide-details
                  type="password"
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="formulario.confirmacaoSenha"
                  label="Confirmação de Senha"
                  outlined
                  hide-details
                  type="password"
                />
              </v-col>
              <v-btn
                type="submit"
                color="primary"
                class="my-3"
                @click="abrirJenela('/login')"
              >
                ENTRAR
              </v-btn>
            </v-row>
            <div class="text-center mt-3">
              Já tem uma conta? <a @click="abrirJenela('/login')">Entre aqui</a>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
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
  methods: {
    abrirJenela (tela) {
      const route = this.$router.resolve({ path: tela })

      if (tela) {
        this.$router.push(route.href)
      }
    }
  }
}
</script>
