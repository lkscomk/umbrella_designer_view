import Vue from 'vue'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isBetween from 'dayjs/plugin/isBetween'
import relativeTime from 'dayjs/plugin/relativeTime'
import updateLocale from 'dayjs/plugin/updateLocale'
import Weekday from 'dayjs/plugin/weekday'
import IsoWeek from 'dayjs/plugin/isoWeek'
import 'dayjs/locale/pt-br'

function _format (duration) {
  const ptBr = {
    years: 'Y[ano]',
    months: 'M[Mês]',
    days: 'D[d]',
    hours: 'H[h]',
    minutes: 'm[m]'
    // seconds: '',
    // milliseconds: ''
  }
  const temp = []
  const entries = Object.entries(duration.$d)
  for (const [chave, valor] of entries) {
    if (valor && temp.length < 2 && ptBr[chave]) temp.push(chave)
  }
  if (!temp.length) return '0m'
  return duration.format(temp.reduce((sum, curr) => (sum += ptBr[curr] + ' '), '')).trim()
}

dayjs.extend(customParseFormat)
dayjs.extend(duration)
dayjs.extend(relativeTime)
dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)
dayjs.extend(isBetween)
dayjs.extend(Weekday)
dayjs.extend(IsoWeek)

dayjs.extend(updateLocale)
dayjs.updateLocale('en', {
  relativeTime: {
    future: 'à %s',
    past: '%s atrás',
    s: 'alguns segundos',
    m: 'um minuto',
    mm: '%d minutos',
    h: 'uma hora',
    hh: '%d horas',
    d: 'a day',
    dd: '%d dias',
    M: 'um mês',
    MM: '%d meses',
    y: 'um ano',
    yy: '%d anos'
  },
  weekdays: [
    'Domingo',
    'Segunda Feira',
    'Terça Feira',
    'Quarta Feira',
    'Quinta Feira',
    'Sexta Feira',
    'Sabado'
  ],
  months: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ]
})

dayjs.updateLocale('pt-br', {
  relativeTime: {
    future: 'à %s',
    past: '%s atrás',
    s: 'alguns segundos',
    m: 'um minuto',
    mm: '%d minutos',
    h: 'uma hora',
    hh: '%d horas',
    d: 'a day',
    dd: '%d dias',
    M: 'um mês',
    MM: '%d meses',
    y: 'um ano',
    yy: '%d anos'
  },
  weekdays: [
    'DOMINGO',
    'SEGUNDA',
    'TERÇA',
    'QUARTA',
    'QUINTA',
    'SEXTA',
    'SÁBADO'
  ],
  months: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ]
})
// recebe duas datas e retorna o tempo entre elas no sendo sempre as duas maiores unidades existentes
// ex.: 2d 1h; 2d 3m; 1Mês 3h
dayjs.duracao = (dataInicial, dataFinal) => {
  return _format(dayjs.duration(dayjs(dataFinal).diff(dayjs(dataInicial))))
}

// recebe tempo em milisegundos e formarta para um padrão de duração
// ex.: 2d 1h; 2d 3m; 1Mês 3h
dayjs.formatDuration = (duration) => _format(dayjs.duration(duration))

// recebe tempo em milisegundos e formarta para um padrão de duração
// ex.: 2d 1h; 2d 3m; 1Mês 3h
dayjs.milisegundToDuration = (time) => {
  const times = {
    ano: 12 * 30 * 24 * 60 * 60 * 1000,
    mes: 30 * 24 * 60 * 60 * 1000,
    dia: 24 * 60 * 60 * 1000,
    hora: 60 * 60 * 1000,
    min: 60 * 1000,
    seg: 1000
  }
  let resto = time
  let timeFormat = ''
  let count = 0
  while (!!resto && count < 2) {
    switch (true) {
      case !!(Math.trunc(resto / times.ano)):
        timeFormat += Math.trunc(resto / times.ano) + 'ano '
        resto = resto % times.ano
        count++
        break
      case !!(Math.trunc(resto / times.mes)):
        timeFormat += Math.trunc(resto / times.mes) + 'Mês '
        resto = resto % times.mes
        count++
        break
      case !!(Math.trunc(resto / times.dia)):
        timeFormat += Math.trunc(resto / times.dia) + 'd '
        resto = resto % times.dia
        count++
        break
      case !!(Math.trunc(resto / times.hora)):
        timeFormat += Math.trunc(resto / times.hora) + 'h '
        resto = resto % times.hora
        count++
        break
      case !!(Math.trunc(resto / times.min)):
        timeFormat += Math.trunc(resto / times.min) + 'm '
        resto = resto % times.min
        count++
        break
      case !!(Math.trunc(resto / times.seg)):
        timeFormat += ''
        resto = resto % times.seg
        count++
        break
    }
  }
  return timeFormat || '0m'
}

Vue.prototype.$day = dayjs

export default dayjs
