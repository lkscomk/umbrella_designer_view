<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" lg="6">
        <v-card class="elevation-3">
          <v-card-title>
            <span class="headline">Formulário</span>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="4">
                <v-text-field label="Título"></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field label="Subtítulo"></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-select label="Tipo" :items="tipos"></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-select label="Selecione a cor 1" :items="cores"></v-select>
              </v-col>
              <v-col cols="4">
                <v-select label="Selecione a cor 2" :items="cores"></v-select>
              </v-col>
              <v-col cols="4">
                <v-btn small color="primary">Mais cores</v-btn>
              </v-col>
            </v-row>
            <v-textarea label="Outros detalhes"></v-textarea>
            <v-row>
              <v-col cols="6">
                <v-file-input label="Carregue seu logotipo"></v-file-input>
                <v-label>Carregue algum referência</v-label>
                <v-file-input></v-file-input>
              </v-col>
              <v-col cols="6">
                <v-text-field label="Redes sociais referências"></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red">Voltar</v-btn>
            <v-btn color="green">Solicitar</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped>
.v-card {
  width: 100%;
  max-width: 800px;
}
</style>
<script>
export default {
  name: 'homePedido'
  // data() {
  //   return {
  //     tipos: ["Tipo 1", "Tipo 2", "Tipo 3"],
  //     cores: ["Cor 1", "Cor 2", "Cor 3"],
  //   };
  // },
}
</script>
