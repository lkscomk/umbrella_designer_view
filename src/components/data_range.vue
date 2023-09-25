<template>
  <div>
    <validation-observer
      ref="observer"
    >
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        min-width="300px"
        offset-y
        transition="scale-transition"
      >
        <template v-slot:activator="{ on }">
          <validation-provider
            ref="errorprovider"
            v-slot="{ errors }"
            :name="label"
            :rules="required ? 'required' : ''"
            vid="dataFormatada"
          >
            <v-text-field
              ref="VTextField"
              v-model="dataFormatada"
              v-mask="mask"
              :maxlength="mask.length"
              :class="classe"
              :error-messages="[ ...errors, ...parentErrors]"
              :hide-details="!parentErrors.length && !errors.length"
              :append-icon="appendIcon"
              :clearable="clearable"
              :dense="dense"
              :disabled="disabled"
              :data-cy="dataCy"
              :filled="filled"
              :label="label"
              :outlined="outlined"
              :autofocus="autofocus"
              autocomplete="false"
              spellcheck="false"
              v-on="on"
              @click:clear="resetData()"
              @click:append="menu = true"
              @keypress.enter="!dataFormatada
                ? (date = [$day().format('YYYY-MM-DD')], changeData(), $emit('enter'))
                : (confirmarData(), $emit('enter'))"
              @dblclick="date = [$day().format('YYYY-MM-DD')], changeData()"
              @keydown="navegarDentroDoInput"
              @click="navegarDentroDoInput"
              @change="(!dataFormatada || dataFormatada.length <= 13) && !menu && dataDeHojeAutomatica
                ? (date = [$day().format('YYYY-MM-DD')], changeData())
                : confirmarData()"
            />
          </validation-provider>
        </template>
        <v-card
          flat
          class="mb-2"
        >
          <v-row
            dense
            class="px-1"
          >
            <v-col
              v-if="!(!mesPassado && !mesAtual && !mesQueVem && !ontem && !hoje && !amanha && !estaSemana)"
              cols="4"
            >
              <v-subheader class="font-weight-bold">
                Período
              </v-subheader>
              <v-btn
                v-if="mesPassado"
                :outlined="selectedItem === 'mesPassado'"
                color="primary"
                class="justify-start"
                block
                text
                small
                @click="dataPreDefinida('mesPassado'), selectedItem = 'mesPassado'"
                @dblclick="dataPreDefinida('mesPassado'), selectedItem = 'mesPassado', confirmarData()"
              >
                Mês Passado
              </v-btn>
              <v-btn
                v-if="mesAtual"
                :outlined="selectedItem === 'mesAtual'"
                color="primary"
                class="justify-start"
                block
                text
                small
                @click="dataPreDefinida('mesAtual'), selectedItem = 'mesAtual'"
                @dblclick="dataPreDefinida('mesAtual'), selectedItem = 'mesAtual', confirmarData()"
              >
                Mês Atual
              </v-btn>
              <v-btn
                v-if="mesQueVem"
                :outlined="selectedItem === 'mesQueVem'"
                color="primary"
                class="justify-start"
                block
                text
                small
                @click="dataPreDefinida('mesQueVem'), selectedItem = 'mesQueVem'"
                @dblclick="dataPreDefinida('mesQueVem'), selectedItem = 'mesQueVem', confirmarData()"
              >
                Mês Que Vem
              </v-btn>
              <v-btn
                v-if="ontem"
                :outlined="selectedItem === 'ontem'"
                color="primary"
                class="justify-start"
                block
                text
                small
                @click="dataPreDefinida('ontem'), selectedItem = 'ontem'"
                @dblclick="dataPreDefinida('ontem'), selectedItem = 'ontem', confirmarData()"
              >
                Ontem
              </v-btn>
              <v-btn
                v-if="hoje"
                :outlined="selectedItem === 'hoje'"
                color="primary"
                class="justify-start"
                block
                text
                small
                @click="dataPreDefinida('hoje'), selectedItem = 'hoje'"
                @dblclick="dataPreDefinida('hoje'), selectedItem = 'hoje', confirmarData()"
              >
                Hoje
              </v-btn>
              <v-btn
                v-if="amanha"
                :outlined="selectedItem === 'amanha'"
                color="primary"
                class="justify-start"
                block
                text
                small
                @click="dataPreDefinida('amanha'), selectedItem = 'amanha'"
                @dblclick="dataPreDefinida('amanha'), selectedItem = 'amanha', confirmarData()"
              >
                Amanhã
              </v-btn>
              <v-btn
                v-if="estaSemana"
                :outlined="selectedItem === 'estaSemana'"
                color="primary"
                class="justify-start"
                block
                text
                small
                @click="dataPreDefinida('estaSemana'), selectedItem = 'estaSemana'"
                @dblclick="dataPreDefinida('estaSemana'), selectedItem = 'estaSemana', confirmarData()"
              >
                Esta Semana
              </v-btn>
            </v-col>
            <v-col
              cols="8"
              class="pa-0"
            >
              <v-date-picker
                v-model="date"
                :color="$vuetify.theme.dark ? '' : 'primary'"
                :max="max"
                :min="min"
                no-title
                locale="pt"
                range
                @input="date.length > 1 ? confirmarData() : ''"
              >
                <v-spacer />
                <v-btn
                  :color="$vuetify.theme.dark ? '' : 'primary'"
                  @click="confirmarData()"
                >
                  OK
                </v-btn>
                <v-btn
                  color="error"
                  @click="resetData()"
                >
                  Limpar
                </v-btn>
              </v-date-picker>
            </v-col>
          </v-row>
        </v-card>
      </v-menu>
    </validation-observer>
  </div>
