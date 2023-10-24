/* eslint-disable  */

import { localize, ValidationObserver, ValidationProvider, extend, setInteractionMode } from 'vee-validate'
import{ alpha, confirmed, email, length, max, max_value, min, min_value, numeric, required } from 'vee-validate/dist/rules'
import Vue from 'vue'
import br from 'vee-validate/dist/locale/pt_BR'

extend('alpha', alpha)
extend('confirmed', confirmed)
extend('email', email)
extend('length', length)
extend('max', max)
extend('max_value', max_value)
extend('min', min)
extend('min_value', min_value)
extend('numeric', numeric)
extend('required', required)

extend('cpf', value => {
  let cpf = value.replace(/[^\d]/g, '') // Remove caracteres não numéricos
  // Verifica se o CPF possui 11 dígitos
  if (cpf.length !== 11) {
      return '{_field_} deve ter 11 caracteres'
  }
  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1+$/.test(cpf)) {
      return '{_field_} com digitos iguais'
  }
  // Calcula o primeiro dígito verificador
  let soma = 0
  for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf.charAt(i)) * (10 - i)
  }
  let resto = 11 - (soma % 11)
  let digito1 = (resto === 10 || resto === 11) ? 0 : resto
  // Calcula o segundo dígito verificador
  soma = 0
  for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf.charAt(i)) * (11 - i)
  }
  resto = 11 - (soma % 11)
  let digito2 = (resto === 10 || resto === 11) ? 0 : resto
  // Verifica se os dígitos verificadores estão corretos
  if (parseInt(cpf.charAt(9)) === digito1 && parseInt(cpf.charAt(10)) === digito2) {
      return true
  }
  return '{_field_} não é válido'
})

localize('pt_BR', br)
setInteractionMode('passive')

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)