<template>
  <v-main>
    <v-container fluid>
      <v-col cols="12">
        <tabela
          :colunas="colunas"
          :registros="registros"
          exibir
          @listar="listarRegistro()"
        />
      </v-col>
    </v-container>
  </v-main>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
// import axios from '@/plugins/axios_local'

export default {
  name: 'TelaMeusPedidos',
  data: () => ({
    perfil: window.atob(localStorage.getItem('umbrella:perfil')),
    colunas: [
      {
        text: 'Ver',
        align: 'start',
        sortable: false,
        value: 'acao'
      },
      {
        text: 'Cliente',
        align: 'start',
        sortable: false,
        value: 'autor_usuario_id'
      },
      {
        text: 'Titulo',
        align: 'start',
        sortable: false,
        value: 'titulo'
      },
      {
        text: 'Data de entrega',
        align: 'start',
        sortable: false,
        value: 'created_at'
      },
      {
        text: 'Ações',
        align: 'start',
        sortable: false,
        value: 'descricaoGrupo'
      }
    ]
  }),
  computed: {
    ...mapState('meus_pedidos', [
      'registros'
    ])
  },
  async created () {
    this.listarRegistro()
  },
  methods: {
    ...mapMutations('meus_pedidos', [
      'setRegistrosRelacionamento'
    ]),
    ...mapActions('meus_pedidos', [
      'listar'
    ]),
    async listarRegistro () {
      this.loading = true
      await this.listar({
        perfil: this.perfil || null
      })
      this.loading = false
    }
  }
}
</script>
