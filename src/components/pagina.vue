<template>
  <div>
    <loading :value="loading" />
    <v-row
      :class="$vuetify.breakpoint.mobile
        ? ($vuetify.theme.dark ? 'accent ma-0' : 'ma-0 grey lighten-4')
        : ($vuetify.theme.dark ? 'accent ma-0 justify-center' : 'justify-center grey lighten-4')"
      :style="$vuetify.theme.dark ? '' : 'border-bottom: solid #ECEFF1 2px !important;'"
      dense
    >
      <v-col
        :cols="12"
        :class="$vuetify.breakpoint.mobile ? 'pt-0 mt-0 px-4' : 'px-4 pb-0'"
      >
        <v-container
          v-if="titulo || subtitulo"
          :style="$vuetify.theme.dark ? '' : 'border-left: solid 1px #ECEFF1 !important; border-right: solid 1px #ECEFF1 !important;'"
          class="py-0 px-3 elevation-0"
          fluid
        >
          <div class="headline font-weight-regular">
            <b v-if="titulo">{{ titulo }}</b> {{ titulo && subtitulo ? '|' : '' }}
            <span
              v-if="subtitulo"
              class="body-1 font-weight-mediun"
            >
              {{ subtitulo }}
            </span>
          </div>
        </v-container>
      </v-col>
    </v-row>
    <v-row
      :class="$vuetify.breakpoint.mobile ? 'ma-0' : 'justify-center'"
      dense
    >
      <v-col
        cols="12"
        class="pb-0 mb-0"
      >
        <slot />
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'ComponentePagina',

  props: {
    subtitulo: {
      default: '',
      type: String
    },
    titulo: {
      default: '',
      type: String
    },
    loading: {
      default: false,
      type: Boolean
    }
  },
  data: () => ({
    aviso: {
      modal: false,
      key: null,
      text: ''
    }
  })
}
</script>
