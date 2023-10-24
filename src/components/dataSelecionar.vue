<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        ref="data"
        v-model="formattedDate"
        append-icon="mdi-calendar"
        :clearable="clearable"
        :on="on"
        :disabled="disabled"
        :dense="dense"
        :error-messages="errorMessages"
        :hide-details="hideDetails"
        :label="label"
        :outlined="outlined"
        :readonly="readonly"
        @click="menu = !menu"
        @click:clear="$emit('input', null)"
      />
    </template>

    <v-date-picker
      v-if="menu"
      v-model="selectedDate"
      :min="dataMinima"
      :max="dataMaxima"
      locale="pt-br"
      @input="menu = false"
    />
  </v-menu>
</template>

<script>
import dayjs from 'dayjs'

export default {
  props: {
    clearable: {
      default: true,
      type: Boolean
    },
    dataMinima: {
      default: null,
      type: String
    },
    dataMaxima: {
      default: null,
      type: String
    },
    disabled: {
      default: false,
      type: Boolean
    },
    dense: {
      default: false,
      type: Boolean
    },
    errorMessages: {
      default: '',
      type: [String, Array]
    },
    hideDetails: {
      default: false,
      type: Boolean
    },
    label: {
      default: 'Selecione uma data',
      type: String
    },
    outlined: {
      default: false,
      type: Boolean
    },
    readonly: {
      default: false,
      type: Boolean
    },
    value: {
      default: null,
      type: String
    }
  },
  data () {
    return {
      menu: false,
      selectedDate: null,
      formattedDate: null
    }
  },
  watch: {
    selectedDate (value) {
      this.formattedDate = this.formatarDataParaBrasileiro(value)
      this.$emit('input', this.selectedDate || null)
    },
    dataMinima (newVal) {
      if (this.isValidDate(newVal)) {
        this.selectedDate = newVal
        this.updateFormattedDate()
      }
    },
    dataMaxima (newVal) {
      if (this.isValidDate(newVal)) {
        this.selectedDate = newVal
        this.updateFormattedDate()
      }
    },
    value (e) {
      this.selectedDate = this.value
      this.updateFormattedDate()
    }
  },
  async created () {
    setTimeout(() => {
      this.selectedDate = this.value
    }, 500)
  },
  methods: {
    isValidDate (dateString) {
      return /^\d{4}-\d{2}-\d{2}$/.test(dateString)
    },
    formatarDataParaBrasileiro (data) {
      return dayjs(data).format('DD/MM/YYYY')
    },
    updateFormattedDate () {
      this.formattedDate = this.formatarDataParaBrasileiro(this.selectedDate)
    }
  }
}
</script>

<style>
/* Estilos personalizados podem ser adicionados aqui */
</style>
