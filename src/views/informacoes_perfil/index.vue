<template>
  <pagina
    :loading="loading"
    titulo="Informações de Perfil"
    subtitulo="Cadastro e Manutenção"
  >
    <validation-observer ref="observer">
      <v-container
        fluid
        grid-list-xs
      >
        <v-row
          class="d-flex justify-center"
          dense
        >
          <v-col
            class="d-flex justify-center align-center flex-column"
            xl="8"
            lg="9"
            md="10"
            sm="12"
            cols="12"
          >
            <v-avatar
              size="300"
              class="elevation-1 my-3"
            >
              <v-img
                v-if="imagemPerfil"
                :src="imagemPerfil"
                alt="Profile Image"
              />
              <v-icon
                v-else
                size="150"
                @click="controle.editar ? openFilePicker() : null"
              >
                mdi-account
              </v-icon>
            </v-avatar>
            <v-btn
              v-if="controle.editar"
              color="success"
              small
              @click="openFilePicker"
            >
              {{ imagemPerfil ? 'Substituir Imagem' : 'Escolher Imagem' }}
            </v-btn>
            <input
              ref="fileInput"
              type="file"
              style="display: none"
              accept="image/*"
              @change="handleFileSelect"
            >
          </v-col>
          <v-col
            xl="8"
            lg="9"
            md="10"
            sm="12"
            cols="12"
          >
            <v-row dense>
              <v-col
                xl="2"
                lg="2"
                md="2"
                sm="12"
                cols="12"
              >
                <v-text-field
                  v-model="formulario.login"
                  hide-details
                  disabled
                  dense
                  label="Login"
                  outlined
                />
              </v-col>
              <v-col
                xl="5"
                lg="5"
                md="5"
                sm="12"
                cols="12"
              >
                <validation-provider
                  v-slot="{ errors }"
                  name="Nome"
                  vid="nome"
                  rules="required"
                >
                  <v-text-field
                    v-model="formularioNome"
                    :error-messages="errors"
                    :hide-details="!errors.length"
                    :disabled="controle.exibir"
                    dense
                    label="Nome"
                    outlined
                  />
                </validation-provider>
              </v-col>
              <v-col
                xl="5"
                lg="5"
                md="5"
                sm="12"
                cols="12"
              >
                <v-text-field
                  v-model="formulario.email"
                  hide-details
                  disabled
                  dense
                  label="Email"
                  outlined
                />
              </v-col>
              <v-col
                xl="3"
                lg="3"
                md="3"
                sm="12"
                cols="12"
              >
                <validation-provider
                  v-slot="{ errors }"
                  name="Data de Nascimento"
                  vid="dataNascimento"
                  rules="required"
                >
                  <date-selector
                    ref="dataSelector"
                    v-model="formulario.dataNascimento"
                    :error-messages="errors"
                    :hide-details="!errors.length"
                    :disabled="controle.exibir"
                    dense
                    label="Data de Nascimento"
                    outlined
                    readonly
                    clearable
                  />
                </validation-provider>
              </v-col>
              <v-col
                xl="3"
                lg="3"
                md="3"
                sm="12"
                cols="12"
              >
                <validation-provider
                  v-slot="{ errors }"
                  name="CPF"
                  vid="cpf"
                  rules="required|min:11|numeric"
                >
                  <v-text-field
                    v-model="formulario.cpf"
                    :error-messages="errors"
                    :hide-details="!errors.length"
                    :disabled="controle.exibir"
                    dense
                    label="CPF"
                    outlined
                  />
                </validation-provider>
              </v-col>
              <v-col
                xl="3"
                lg="3"
                md="3"
                sm="12"
                cols="12"
              >
                <v-autocomplete
                  v-model="formulario.tipoUsuarioId"
                  :items="dropdownTipoUsuario"
                  hide-details
                  disabled
                  dense
                  item-value="item"
                  item-text="descricao"
                  label="Tipo de Usuário"
                  class="required"
                  outlined
                />
              </v-col>
              <v-col
                xl="3"
                lg="3"
                md="3"
                sm="12"
                cols="12"
              >
                <v-text-field
                  v-model="formulario.criadoEm"
                  hide-details
                  label="Usuário desde"
                  disabled
                  dense
                  outlined
                />
              </v-col>
              <v-col
                cols="12"
                class="d-flex justify-end"
              >
                <v-btn
                  v-if="!!(!controle.exibir && (controle.inserir || controle.editar))"
                  color="success"
                  class="mx-1"
                  @click="salvarPerfilUsuario()"
                >
                  Salvar
                </v-btn>
                <v-btn
                  v-if="!!(controle.exibir && !controle.inserir)"
                  color="success"
                  class="mx-1"
                  @click="controle.editar = true, controle.exibir = false"
                >
                  Editar
                </v-btn>
                <v-btn
                  v-if="!!(!controle.exibir && (controle.inserir || controle.editar))"
                  color="error"
                  class="mx-1"
                  @click="buscarPerfilUsuario()"
                >
                  CANCELAR
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </validation-observer>
  </pagina>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import axios from '@/plugins/axios_local'

