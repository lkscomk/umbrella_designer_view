<template>
  <v-main>
    <v-container fluid class="d-flex justify-center">
      <v-row>
        <v-col cols="6">
          <v-img :src="require('@/assets/image-area.svg')" class="my-3" contain height="200" />
        </v-col>
        <v-col cols="6">
          <v-col cols="12">
            <div class="grey--text mb-2">Pedido Nº 21354 finalizado com sucesso!</div>
          </v-col>
          <v-col cols="12">
            <v-text-field label="Subtitúlo*" outlined requerid hide-details></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field label="Subtitúlo*" outlined requerid hide-details></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field label="Subtitúlo*" outlined requerid hide-details></v-text-field>
          </v-col>
        </v-col>
        <v-col cols="10" class="d-flex justify-end">
          <v-btn depressed color="error">
            <v-icon right dark class="mr-1">
              mdi-chevron-left
            </v-icon>Voltar
          </v-btn>
        </v-col>
        <v-col cols="1">
          <v-btn depressed color="success">
            Solicitar <v-icon right dark class="ml-1">
              mdi-chevron-right
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>
<style scoped>
.v-card {
  width: 100%;
  max-width: 800px;
}
</style>
<script>
export default {
  name: 'finalizarPedido'
}
</script>
