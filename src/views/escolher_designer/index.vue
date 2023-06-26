<template>
  <v-main>
    <v-container fluid>
      <v-row align="center" justify="center" class="mt-5">
        <v-col cols="12" sm="8" md="4">
          <v-card flat width="1200">
            <v-card-title class="d-flex justify-center pa-0">Opa! Seu pedido foi encaminhado para...</v-card-title>
            <v-card flat>
              <v-icon
                size="150"
                color="black"
              >
                mdi-account
              </v-icon>
            </v-card>
            <v-card-text>
            <v-row align="center" justify="center" class="mt-5">
              <v-col cols="12" sm="8" md="4">
                Nome do(a) designer
                Há 0 anos na área de social media
                Photoshop Ilustrator Canvas
                NÚMERO ESTRELAS
                Ver portfólio do(a) designer.
              </v-col>
              <v-btn type="submit" color="primary" class="my-3">Buscar outro</v-btn>
              <v-btn type="submit" color="success" class="my-3">Prosseguir</v-btn>
            </v-row>
          </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
export default {
  name: 'telaEscolherDesign'
}
</script>
