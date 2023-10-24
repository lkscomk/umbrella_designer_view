<template>
  <v-row dense>
    <v-col
      cols="12"
      class="py-1"
    >
      <v-autocomplete
        v-model="vModel"
        :class="upperCase && 'upper'"
        :clearable="clearable"
        :dense="dense"
        :disabled="disabled"
        :error-messages="erro"
        :hide-details="hideDetails"
        :items="registros && registros.length ? registros : []"
        :item-text="itemText"
        :item-value="itemValue"
        :label="label"
        :multiple="multiple"
        :outlined="outlined"
        :solo="solo"
        :return-object="returnObject"
        :search-input.sync="consulta"
        :autofocus="autofocus"
        autocomplete="off"
        no-data-text="Nada encontrado!"
        @input="$emit('input', vModel)"
        @click:clear="$emit('clear', false)"
        @keydown.enter="$emit('enter', false)"
        @change="consulta = null, $emit('change')"
      >
        <template
          v-if="vModel"
          v-slot:prepend-item
        >
          <v-list-item
            ripple
            @click="selecionarTodos()"
          >
            <v-list-item-action>
              <v-icon :color="vModel.length > 0 ? 'primary' : ''">
                {{ icone }}
              </v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                Selecionar Todos
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider class="mt-2" />
        </template>
        <template v-slot:selection="{ item, index }">
          <span
            v-if="vModel.length === 1 && index === 0"
            class="body-2 text-truncate"
          >
            {{ itemText ? item[itemText] : item }}
          </span>
          <span v-if="registros.length !== vModel.length && index === 1">
            Vários
          </span>
          <span v-if="registros.length === vModel.length && index === 1">
            Todos
          </span>
        </template>
      </v-autocomplete>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'ComponenteVSelect',

  props: {
    disabled: {
      default: false,
      type: Boolean
    },
    dense: {
      default: false,
      type: Boolean
    },
    autofocus: {
      default: false,
      type: Boolean
    },
    erro: {
      type: [String, Array],
      default: () => []
    },
    clearable: {
      type: Boolean,
      defualt: false
    },
    solo: {
      default: false,
      type: Boolean
    },
    hideDetails: {
      default: false,
      type: Boolean
    },
    items: {
      required: true,
      validator: function (value) {
        return (
          typeof value === 'undefined' ||
          Array.isArray(value) ||
          value === null
        )
      }
    },
    itemText: {
      default: '',
      type: String
    },
    itemValue: {
      default: '',
      type: String
    },
    label: {
      required: true,
      type: String
    },
    multiple: {
      default: true,
      type: Boolean
    },
    outlined: {
      default: false,
      type: Boolean
    },
    returnObject: {
      default: false,
      type: Boolean
    },
    value: {
      required: true,
      validator: function (value) {
        return (
          typeof value === 'undefined' ||
          typeof value === 'number' ||
          typeof value === 'string' ||
          Array.isArray(value) ||
          value === null
        )
      }
    },
    upperCase: {
      default: false,
      type: Boolean
    }
  },

  data: () => ({
    registros: [],
    vModel: [],
    consulta: null
  }),

  computed: {
    icone () {
      if (this.tudoSelecionado) return 'mdi-close-box'
      if (this.parcialSelecionado) return 'mdi-minus-box'
      return 'mdi-checkbox-blank-outline'
    },
    tudoSelecionado () {
      return this.vModel.length === this.registros.length
    },
    parcialSelecionado () {
      return this.vModel.length > 0 && !this.tudoSelecionado
    }
  },

  watch: {
    items (valor) {
      setTimeout(() => {
        if (this.items && this.items.length) this.registros = this.items
        else this.registros = []
      }, 200)
    },
    value (valor) {
      if (this.value && this.value.length) {
        this.vModel = this.value
      } else {
        this.vModel = []
      }
    }
  },

  created () {
    setTimeout(() => {
      if (this.value && this.value.length) this.vModel = this.value
      else this.vModel = []

      if (this.items && this.items.length) this.registros = this.items
      else this.registros = []
    }, 600)
  },

  methods: {
    selecionarTodos () {
      if (this.tudoSelecionado || this.parcialSelecionado) {
        this.vModel = []
        if (this.vModel.length) this.$emit('listar')
        this.$emit('input', this.vModel)
      } else {
        this.vModel = this.itemValue ? this.registros.map(element => element[this.itemValue]) : this.items
        if (this.vModel.length) this.$emit('listar')
        this.$emit('input', this.vModel)
      }
    }
  }
}
</script>

<style>
.upper .v-select__selections input,
.upper .v-select__slot input {
  text-transform: uppercase!important
}
</style>
