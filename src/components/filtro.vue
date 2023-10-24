<template>
  <v-card
    class="mt-0 elevation-0"
    outlined
    style="border-radius: 0px; !important;"
  >
    <v-card-title
      v-if="options.title"
      class="subtitle-2 py-1"
    >
      {{ options.title }}
    </v-card-title>

    <v-divider v-if="options.title" />

    <v-card-text
      class="mb-0 pa-0"
    >
      <v-expansion-panels flat>
        <v-expansion-panel
          readonly
          eager
        >
          <v-expansion-panel-header
            class="pa-0 mx-0 my-1"
            disable-icon-rotate
          >
            <v-menu
              right
              offset-y
              dense
            >
              <template v-slot:activator="{ on }">
                <v-btn
                  icon
                  title="Mais Opções"
                  data-cy="Mais Opções"
                  class="ml-1"
                  v-on="on"
                >
                  <v-icon
                    class="pa-1"
                    :color="$vuetify.theme.dark ? 'white' : 'primary'"
                  >
                    mdi-dots-vertical
                  </v-icon>
                </v-btn>
              </template>
              <slot name="maisOpcoes" />
              <v-list dense>
                <v-list-item
                  v-for="(option, idx) in options.maisOpcoes"
                  :key="idx"
                  :disabled="option.disabled"
                  dense
                  @click="$emit(`${ option.emit }`)"
                >
                  <v-list-item-icon class="mr-3">
                    <v-icon
                      :color="$vuetify.theme.dark ? 'white' : option.color || 'error'"
                      :disabled="option.disabled"
                    >
                      {{ option.icon || 'mdi-check' }}
                    </v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title :title="option.hint ? option.hint : ''">
                      {{ option.title || 'Titulo' }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item
                  dense
                  data-cy="btnLimparFiltros"
                  @click="$emit('clearFilters')"
                >
                  <v-list-item-icon class="mr-3">
                    <v-icon
                      :color="$vuetify.theme.dark ? 'white' : 'primary'"
                    >
                      mdi-filter-remove
                    </v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>
                      Limpar Filtros
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-menu>

            <v-btn
              v-if="options.botaoGenerico"
              icon
              :title="options.botaoGenerico.title ? options.botaoGenerico.title : 'Adicionar'"
              class=""
              @click="$emit(`${ options.botaoGenerico.emit ? options.botaoGenerico.emit : 'adicionar' }`)"
            >
              <v-icon
                class="pa-1"
                :color="$vuetify.theme.dark ? 'white' : 'primary'"
              >
                {{ options.botaoGenerico.icon ? options.botaoGenerico.icon : 'mdi-plus' }}
              </v-icon>
            </v-btn>

            <!-- adicionar -->
            <!-- OU -->
            <!-- adicionar: {
              value: true,
              disabled: false,
              title: 'Adicionar'
            } -->
            <v-btn
              v-if="options && options.adicionar || options && options.adicionar && options.adicionar.value"
              ref="btnAdicionarFiltro"
              :color="$vuetify.theme.dark ? 'white' : 'primary'"
              :disabled="options && options.adicionar && options.adicionar.disabled"
              :title="options && options.adicionar && options.adicionar.title || 'Adicionar'"
              class="my-auto"
              icon
              data-cy="btnAdicionar"
              @click="$emit('adicionar')"
            >
              <v-icon :color="$vuetify.theme.dark ? 'white' : 'primary'">
                mdi-plus-thick
              </v-icon>
            </v-btn>

            <slot name="acao" />

            <v-btn
              :color="$vuetify.theme.dark ? 'white' : 'primary'"
              title="Pesquisar"
              class="my-auto"
              data-cy="btnPesquisar"
              data-v-step="btnPesquisar"
              text
              @click="$emit('pesquisar')"
            >
              <v-icon :color="$vuetify.theme.dark ? 'white' : 'primary'">
                mdi-magnify
              </v-icon>
            </v-btn>
            <template v-slot:actions>
              <div style="display: none" />
            </template>

            <slot name="filtros" />
          </v-expansion-panel-header>
          <v-expansion-panel-content
            key="1"
            :hide-actions="options && !options.moreFilters"
            eager
          >
            <slot name="maisFiltros" />
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card-text>
    <v-toolbar
      height="2"
      color="#ddd"
      flat
    />
  </v-card>
</template>

<script>
export default {
  name: 'ComponenteFiltroNovo',

  props: {
    options: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
