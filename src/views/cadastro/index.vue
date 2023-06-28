<template>
    <v-container fluid class="fill-height d-flex align-center justify-center">
      <v-row class="ma-0 pa-0 d-flex justify-center">
        <v-col cols="6" class="ma-0 pa-0">
          <v-col cols="12" class="d-flex justify-center">
            <v-img max-width="400" src="@/assets/logotipo.png"></v-img>
          </v-col>
          <v-card flat width="1200">
            <v-card-title class="d-flex justify-center pa-0">Cadastro</v-card-title>
          <v-card-text>
            <v-row align="center" justify="center" class="mt-5">
              <v-col cols="6">
                <v-text-field v-model="nome" label="Nome" outlined hide-details></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field v-model="email" label="Email" outlined hide-details></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field v-model="email" label="Data de nascimento" outlined hide-details></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field v-model="cpf" label="CPF" outlined hide-details></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field v-model="senha" label="Senha" outlined hide-details type="password"></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field v-model="confirmacaoSenha" label="Confirmação de Senha" outlined hide-details type="password"></v-text-field>
              </v-col>
              <v-btn type="submit" color="primary" class="my-3">ENTRAR</v-btn>
            </v-row>
            <div class="text-center mt-3">
              Já tem uma conta? <a href="#">Entre aqui</a>
            </div>
          </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
export default {
  name: 'telaCadastro'
}
</script>
