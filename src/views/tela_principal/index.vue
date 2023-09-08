<template>
  <v-container
    fluid
    class="fill-height d-flex align-center justify-center"
  >
    <v-row class="ma-0 pa-0 d-flex justify-center">
      <v-col
        cols="12"
        class="pt-10 d-flex justify-center align-center"
      >
        <v-img
          max-width="40%"
          :src="require('@/assets/logoUmbrella.png')"
          class="my-3"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'TelaHome'
}
</script>