</template>

<script>
export default {
  name: 'ComponenteDateRange',

  props: {
    autofocus: {
      default: false,
      type: Boolean
    },
    appendIcon: {
      default: 'mdi-calendar',
      type: String
    },
    clearable: {
      default: true,
      type: Boolean
    },
    classe: {
      default: '',
      type: String
    },
    dataCy: {
      default: 'periodo',
      type: String
    },
    dataDeHojeAutomatica: {
      // Ao sair do text-field do componente, a data de hj é inserida automáticamente. Para
      // Algumas telas este recurso é últil, em outras não. Sette esta prop para false para desativar isso.
      default: true,
      type: Boolean
    },
    dense: {
      default: true,
      type: Boolean
    },
    disabled: {
      default: false,
      type: Boolean
    },
    filled: {
      default: false,
      type: Boolean
    },
    label: {
      default: 'Período',
      type: String
    },
    outlined: {
      default: true,
      type: Boolean
    },
    required: {
      default: false,
      type: Boolean
    },
    min: {
      default: '',
      type: String
    },
    max: {
      default: '',
      type: String
    },
    mesPassado: {
      default: true,
      type: Boolean
    },
    mesAtual: {
      default: true,
      type: Boolean
    },
    mesQueVem: {
      default: true,
      type: Boolean
    },
    ontem: {
      default: true,
      type: Boolean
    },
    hoje: {
      default: true,
      type: Boolean
    },
    amanha: {
      default: true,
      type: Boolean
    },
    estaSemana: {
      default: true,
      type: Boolean
    },
    value: {
      default: null,
      validator: function (value) {
        return (
          typeof value === 'object' ||
          typeof value === 'undefined' ||
          typeof value === 'string' ||
          value === null
        )
      }
    }
  },

  data: () => ({
    menu: false,
    date: null,
    dataFormatada: null,
    mask: '##/##/#### à ##/##/####',
    selectedItem: null
  }),

  computed: {
    parentErrors () {
      if (this.$attrs['error-messages']) {
        return this.$attrs['error-messages']
      } else return []
    }
  },

  watch: {
    value (valor) {
      if (valor && valor.dataInicio && !valor.dataFim) {
        this.dataFormatada = `${this.$day(valor.dataInicio, 'YYYY-MM-DD').format('DD/MM/YYYY')} à ${this.$day(valor.dataInicio, 'YYYY-MM-DD').format('DD/MM/YYYY')}`
      } else if (valor && valor.dataInicio && valor.dataFim) {
        this.dataFormatada = `${this.$day(valor.dataInicio, 'YYYY-MM-DD').format('DD/MM/YYYY')} à ${this.$day(valor.dataFim, 'YYYY-MM-DD').format('DD/MM/YYYY')}`
      } else {
        this.date = null
        this.dataFormatada = null
      }
    },
    menu (m) {
      setTimeout(() => {
        if (!this.menu) this.confirmarData()
      }, 100)
    },
    dataFormatada (v) {
      if (!v || !v.length) {
        this.$refs.observer.reset()
        this.date = null
        this.resetData()
      }
      if (v && v.length && [10, 13].includes(v.length)) {
        const [day, month, year] = String(v).substring(0, 10).split('/')
        const data = `${year}-${month}-${day}`

        // Valida mês e dia
        if (day <= 31 && month <= 12) {
          this.$refs.observer.reset()
          this.date = [data]
        } else if (v && v.length === 10 && !(day <= 31 && month <= 12)) {
          this.$refs.observer.setErrors({ dataFormatada: ['Formato de data inválida'] })
        }
      } else if (v && v.length === 23) {
        const [day1, month1, year1] = String(v).substring(0, 10).split('/')
        const data1 = `${year1}-${month1}-${day1}`

        const [day2, month2, year2] = String(v).substring(13, 23).split('/')
        const data2 = `${year2}-${month2}-${day2}`

        // Valida mês e dia
        if (day1 <= 31 && day2 <= 31 && month1 <= 12 && month2 <= 12) {
          this.$refs.observer.reset()
          // TODO: Emite as datas Completas
          if (this.$day(data1).isAfter(data2)) {
            this.date = [data2, data1]

            if (this.value && (this.value.dataInicio !== this.date[0] || this.value.dataFin !== this.date[1])) {
              this.$emit('input', {
                dataInicio: data2,
                dataFim: data1
              })
              setTimeout(() => {
                this.$emit('listar')
              }, 100)
            }
          } else {
            this.date = [data1, data2]

            if (this.value && (this.value.dataInicio !== this.date[0] || this.value.dataFin !== this.date[1])) {
              this.$emit('input', {
                dataInicio: data1,
                dataFim: data2
              })
              setTimeout(() => {
                this.$emit('listar')
              }, 100)
            }
          }
        } else if (!(day1 <= 31 && day2 <= 31 && month1 <= 12 && month2 <= 12)) {
          this.$refs.observer.setErrors({ dataFormatada: ['Formato de data inválida'] })
        }
      }
    }
  },

  created () {
    if (this.value && this.value.dataInicio && !this.value.dataFim) {
      this.dataFormatada = `${this.$day(this.value.dataInicio, 'YYYY-MM-DD').format('DD/MM/YYYY')} à ${this.$day(this.value.dataInicio, 'YYYY-MM-DD').format('DD/MM/YYYY')}`
    } else if (this.value && this.value.dataInicio && this.value.dataFim) {
      this.dataFormatada = `${this.$day(this.value.dataInicio, 'YYYY-MM-DD').format('DD/MM/YYYY')} à ${this.$day(this.value.dataFim, 'YYYY-MM-DD').format('DD/MM/YYYY')}`
    }
  },

  methods: {
    confirmarData () {
      this.menu = false

      if (this.date) {
        let dataInicial = null
        if (this.date[0]) {
          dataInicial = this.$day(this.date[0], 'YYYY-MM-DD').format('DD/MM/YYYY')
        } else {
          this.date[0] = this.$day().format('DD/MM/YYYY')
          dataInicial = this.$day().format('DD/MM/YYYY')
        }

        let dataFim = null
        if (this.date[1]) {
          dataFim = this.$day(this.date[1], 'YYYY-MM-DD').format('DD/MM/YYYY')
        } else {
          this.date[1] = this.date[0]
          dataFim = this.$day(this.date[0], 'YYYY-MM-DD').format('DD/MM/YYYY')
        }

        if (this.$day(this.date[0]).isAfter(this.date[1])) {
          this.dataFormatada = `${dataFim} à ${dataInicial}`
        } else {
          this.dataFormatada = `${dataInicial} à ${dataFim}`
        }
      }
    },
    changeData () {
      if (!this.date && this.dataFormatada && this.dataFormatada.length && [10, 13].includes(this.dataFormatada.length)) {
        this.date[1] = this.date[0]

        const dtDigitada = String(this.dataFormatada).substring(0, 10)
        this.dataFormatada = `${dtDigitada} à ${dtDigitada}`
      } else if (this.date.length === 1) {
        this.date[1] = this.date[0]
        this.dataFormatada = `${this.$day(this.date[0]).format('DD/MM/YYYY')} à ${this.$day(this.date[1]).format('DD/MM/YYYY')}`
      } else if (!this.date.length) {
        const data = this.$day().format('YYYY-MM-DD')
        this.date = [data, data]
        this.dataFormatada = `${this.$day().format('DD/MM/YYYY')} à ${this.$day().format('DD/MM/YYYY')}`
      }
    },
    navegarDentroDoInput ($event) {
      const keyCode = $event.keyCode
      // if ([33, 34].indexOf($event.keyCode) > -1) return
      const elementor = this.$refs.VTextField.$el.querySelector('input')
      let valor = elementor.value
      const len = valor.length
      let pos = elementor.selectionStart

      let charAt = valor.charAt(pos)
      if ($event.type === 'click') {
        while (!/\d/.test(charAt) && pos < len) {
          pos++
          charAt = valor.charAt(pos)
        }
        this.$refs.VTextField.$el.querySelector('input').setSelectionRange(pos, pos)
      }

      if ($event.type === 'click' && $event.pointerType === 'mouse') return

      if ([35, 36].indexOf(keyCode) > -1) { // 36 - HOME, 25 - END
        pos = keyCode === 36 ? 0 : len
        this.$refs.VTextField.$el.querySelector('input').setSelectionRange(pos, pos)
      } else if ([37, 39].indexOf(keyCode) > -1) {
        if (keyCode === 37) { // Direção esquerda
          pos--
          pos = pos === -1 ? 0 : pos
        } else if (keyCode === 39) { // Direção direira
          pos = pos === len ? len : pos++
        }
        this.$refs.VTextField.$el.querySelector('input').setSelectionRange(pos, pos)
      } else {
        if (len < this.mask.length) return
        // if (keyCode < 48 || keyCode > 57 || len < this.mask.length) {
        if (isNaN($event.key)) return
        const self = this
        const a = (pos > 0 ? valor.substring(0, pos) : '') + $event.key + valor.substring(pos + 1, len)
        pos++
        this.dataFormatada = a
        setTimeout(() => {
          if (pos < len) {
            valor = self.$refs.VTextField.$el.querySelector('input').value
            charAt = valor.charAt(pos)
            if (!/\d/.test(charAt)) {
              while (!/\d/.test(charAt) && pos < len) {
                pos++
                charAt = valor.charAt(pos)
              }
              self.$refs.VTextField.$el.querySelector('input').setSelectionRange(pos, pos)
            } else {
              self.$refs.VTextField.$el.querySelector('input').setSelectionRange(pos, pos)
            }
          }
        }, 5)
      }
    },
    resetData () {
      setTimeout(() => {
        if (this.$refs.observer) this.$refs.observer.reset()
      }, 150)
      this.dataFormatada = null
      this.date = null

      this.$emit('input', {
        dataInicio: null,
        dataFim: null
      })
      if (!this.disabled) {
        this.autofocus ?? (this.menu = true)
      }
      this.$emit('clear')
      this.$emit('listar')
    },

    dataPreDefinida (parametro) {
      this.dataFormatada = null
      this.date = null
      this.$emit('input', {
        dataInicio: null,
        dataFim: null
      })

      this.$nextTick(() => {
        if (parametro === 'mesPassado') {
          this.date = [
            this.$day().subtract(1, 'month').startOf('month').format('YYYY-MM-DD'),
            this.$day().subtract(1, 'month').endOf('month').format('YYYY-MM-DD')
          ]
        } else if (parametro === 'mesAtual') {
          this.date = [
            this.$day().startOf('month').format('YYYY-MM-DD'),
            this.$day().endOf('month').format('YYYY-MM-DD')
          ]
        } else if (parametro === 'mesQueVem') {
          this.date = [
            this.$day().add(1, 'month').startOf('month').format('YYYY-MM-DD'),
            this.$day().add(1, 'month').endOf('month').format('YYYY-MM-DD')
          ]
        } else if (parametro === 'ontem') {
          this.date = [
            this.$day().subtract(1, 'day').format('YYYY-MM-DD'),
            this.$day().subtract(1, 'day').format('YYYY-MM-DD')
          ]
        } else if (parametro === 'hoje') {
          this.date = [
            this.$day().format('YYYY-MM-DD'),
            this.$day().format('YYYY-MM-DD')
          ]
        } else if (parametro === 'amanha') {
          this.date = [
            this.$day().add(1, 'day').format('YYYY-MM-DD'),
            this.$day().add(1, 'day').format('YYYY-MM-DD')
          ]
        } else if (parametro === 'estaSemana') {
          this.date = [
            this.$day().startOf('week').format('YYYY-MM-DD'),
            this.$day().endOf('week').format('YYYY-MM-DD')
          ]
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .v-date-picker-table td {
  padding-left: 1px !important;
  padding-right: 1px !important;
  border: 0px !important;
}
::v-deep .v-date-picker-table {
  height:auto !important;
}
</style>
