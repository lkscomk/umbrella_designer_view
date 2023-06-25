<template>
  <v-container fluid>
    <v-row align="center" justify="center" class="mt-5">
      <v-col cols="12" sm="8" md="4">
        <v-img :src="require('@/assets/logoUmbrella.png')" class="my-3" contain height="150" />
        <v-card-title class="text-center d-flex justify-center bold-label">Login</v-card-title>
        <v-card>
          <v-card-text>
            <v-form ref="form" @submit.prevent="login">
              <v-text-field v-model="email" label="Email" outlined></v-text-field>
              <v-text-field v-model="senha" label="Senha" outlined type="password"></v-text-field>
              <v-row no-gutters>
                <v-col cols="6">
                  <v-btn text small>Esqueceu a senha?</v-btn>
                </v-col>
              </v-row>
              <v-btn type="submit" color="primary" block class="rounded-button">Entrar</v-btn>
              <v-col cols="12" class="text-center d-flex justify-center">
                <v-btn text small>Ainda não tem conta? Cadastre-se</v-btn>
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
export default {
  name: 'homeLogin'
  //   data() {
  //     return {
  //       email: ''
  //       senha: ''
  //     }
  //   }
  //   methods: {
  //     login () {
  //       // Lógica de autenticação aqui
  //       console.log('Email:', this.email)
  //       console.log('Senha:', this.senha)
  //     }
  //   }
}
</script>
