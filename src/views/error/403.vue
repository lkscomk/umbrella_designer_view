<template>
  <v-card
    class="d-flex text-center"
    style="height: 100%; padding-top: 10vw;"
  >
    <v-row class="justify-center">
      <v-col xs="12">
        <span class="display-4 font-weight-bold pr-1 grey--text">
          4
          <v-icon
            color="grey"
            size="100"
          >
            mdi-lock-reset
          </v-icon>
          3
        </span>
        <p class="display-1 pt-3">
          Desculpe, voce não tem permissão de acesso à essa página.
        </p>
        <v-col>
          <v-btn
            :color="$vuetify.theme.dark ? '' : 'primary'"
            dark
            large
            @click="voltarInicio()"
          >
            <v-icon left>
              mdi-reply
            </v-icon>
            Retornar
          </v-btn>
        </v-col>
        <v-col>
          <v-btn
            v-if="tentarNovamente"
            :color="$vuetify.theme.dark ? '' : 'primary'"
            dark
            large
            @click="tentarAcesso()"
          >
            <v-icon left>
              mdi-refresh
            </v-icon>
            Tentar Novamente
          </v-btn>
        </v-col>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'PaginaError',
  data () {
    return {
      paginas: []
    }
  },

  computed: {
    ...mapState('app', [
      'menusUsuario'
    ]),
    tentarNovamente () {
      if (this.$router.history._startLocation && this.$router.history._startLocation !== '/proibido') {
        return true
      } else {
        return false
      }
    }
  },

  methods: {
    ...mapActions('app', [
      'menus'
    ]),
    async tentarAcesso () {
      const res = await this.menus()

      if (res && !res.erro) {
        this.paginas = []

        this.menusUsuario.forEach(element => {
          if (!element.url && !element.pai) {
            this.paginas.push(element)
          }
        })

        const rotaProibida = this.$router.history._startLocation

        if (rotaProibida !== '/proibido') {
          window.location.href = `http://igweb-mtz${rotaProibida}`
        }
      }
    },
    voltarInicio () {
      this.$router.go(-1)
    }
  }
}
</script>
