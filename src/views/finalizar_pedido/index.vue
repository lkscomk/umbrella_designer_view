<template>
  <v-main>
    <v-container
      fluid
      class="d-flex justify-center"
    >
      <v-row>
        <v-col cols="6">
          <v-card
            elevation="1"
            height="400"
            color="#D9D9D9"
            class="p-0 m-0"
          >
            <v-img
              :src="require('@/assets/image-area.svg')"
              class="my-3"
              contain
              height="380"
            />
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-col cols="12">
            <v-card-title class="text-h5 p-0 m-0 d-flex justify-center">
              Pedido Nº 21354 finalizado com
              sucesso!
            </v-card-title>
          </v-col>
          <v-col cols="12">
            <v-card
              elevation="1"
              height="230"
              color="#D9D9D9"
              class="p-0 m-0 justify-end"
            >
              <div class="mb-2  d-flex justify-end">
                Subtotal R$ 1.500,00
              </div>
              <div class="mb-2  d-flex justify-end">
                Total R$ 1.500,00
              </div>
            </v-card>
          </v-col>
          <v-col cols="12">
            <div class="text-center d-flex align-center justify-space-around">
              <v-btn
                color="primary"
                dark
                v-bind="attrs"
                v-on="on"
              >
                Boleto
              </v-btn>
              <v-btn
                color="primary"
                dark
                v-bind="attrs"
                v-on="on"
              >
                Pix
              </v-btn>
              <v-btn
                color="primary"
                dark
                v-bind="attrs"
                v-on="on"
              >
                Débito
              </v-btn>
              <v-btn
                color="primary"
                dark
                v-bind="attrs"
                v-on="on"
              >
                Crédito
              </v-btn>
            </div>
          </v-col>
          <v-col cols="12" />
        </v-col>
        <v-col
          cols="10"
          class="d-flex justify-end"
        >
          <v-btn
            depressed
            color="error"
          >
            <v-icon
              right
              dark
              class="mr-1"
            >
              mdi-chevron-left
            </v-icon>Voltar
          </v-btn>
        </v-col>
        <v-col cols="1">
          <v-btn
            depressed
            color="success"
          >
            Solicitar <v-icon
              right
              dark
              class="ml-1"
            >
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
  name: 'FinalizarPedido'
}
</script>
