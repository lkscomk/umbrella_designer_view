<template>
  <v-main>
    <v-container fluid>
      <v-data-table
        dense
        :headers="headers"
        :items="desserts"
        item-key="name"
        class="elevation-1"
      />
    </v-container>
  </v-main>
</template>

<script>
export default {
  name: 'TelaMeusPedidos',
  data: () => ({
    desserts: [
      {
        name: '',
        client: 'Lukas Rocha',
        term: '10 dias',
        title: 'Logotipo',
        caption: ''
      },
      {
        name: '',
        client: 'Magno Rodrigues',
        term: '20 dias',
        title: 'Arte para feed do Instagram',
        caption: ''
      },
      {
        name: '',
        client: 'Marina Reginato',
        term: '30 dias',
        title: 'Arte para stories do Instagrem',
        caption: ''
      },
      {
        name: '',
        client: 'Sílvia Patrícia',
        term: '40 dias',
        title: 'Arte para status do WhatsApp',
        caption: ''
      }
    ],
    headers: [
      {
        text: 'Ver',
        align: 'start',
        sortable: false,
        value: 'name'
      },
      { text: 'Nome do cliente', value: 'client' },
      { text: 'Prazo de entrega', value: 'term' },
      { text: 'Título', value: 'title' },
      { text: 'Subtítulo', value: 'caption' }
    ]
  })
}
</script>
