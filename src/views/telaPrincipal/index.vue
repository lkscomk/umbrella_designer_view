<template>
  <v-main>
    <v-container fluid>
    <v-row  class="mt-5 d-flex justify-center align-center">
      <v-col cols="12" sm="8" md="4">
          <v-img :src="require('@/assets/logoUmbrella.png')" class="my-3" contain height="150" />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>

export default {
  name: 'telaHome'
}
</script>
