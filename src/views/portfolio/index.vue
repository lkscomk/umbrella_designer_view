<template>
  <v-container fluid>
    <v-row class="mt-5">
      <v-col
        cols="6"
        class="d-flex justify-end"
      >
        <div style="border-radius: 50%; width: 150px; height: 150px;">
          <v-icon
            size="150"
            color="black"
          >
            mdi-account
          </v-icon>
        </div>
      </v-col>
      <v-col
        cols="6"
        class="grey--text my-auto"
      >
        <span class="text-h5 font-weight-bold primary--text pb-0 mb-0">Fulano de Tal</span><br>
        <span class="text-caption pt-0 mt-0">@fulanodetal</span><br>
        <v-icon color="primary">
          mdi-facebook
        </v-icon>
        <v-icon color="primary">
          mdi-instagram
        </v-icon><br>
        <v-icon color="yellow">
          mdi-star
        </v-icon>
        <v-icon color="yellow">
          mdi-star
        </v-icon>
        <v-icon color="yellow">
          mdi-star
        </v-icon>
        <v-icon color="yellow">
          mdi-star
        </v-icon>
        <v-icon>mdi-star</v-icon><br>
      </v-col>
      <v-col
        cols="6"
        class="d-flex justify-end pt-12"
      >
        <v-btn
          type="submit"
          color="primary"
          class="my-3"
        >
          Buscar outro&nbsp;<v-icon>mdi-reload</v-icon>
        </v-btn>
      </v-col>
      <v-col
        cols="6"
        class="d-flex justify-start pt-12"
      >
        <v-btn
          type="submit"
          color="success"
          class="my-3"
        >
          Prosseguir&nbsp;<v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-col>

      <v-col cols="3">
        <v-img
          max-width="600"
          src="@/assets/imagem1.jpg"
        />
      </v-col>
      <v-col cols="3">
        <v-img
          max-width="600"
          src="@/assets/imagem2.jpg"
        />
      </v-col>
      <v-col cols="3">
        <v-img
          max-width="600"
          src="@/assets/imagem3.jpg"
        />
      </v-col>
      <v-col cols="3">
        <v-img
          max-width="600"
          src="@/assets/imagem4.jpg"
        />
      </v-col>
      <v-col cols="3">
        <v-img
          max-width="600"
          src="@/assets/imagem5.jpg"
        />
      </v-col>
      <v-col
        cols="12"
        class="d-flex justify-end pt-12"
      >
        <v-btn
          type="submit"
          color="error"
          class="my-3"
        >
          <v-icon>mdi-chevron-left</v-icon>&nbsp;Voltar
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'TelaPortfolio'
}
</script>
