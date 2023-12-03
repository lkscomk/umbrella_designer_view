<template>
  <div>
    <v-card
      outlined
      dense
      flat
    >
      <v-data-table
        :headers="colunas"
        :items="registros"
        :items-per-page="itensPorPagina"
        :footer-props="{
          itemsPerPageText: 'Linhas por página',
          itemsPerPageOptions: [10, 20, 30],
          itemsPerPageAll: 'Mostrar tudo',
          pageText: '{0}-{1} de {2}',
        }"
        dense
        no-data-text="Nenhum registro encontrado"
        style="border-radius: 1px !important;"
      >
        <template v-slot:[`item.acao`]="{ item }">
          <slot
            name="acao"
          />
          <v-btn
            v-if="excluir"
            :color="$vuetify.theme.dark ? 'white' : 'error'"
            class="botao-acao-tabela"
            data-cy="btnTableExibir"
            icon
            title="Ecluir registro"
            @click="$emit('excluir', item)"
          >
            <v-icon size="20">
              mdi-delete
            </v-icon>
          </v-btn>
          <v-btn
            v-if="exibir"
            :color="$vuetify.theme.dark ? 'white' : 'primary'"
            class="botao-acao-tabela"
            data-cy="btnTableExibir"
            icon
            title="Exibir registro"
            @click="$emit('exibir', item)"
          >
            <v-icon size="20">
              mdi-eye
            </v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    colunas: {
      required: true,
      type: Array
    },
    exibir: {
      default: false,
      type: Boolean
    },
    excluir: {
      default: false,
      type: Boolean
    },
    registros: {
      required: true,
      type: Array
    }
  },
  data () {
    return {
      itensPorPagina: 10
    }
  }
}
</script>
