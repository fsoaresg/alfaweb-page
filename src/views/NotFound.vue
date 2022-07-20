<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12">
        <h1 class="text-center my-4">La pagina que buscas no existe</h1>
        <v-divider class="my-3"></v-divider>
        <v-card class="mx-auto" max-width="35rem">
          <v-img
            id="img"
            alt="not-found"
            src="../assets/404-page-not-found.jpg"
            max-height="21rem"
            max-width="35rem"
          />
          <v-btn
            class="ma-2"
            color="orange darken-2"
            dark
            @click="$router.push('/')"
          >
            <v-icon dark left> mdi-arrow-left </v-icon>
            <span class="mr-2">Regresar</span>
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "notfound-component",
  // props: {},
  data: function () {
    return {};
  },
  // computed: {},
  //methods: {}
  // watch: {},
  // components: {},
  // mixins: [],
  // filters: {},
  // -- Lifecycle Methods
  // -- End Lifecycle Methods
};
</script>

<style scoped>
#img {
  text-align: center;
}
</style>
