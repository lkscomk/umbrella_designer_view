import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    options: {
      customProperties: true
    },
    dark: false,
    themes: {
      light: {
        primary: '#0f1e7b',
        secondary: '#E8BB2F',
        accent: '#CFD3CE',
        error: '#eb2f06',
        info: '#2979FF',
        success: '#009C4D',
        warning: '#F2C037',
        primaryHome: '#4E3DF2',
        secondaryHome: '#B311FF'
      },
      dark: {
        primary: '#ffffff',
        primaryOnDark: '#4d8997',
        background: '#121212',
        background2: '#272727',
        secondary: '#424242',
        accent: '#424242',
        error: '#eb2f06',
        info: '#2979FF',
        success: '#009C4D',
        warning: '#F2C037'
      }
    }
  }
})
