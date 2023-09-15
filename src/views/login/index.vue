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
              @submit.prevent="''"
            >
              <validation-observer ref="observer">
                <v-container
                  fluid
                  grid-list-xs
                >
                  <v-row dense>
                    <v-col
                      cols="12"
                    >
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
                    <v-col
                      cols="12"
                    >
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
                    <v-col
                      cols="12"
                    >
                      <v-btn
                        text
                        small
                      >
                        Esqueceu a senha?
                      </v-btn>
                    </v-col>
                    <v-col
                      cols="12"
                    >
                      <v-btn
                        color="primary"
                        block
                        class="rounded-button"
                        @click="fazerLogin()"
                      >
                        ENTRAR
                      </v-btn>
                    </v-col>
                    <v-col
                      cols="12"
                    >
                      <div class="text-center mt-3">
                        Ainda não tem conta? <a @click="abrirJenela('/cadastro')">Cadastre-se</a>
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
  data: () => ({
    formulario: {
      email: null,
      senha: null
    }
  }),
  computed: {
    ...mapState('app', [
    ])
  },
  methods: {
    ...mapActions('app', [
      'login'
    ]),
    async fazerLogin () {
      if (await this.$refs.observer.validate()) {
        const res = await this.login({
          email: this.formulario.email || null,
          senha: this.formulario.senha || null
        })
        if (res && !res.erro) {
          this.abrirJenela('/tela-principal')
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
