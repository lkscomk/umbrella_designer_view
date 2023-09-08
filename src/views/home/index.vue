<template>
  <v-container
    fluid
    class="d-flex flex-column pa-0 ma-0"
  >
    <v-row
      id="home"
      class="d-flex align-center justify-center pa-0 ma-0"
      :style="`height: ${alturaTela}px;`"
    >
      <v-col
        cols="6"
        class="ma-0 pa-0"
      >
        <v-col
          cols="12"
          class="d-flex justify-center falling-div"
        >
          <v-img
            v-if="$vuetify.breakpoint.name === 'xl'"
            src="@/assets/design_perfeito.png"
            max-width="1000px"
            contain
          />
          <v-img
            v-else-if="$vuetify.breakpoint.name === 'lg'"
            src="@/assets/design_perfeito.png"
            max-width="800px"
            contain
          />
          <v-img
            v-else-if="$vuetify.breakpoint.name === 'md'"
            src="@/assets/design_perfeito.png"
            max-width="600px"
            contain
          />
          <v-img
            v-else-if="$vuetify.breakpoint.name === 'sm'"
            src="@/assets/design_perfeito.png"
            max-width="300px"
            contain
          />
          <v-img
            v-else
            src="@/assets/design_perfeito.png"
            max-width="400px"
            contain
          />
        </v-col>
      </v-col>
    </v-row>
    <v-row
      id="o-que-e"
      class="pa-0 ma-0 color primaryHome"
      :style="`height: ${alturaTela}px;`"
    >
      <v-col
        cols="12"
        class="py-10 ma-0 d-flex align-center justify-center"
      >
        <v-img
          max-width="600px"
          contain
          src="@/assets/logoUmbrellaBranca.png"
        />
      </v-col>
      <v-col
        xl="2"
        lg="2"
        md="2"
        sm="0"
        cols="0"
        class="pa-0 ma-0"
      />
      <v-col
        xl="4"
        lg="4"
        md="4"
        sm="12"
        cols="12"
        class="pa-0 ma-0 px-5 d-flex align-center"
      >
        <v-row
          dense
          class="pa-0 ma-0"
        >
          <v-col
            cols="12"
            class="pa-0 ma-0 mb-5"
          >
            <span class="titulo white--text">Quem somos?</span>
          </v-col>
          <v-col
            cols="12"
            class="pa-0 ma-0 mt-5"
          >
            <span class="descricao white--text">A Umbrella Designer vem com a proposta de ajudar a conectar quem precisa de um banner a quem pode oferecer o serviço.</span>
          </v-col>
        </v-row>
      </v-col>
      <v-col
        xl="6"
        lg="6"
        md="6"
        sm="12"
        cols="12"
        class="pa-0 ma-0 d-flex align-start justify-center"
      >
        <v-img
          class="pa-0 ma-0 color "
          max-width="400px"
          contain
          src="@/assets/ideia.png"
        />
      </v-col>
      <v-col
        cols="12"
        class="pa-0 ma-0 color "
      />
    </v-row>
    <v-row
      id="sobre"
      class="pa-0 ma-0"
      :style="`height: ${alturaTela}px;`"
    >
      <v-col
        xl="1"
        lg="1"
        md="1"
        sm="0"
        cols="0"
        class="pa-0 ma-0"
      />
      <v-col
        xl="6"
        lg="6"
        md="12"
        sm="12"
        cols="12"
      >
        <v-row
          dense
          class="pa-0 ma-0"
        >
          <v-col
            cols="12"
            class="pa-0 ma-0 py-10 d-flex align-center"
          >
            <span class="banner primaryHome--text">Mas, o que é um banner?</span>
          </v-col>
          <v-col
            cols="12"
          >
            <span class="sub-descricao primaryHome--text">Já entrou em uma rede social<br>de uma marca famosa e viu<br>aqueles publicações bonitas<br>mostrando os serviçoes ou<br>produtos que essa marca<br>oferece?</span>
          </v-col>
          <v-col
            cols="12"
          >
            <span
              class="sub-descricao primaryHome--text d-flex justify-end"
              style="text-align: right;"
            >Com a Umbrella Designer<br>você pode ter seus próprios<br>banners, para sua empresa<br>ou pequeno negócio.</span>
          </v-col>
        </v-row>
      </v-col>
      <v-col
        xl="4"
        lg="4"
        md="12"
        sm="12"
        cols="12"
        class="pa-0 ma-0 d-flex justify-center"
      >
        <v-img
          class="pa-0 ma-0 color "
          max-width="600px"
          contain
          src="@/assets/instagram.png"
        />
      </v-col>
      <v-col
        xl="12"
        lg="12"
        md="12"
        sm="12"
        cols="12"
        class="pa-0 ma-0 d-flex align-start justify-center"
      >
        <v-btn
          rounded
          color="secondary"
          x-large
        >
          CADASTRE - SE
        </v-btn>
      </v-col>
    </v-row>
    <v-row
      id="perfis"
      class="d-flex pa-0 ma-0"
      :style="`height: ${alturaTela}px;`"
    >
      <v-col
        xl="6"
        lg="6"
        md="6"
        sm="6"
        class="pa-0 ma-0 d-flex align-center justify-center"
      >
        <v-card
          max-width="45%"
          color="primaryHome"
          class="hover-div rounded-xl"
        >
          <v-card-title class="d-flex justify-center white--text">
            Cliente
          </v-card-title>

          <v-icon
            size="200"
            class="d-flex justify-center"
            color="white"
          >
            mdi-account-group
          </v-icon>

          <v-card-text>
            <v-row
              class="pa-0 ma-0"
            >
              <v-col
                cols="1"
                class="white--text "
              >
                <v-icon
                  class="d-flex justify-center pr-3"
                  color="secondary"
                  style="transform: rotate(35deg);"
                >
                  mdi-umbrella
                </v-icon>
              </v-col>
              <v-col
                cols="11"
                class="white--text "
              >
                <b>Solicite </b> o serviço um banner do jeito que desejar.
              </v-col>
              <v-col
                cols="1"
                class="white--text"
              >
                <v-icon
                  class="d-flex justify-center pr-3"
                  color="secondary"
                  style="transform: rotate(35deg);"
                >
                  mdi-umbrella
                </v-icon>
              </v-col>
              <v-col
                cols="11"
                class="white--text "
              >
                <b>Escolha</b> como quer a sua arte em detalhes.
              </v-col>
              <v-col
                cols="1"
                class="white--text "
              >
                <v-icon
                  class="d-flex justify-center pr-3"
                  color="secondary"
                  style="transform: rotate(35deg);"
                >
                  mdi-umbrella
                </v-icon>
              </v-col>
              <v-col
                cols="11"
                class="white--text "
              >
                <b>Tenha </b> facilidade e agilidade no processo de obter seu design perfeito.
              </v-col>
              <v-col
                cols="12"
                class="d-flex justify-center"
              >
                <v-btn
                  rounded
                  color="secondary"
                >
                  Cadastre - se como cliente!
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        xl="6"
        lg="6"
        md="6"
        sm="6"
        cols="12"
        class="pa-0 ma-0 d-flex align-center justify-center"
      >
        <v-card
          max-width="45%"
          color="secondaryHome"
          class="hover-div rounded-xl"
        >
          <v-card-title class="d-flex justify-center white--text">
            Designer
          </v-card-title>

          <v-icon
            size="200"
            class="d-flex justify-center"
            color="white"
          >
            mdi-pencil
          </v-icon>

          <v-card-text>
            <v-row
              class="pa-0 ma-0"
            >
              <v-col
                cols="1"
                class="white--text "
              >
                <v-icon
                  class="d-flex justify-center pr-3"
                  color="secondary"
                  style="transform: rotate(35deg);"
                >
                  mdi-umbrella
                </v-icon>
              </v-col>
              <v-col
                cols="11"
                class="white--text"
              >
                <b>Escolha</b> o serviço que queria fazer.
              </v-col>
              <v-col
                cols="1"
                class="white--text"
              >
                <v-icon
                  class="d-flex justify-center pr-3"
                  color="secondary"
                  style="transform: rotate(35deg);"
                >
                  mdi-umbrella
                </v-icon>
              </v-col>
              <v-col
                cols="11"
                class="white--text "
              >
                <b>Trabalhe</b> que quiser, onde quiser.
              </v-col>
              <v-col
                cols="1"
                class="white--text "
              >
                <v-icon
                  class="d-flex justify-center pr-3"
                  color="secondary"
                  style="transform: rotate(35deg);"
                >
                  mdi-umbrella
                </v-icon>
              </v-col>
              <v-col
                cols="11"
                class="white--text "
              >
                <b>Seja</b> seu próprio chefe.
              </v-col>
              <v-col
                cols="12"
                class="d-flex justify-center"
              >
                <v-btn
                  rounded
                  color="secondary"
                >
                  Cadastre - se como designer!
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row
      class="d-flex pa-0 ma-0 color primaryHome d-flex align-center justify-center"
      :style="`height: ${alturaTela}px;`"
    >
      <v-col cols="1" />
      <v-col
        xl="11"
        lg="11"
        md="11"
        sm="11"
        class="pa-0 ma-0 py-10 d-flex align-center justify-start"
      >
        <span class="banner white--text">Olha o que você pode fazer!</span>
      </v-col>
      <v-col
        xl="2"
        lg="2"
        md="2"
        sm="2"
      >
        <v-carousel
          cycle
          hide-delimiter-background
          hide-delimiters
          :show-arrows="false"
          class="pa-0 ma-0 mt-5 d-flex align-center justify-center"
        >
          <v-carousel-item
            v-for="(slide, i) in slides"
            :key="i"
          >
            <v-img
              :src="slides[controleImagem0]"
              max-width="300px"
              contain
            />
          </v-carousel-item>
        </v-carousel>
      </v-col>
      <v-col
        xl="2"
        lg="2"
        md="2"
        sm="2"
      >
        <v-carousel
          cycle
          hide-delimiter-background
          hide-delimiters
          :show-arrows="false"
          class="pa-0 ma-0 mt-5 d-flex align-center justify-center"
        >
          <v-carousel-item
            v-for="(slide, i) in slides"
            :key="i"
          >
            <v-img
              :src="slides[controleImagem1]"
              max-width="300px"
              contain
            />
          </v-carousel-item>
        </v-carousel>
      </v-col>
      <v-col
        xl="4"
        lg="4"
        md="4"
        sm="4"
      >
        <v-carousel
          hide-delimiter-background
          hide-delimiters
          :show-arrows="false"
          class="pa-0 ma-0 mb-10 d-flex align-center justify-center"
        >
          <v-carousel-item
            v-for="(slide, i) in slides"
            :key="i"
          >
            <v-img
              :src="slides[controleImagem2]"
              max-width="500px"
              contain
            />
          </v-carousel-item>
        </v-carousel>
      </v-col>
      <v-col
        xl="2"
        lg="2"
        md="2"
        sm="2"
      >
        <v-carousel
          cycle
          hide-delimiter-background
          hide-delimiters
          :show-arrows="false"
          class="pa-0 ma-0 mt-5 d-flex align-center justify-center"
        >
          <v-carousel-item
            v-for="(slide, i) in slides"
            :key="i"
          >
            <v-img
              :src="slides[controleImagem3]"
              max-width="300px"
              contain
            />
          </v-carousel-item>
        </v-carousel>
      </v-col>
      <v-col
        xl="2"
        lg="2"
        md="2"
        sm="2"
      >
        <v-carousel
          cycle
          hide-delimiter-background
          hide-delimiters
          :show-arrows="false"
          class="pa-0 ma-0 mt-5 d-flex align-center justify-center"
        >
          <v-carousel-item
            v-for="(slide, i) in slides"
            :key="i"
          >
            <v-img
              :src="slides[controleImagem4]"
              max-width="300px"
              contain
            />
          </v-carousel-item>
        </v-carousel>
      </v-col>
      <v-col
        xl="12"
        lg="12"
        md="12"
        sm="12"
        class="pa-0 ma-0 d-flex align-center justify-center"
      >
        <span class="sub-descricao white--text text-center">Faça um banner para uma promoção ou quando for o dia das mães... <br>Com a Umbrella designer a cratividade é o limite.</span>
      </v-col>
      <v-col cols="12" />
    </v-row>
    <v-row
      id="quemSomos"
      class="d-flex pa-0 ma-0 color white"
      :style="`height: ${alturaTela}px;`"
    >
      <v-col cols="1" />
      <v-col
        xl="11"
        lg="11"
        md="11"
        sm="11"
        class="pa-0 ma-0 py-8 d-flex"
      >
        <span class="banner primaryHome--text">Conheça nossa equipe!</span>
      </v-col>
      <v-col
        xl="12"
        lg="12"
        md="12"
        sm="12"
        class="pa-0 ma-0 d-flex align-center justify-center"
      >
        <v-card
          width="70%"
          color="white"
          class="pa-0 ma-0"
        >
          <iframe
            class="pa-1 pb-0 ma-01"
            width="100%"
            height="623"
            src="https://www.youtube.com/embed/CvBfHwUxHIk"
            title="Rihanna - Umbrella (Orange Version) (Official Music Video) ft. JAY-Z"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          />
        </v-card>
      </v-col>
    </v-row>
    <v-row
      id="perfis"
      class="d-flex pa-0 ma-0 color primaryHome"
      :style="`height: ${alturaTela-400}px;`"
    >
      <v-col cols="12" />
      <v-col cols="1" />
      <v-col
        xl="7"
        lg="7"
        md="7"
        sm="7"
        class="pa-0 ma-0 color"
      >
        <v-row
          dense
          class="pa-0 ma-0"
        >
          <v-col
            xl="4"
            lg="4"
            md="4"
            sm="4"
            class="pa-0 ma-0 color "
          >
            <span class="tituloFooter white--text">Início</span>
          </v-col>
          <v-col
            xl="4"
            lg="4"
            md="4"
            sm="4"
            class="pa-0 ma-0 color "
          >
            <span class="tituloFooter white--text">Sobre nós</span>
          </v-col>
          <v-col
            xl="4"
            lg="4"
            md="4"
            sm="4"
            class="pa-0 ma-0 color "
          >
            <span class="tituloFooter white--text">Suporte</span>
          </v-col>
          <v-col
            xl="4"
            lg="4"
            md="4"
            sm="4"
            class="pa-0 ma-0 color "
          >
            <span class="subTitulosFooter white--text">Home</span>
          </v-col>
          <v-col
            xl="4"
            lg="4"
            md="4"
            sm="4"
            class="pa-0 ma-0 color "
          >
            <span class="subTitulosFooter white--text">Informações</span>
          </v-col>
          <v-col
            xl="4"
            lg="4"
            md="4"
            sm="4"
            class="pa-0 ma-0 color "
          >
            <span class="subTitulosFooter white--text">FAQ</span>
          </v-col>
          <v-col
            xl="4"
            lg="4"
            md="4"
            sm="4"
            class="pa-0 ma-0 color "
          >
            <span class="subTitulosFooter white--text">Sobre o site</span>
          </v-col>
          <v-col
            xl="4"
            lg="4"
            md="4"
            sm="4"
            class="pa-0 ma-0 color "
          >
            <span class="subTitulosFooter white--text">Contatos</span>
          </v-col>
          <v-col
            xl="4"
            lg="4"
            md="4"
            sm="4"
            class="pa-0 ma-0 color "
          >
            <span class="subTitulosFooter white--text">Chat</span>
          </v-col>
          <v-col
            xl="4"
            lg="4"
            md="4"
            sm="4"
            class="pa-0 ma-0 color "
          >
            <span class="subTitulosFooter white--text">Perfis</span>
          </v-col>
          <v-col
            xl="4"
            lg="4"
            md="4"
            sm="4"
            class="pa-0 ma-0 color "
          >
            <span class="subTitulosFooter white--text">Blog</span>
          </v-col>
          <v-col
            xl="4"
            lg="4"
            md="4"
            sm="4"
            class="pa-0 ma-0 color "
          >
            <span class="subTitulosFooter white--text">Política de privaciade</span>
          </v-col>
          <v-col
            cols="12"
            class="pa-0 ma-0 d-flex align-center justify-center"
          >
            <v-img
              max-width="400px"
              contain
              src="@/assets/logoUmbrellaBranca.png"
            />
          </v-col>
          <v-col
            cols="12"
            class="pa-0 ma-0 pl-6 d-flex align-center justify-center"
          >
            <v-btn
              icon
              color="white"
            >
              <v-icon>mdi-linkedin</v-icon>
            </v-btn>
            <v-btn
              icon
              color="white"
            >
              <v-icon>mdi-twitter</v-icon>
            </v-btn>
            <v-btn
              icon
              color="white"
            >
              <v-icon>mdi-facebook</v-icon>
            </v-btn>
            <v-btn
              icon
              color="white"
            >
              <v-icon>mdi-email</v-icon>
            </v-btn>
            <v-btn
              icon
              color="white"
            >
              <v-icon>mdi-share</v-icon>
            </v-btn>
          </v-col>
          <v-col
            cols="12"
            class="pa-0 ma-0 pl-6 pt-5 d-flex align-center justify-center"
          >
            <span class="subTitulosFooter white--text">Todos os direitos reservados</span>
          </v-col>
        </v-row>
      </v-col>
      <v-col
        xl="4"
        lg="4"
        md="4"
        sm="4"
        class="pa-0 ma-0 color"
      >
        <v-row
          dense
          class="pa-0 ma-0"
        >
          <v-col
            xl="12"
            lg="12"
            md="12"
            sm="12"
            class="pa-0 ma-0 py-2 color"
          >
            <span class="tituloFooter white--text">Envie sua dúvida:</span>
          </v-col>
          <v-col
            xl="8"
            lg="8"
            md="8"
            sm="8"
            class="pa-0 ma-0 py-2 color"
          >
            <v-text-field
              v-model="formulario.nome"
              label="Nome"
              filled
              outlined
              dense
              dark
              hide-details
            />
          </v-col>
          <v-col
            xl="8"
            lg="8"
            md="8"
            sm="8"
            class="pa-0 ma-0 py-2 color"
          >
            <v-text-field
              v-model="formulario.email"
              label="Email"
              outlined
              filled
              dense
              dark
              hide-details
            />
          </v-col>
          <v-col
            xl="8"
            lg="8"
            md="8"
            sm="8"
            class="pa-0 ma-0 py-2 color"
          >
            <v-textarea
              v-model="formulario.mensagem"
              label="Sua mensagem"
              outlined
              filled
              dense
              dark
              hide-details
            />
          </v-col>
          <v-col
            xl="8"
            lg="8"
            md="8"
            sm="8"
            class="pa-0 ma-0 py-2 d-flex justify-end color"
          >
            <v-btn
              rounded
              color="success"
              dark
            >
              Enviar
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'TelaSite',
  data: () => ({
    slides: [
      require('@/assets/imagem1.jpg'),
      require('@/assets/imagem2.jpg'),
      require('@/assets/imagem3.jpg'),
      require('@/assets/imagem4.jpg'),
      require('@/assets/imagem5.jpg')
    ],
    controleImagem0: 0,
    controleImagem1: 1,
    controleImagem2: 2,
    controleImagem3: 3,
    controleImagem4: 4,
    formulario: {
      nome: null,
      email: null,
      mensagem: null
    }
  }),
  computed: {
    alturaTela () {
      return this.$vuetify.breakpoint.height - 80
    }
  },
  created () {
    setInterval(() => {
      this.controleImagem0 += this.controleImagem0 === 4 ? -4 : 1
      this.controleImagem1 += this.controleImagem1 === 4 ? -4 : 1
      this.controleImagem2 += this.controleImagem2 === 4 ? -4 : 1
      this.controleImagem3 += this.controleImagem3 === 4 ? -4 : 1
      this.controleImagem4 += this.controleImagem4 === 4 ? -4 : 1
    }, 6000)
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali+UI&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Mulish&display=swap');

.titulo {
  font-size: 40px;
  font-family: 'Mulish', sans-serif;
  font-weight: 800;
}

.tituloFooter {
  font-size:20px;
  font-family: 'Mulish', sans-serif;
  font-weight: 800;
}

.subTitulosFooter {
  font-size:15px;
  font-family: 'Mulish', sans-serif;
}

.descricao {
  font-size: 30px;
  font-family: 'Mulish', sans-serif;
  display: flex;
}

.banner {
  font-size: 60px;
  font-family: 'Mulish', sans-serif;
  font-weight: 800;
  display: flex;
}

.sub-descricao {
  font-size: 30px;
  font-family: 'Mulish', sans-serif;
  display: flex;
}

.hover-div {
  transition: transform 0.3s ease; /* Adiciona uma transição suave na propriedade 'transform' */
}

.hover-div:hover {
  transform: scale(1.1); /* Aumenta o tamanho em 10% quando o mouse passa por cima */
}

.falling-div {
  width: 100%;
  animation: fall 1.4s ease-in-out forwards;
  position: relative; /* Importante para animação funcionar corretamente */
}

@keyframes fall {
  0% {
    top: -400px;
  }
  100% {
    top: 0;
  }
}
</style>
