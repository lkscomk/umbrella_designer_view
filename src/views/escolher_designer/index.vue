<template>
  <v-main>
    <v-container fluid>
      <v-row align="center" justify="center" class="mt-5">
        <v-col cols="10">
          <v-card flat width="1200">
            <v-row>
            <v-col cols="12" class= "d-flex justify-center pa-0 color blue">Opa! Seu pedido foi encaminhado para...</v-col>
            <v-col cols="5" class="d-flex justify-end color green">
              <div style="border-radius: 50%; width: 150px; height: 150px;" class="color red">
                <v-icon size="150" color="black">mdi-account</v-icon>
              </div>
            </v-col>
            <v-col cols="7" class="grey--text my-auto">
              <span class="text-h5 font-weight-bold pb-0 mb-0">Fulano de Tal</span><br>
              <span class="text-caption pt-0 mt-0">Há 4 anos na área de social media</span><br>
              <span>Photoshop&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ilustrator&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Canvas</span><br>
              <v-icon color="yellow">mdi-star</v-icon>
              <v-icon color="yellow">mdi-star</v-icon>
              <v-icon color="yellow">mdi-star</v-icon>
              <v-icon color="yellow">mdi-star</v-icon>
              <v-icon>mdi-star</v-icon><br>
              <span class="text-decoration-underline">Ver portfólio do(a) designer.</span>
            </v-col>
            <v-btn type="submit" color="primary" class="my-3">Buscar outro</v-btn>
            <v-btn type="submit" color="success" class="my-3">Prosseguir</v-btn>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
        <v-col cols="6">
          <v-card-title>Opa! Seu pedido foi encaminhado para...</v-card-title>
        </v-col>

        <v-card flat>
          <v-icon
            size="150"
            color="black"
          >
            mdi-account
          </v-icon>
        </v-card>
    </v-row>
  </v-container>
  </v-main>
</template>

<script>
export default {
  name: 'telaEscolherDesign'
}
</script>
