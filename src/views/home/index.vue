<template>
<template>
  <v-container fluid class="fill-height d-flex align-center justify-center pa-0 ma-0">
    <v-row class="fill-height d-flex align-center justify-center pa-0 ma-0">
      <v-col cols="6" class="ma-0 pa-0">
        <v-col cols="12" class="d-flex justify-center">
          <v-img src="@/assets/design_perfeito.png"></v-img>
        </v-col>
      </v-col>
    </v-row>
    <v-row class="fill-height pa-0 ma-0 color primaryHome">
      <v-col cols="12" class="py-10 ma-0 d-flex align-center justify-center color">
        <v-img max-width="450px" contain src="@/assets/logoUmbrellaBranca.png"></v-img>
      </v-col>
      <v-col cols="2" class="pa-0 ma-0 color "></v-col>
      <v-col cols="4" class="pa-0 ma-0 color d-flex align-center justify-center">
        <span class="titulo">Quem somos?</span>
        <br/>
        <br/>
        <br/>
        <span class="descricao">A Umbrella Designer vem com a proposta de ajudar a conectar quem precisa de um banner a quem pode oferecer o serviço.</span>
      </v-col>
      <v-col cols="6" class="pa-0 ma-0 d-flex align-start justify-center">
        <v-img class="pa-0 ma-0 color " max-width="400px" contain src="@/assets/ideia.png"></v-img>
      </v-col>
      <v-col cols="12" class="pa-0 ma-0 color "></v-col>
    </v-row>
  </v-container>
</template>

</template>

<script>
export default {
  name: 'telaSite'
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali+UI&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Mulish&display=swap');

.titulo {
  color: #FFF;
  font-size: 35px;
  font-family: 'Mulish', sans-serif;
  font-weight: 800;
}

.descricao {
  color: #FFF;
  font-size: 25px;
  font-family: 'Mulish', sans-serif;
  display: flex;
}
</style>
