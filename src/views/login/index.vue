<template>
  <v-container
    fluid
    class="fill-height d-flex align-center justify-center"
  >
    <v-row class="ma-0 pa-0 d-flex justify-center">
      <v-col cols="4">
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
            Login
          </v-card-title>
          <v-card-text>
            <v-form
              ref="form"
              @submit.prevent="login"
            >
              <v-text-field
                v-model="email"
                label="Email"
                outlined
              />
              <v-text-field
                v-model="senha"
                label="Senha"
                outlined
                type="password"
              />
              <v-row no-gutters>
                <v-col cols="6">
                  <v-btn
                    text
                    small
                  >
                    Esqueceu a senha?
                  </v-btn>
                </v-col>
              </v-row>
              <v-btn
                type="submit"
                color="primary"
                block
                class="rounded-button"
                @click="abrirJenela('/tela-principal')"
              >
                Entrar
              </v-btn>
              <v-col
                cols="12"
                class="text-center d-flex justify-center"
              >
                <div class="text-center mt-3">
                  Ainda não tem conta? <a @click="abrirJenela('/cadastro')">Cadastre-se</a>
                </div>
              </v-col>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<style>
.rounded-button {
  border-radius: 25px;
  font-size: 14px;
}
.bold-label {
  font-weight: bold;
}
</style>
<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'HomeLogin',
  computed: {
    ...mapState('login', [
    ])
  },
  methods: {
    ...mapActions('login', [
      'login'
    ]),
    abrirJenela (tela) {
      const route = this.$router.resolve({ path: tela })

      if (tela) {
        this.$router.push(route.href)
      }
    }
  }
}
</script>
