<template>
  <v-main>
    <nav-bar/>
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
import navBar from '@/components/nav_bar.vue'

export default {
  name: 'telaHome',

  components: {
    navBar
  }
}
</script>