export default {
  name: 'Perfil',
  data: () => ({
    modal: false,
    loading: false,
    perfil: window.atob(localStorage.getItem('umbrella:perfil')),
    formulario: {
      id: null,
      login: null,
      nome: null,
      email: null,
      dataNascimento: null,
      cpf: null,
      criadoEm: null,
      tipoUsuarioId: null
    },
    controle: {
      exibir: false,
      editar: false,
      inserir: false
    },
    imagemPerfil: null,
    selectedFile: null
  }),
  computed: {
    ...mapState('perfil', [
      'dropdownTipoUsuario'
    ]),
    formularioNome: {
      get () {
        return this.formulario.nome ? this.formulario.nome.toUpperCase() : this.formulario.nome
      },
      set (valor) {
        this.formulario.nome = valor.toUpperCase()
      }
    }
  },
  async created () {
    await this.buscarDropdownTipoUsuario(2) // TIPOS DE PERFIS
    this.buscarPerfilUsuario()
  },
  methods: {
    ...mapActions('perfil', [
      'buscarUsuario',
      'buscarImagemUsuario',
      'salvarUsuario',
      'salvarImagemUsuario',
      'buscarDropdownTipoUsuario'
    ]),
    ...mapActions('app', [
      'buscarPathImagem'
    ]),
    async buscarPerfilUsuario () {
      this.loading = true
      const res = await this.buscarUsuario(this.perfil)
      if (res && !res.erro) {
        this.formulario = {
          id: res.id || null,
          login: window.atob(localStorage.getItem('umbrella:login')),
          nome: res.nome || null,
          email: res.email || null,
          dataNascimento: res.data_nascimento || null,
          criadoEm: res.created_at ? this.$day(res.created_at).format('DD/MM/YYYY HH:mm:ss') : null,
          tipoUsuarioId: res.tipo_usuario_id || null,
          cpf: res.cpf || null
        }
        this.controle = {
          exibir: true,
          editar: false,
          inserir: false
        }
        this.buscarImagem()
      }
      this.loading = false
    },
    async salvarPerfilUsuario () {
      if (await this.$refs.observer.validate()) {
        this.loading = true
        const res = await this.salvarUsuario({
          id: this.formulario.id || null,
          nome: this.formulario.nome || null,
          cpf: this.formulario.cpf || null,
          data_nascimento: this.formulario.dataNascimento || null,
          tipo: this.formulario.tipoUsuarioId || null
        })
        if (res && !res.erro) {
          if (this.imagemPerfil) await this.salvarImagem()
          this.buscarPerfilUsuario()
        }
        this.loading = false
      }
    },
    async buscarImagem () {
      this.loading = true
      const res = await this.buscarPathImagem(this.formulario.id)
      let foto = null
      if (res && !res.erro && res.checksum) {
        await axios
          .get(`https://servidor-arquivos-umbrella.lukasrocha.repl.co/download${res.checksum}`, {
            responseType: 'arraybuffer'
          })
          .then(function (response) {
            foto = response.data
          })
          .catch(function (error) {
            window.console.log(error)
          })
        const buffer = Buffer.from(foto, 'binary')
        const blob = new Blob([buffer], { type: 'image/png' })
        const imageUrl = URL.createObjectURL(blob)
        this.imagemPerfil = imageUrl
      }
      this.loading = false
    },
    async salvarImagem () {
      const form = new FormData()
      form.append('tabela', 'usuario')
      form.append('tabela_id', this.formulario.id)
      form.append('file', this.selectedFile)

      await this.salvarImagemUsuario(form)
    },
    openFilePicker () {
      this.$refs.fileInput.click()
    },
    handleFileSelect (event) {
      this.selectedFile = event.target.files[0]
      if (this.selectedFile) {
        const reader = new FileReader()
        reader.onload = () => {
          this.imagemPerfil = reader.result
        }
        reader.readAsDataURL(this.selectedFile)
      }
    }
  }
}
</script>
