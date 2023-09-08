/* eslint-disable  */

import { ValidationObserver, ValidationProvider, extend, setInteractionMode } from 'vee-validate'
import { length, max, min, max_value, min_value, numeric, required, excluded, email } from 'vee-validate/dist/rules'
import Vue from 'vue'
import dayjs from "@/plugins/dayjs";

extend('length', {
  ...length,
  message: 'O campo {_field_} deve ter {length} caracteres'
})
extend('numeric', {
  ...numeric,
  message: 'O campo {_field_} requer somente números'
})
extend('required', {
  ...required,
  message: 'O campo {_field_} é obrigatório'
})

extend('max', {
  ...max,
  message: (campo, valor) => {
    return `Valor máximo para ${campo} é: ${valor.length}`
  }
})

extend('min', {
  ...min,
  message: (campo, valor) => {
    return `Valor mínimo para ${campo} é: ${valor.length}`
  }
})

extend('max_value', {
  ...max_value,
  message: 'Valor máximo para {_field_} é: {max}'
})

extend('min_value', {
  ...min_value,
  message: 'Valor mínimo para {_field_} é: {min}'
})


extend('sizeFile', {
  validate: (value, { tamanho }) => {
    return value.size < tamanho;
  },
  params: ['tamanho', 'unidade'],
  message: (campo, { tamanho }) => {
    return `O tamanho máximo para ${campo} é: ${
      tamanho >= 1000000 ? tamanho / 1000000 : tamanho / 1000
    }${tamanho >= 1000000 ? 'MB' : 'KB'}`;
  }
})
extend('dateValid', value => {
  const [day, month, year] = String(value).split('/')

  if ((Number(day) <= 31 && Number(month) <= 12 && Number(year) >= 1900)) {
    return true
  } else {
    return 'Data inválida'
  }
})

extend('dateMin', (value, values) => {
  if (dayjs(value, 'DD/MM/YYYY').isSame(dayjs(values[0], 'YYYY-MM-DD')) || dayjs(value, 'DD/MM/YYYY').isAfter(dayjs(values[0], 'YYYY-MM-DD'))) {
    return true
  } else {
    return `Data deve ser maior que ${dayjs(values[0], 'YYYY-MM-DD').format('DD/MM/YYYY')}`
  }
})

extend('dateMax', (value, values) => {
  if (dayjs(value, 'DD/MM/YYYY').isSame(dayjs(values[0], 'YYYY-MM-DD')) || dayjs(value, 'DD/MM/YYYY').isBefore(dayjs(values[0], 'YYYY-MM-DD'))) {
    return true
  } else {
    return `Data deve ser menor que ${dayjs(values[0], 'YYYY-MM-DD').format('DD/MM/YYYY')}`
  }
})

extend('maiorQue', (value, values) => {
  if (dayjs(value).isSame(dayjs(values[0], 'YYYY-MM-DD')) || dayjs(value).isAfter(dayjs(values[0], 'YYYY-MM-DD'))) {
    return true
  } else {
    return `Data deve ser maior que ${dayjs(values[0], 'YYYY-MM-DD').format('DD/MM/YYYY')}`
  }
})

extend('menorQue', (value, values) => {
  if (dayjs(value).isSame(dayjs(values[0], 'YYYY-MM-DD')) || dayjs(value).isBefore(dayjs(values[0], 'YYYY-MM-DD'))) {
    return true
  } else {
    return `Data deve ser menor ou igual a ${dayjs(values[0], 'YYYY-MM-DD').format('DD/MM/YYYY')}`
  }
})

extend('nenhumDe', {
  ...excluded,
  message: 'O valor inserido no campo {_field_} não é válido'
})

extend('email', {
  ...email,
  message: 'Email invalido!'
})

extend('phone', value => {
  if (value.length === 16 || value.length === 14) {
    return true
  } else {
    return 'Formato de telefone incorreto!'
  }
})

setInteractionMode('passive')

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
