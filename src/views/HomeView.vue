<template>
  <v-container>
    <v-row justify="center">
      <div class="my-10 text-h2">Lista de Cursos</div>
    </v-row>
    <v-row>
      <v-col cols="12" md="4" v-for="course in courses" :key="course.id">
        <my-card :course="course"></my-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import MyCard from "../components/MyCard.vue";

export default {
  name: "home-component",
  // props: {},
  data: function () {
    return {};
  },
  components: {
    "my-card": MyCard,
  },
  computed: {
    ...mapState(["courses"]),
  },
  methods: {
    ...mapActions(["fetchCourses"]),
  },

  created() {
    this.fetchCourses();
  },
};
</script>

<style scoped></style>
