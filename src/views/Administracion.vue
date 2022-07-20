<template>
  <v-container>
    <v-row>
      <v-col class="my-10">
        <div class="text-center text-h2">Administración</div>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-data-table :headers="headers" :items="courses" class="elevation-1">
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title class="d-flex"
                >CURSOS DISPONIBLES</v-toolbar-title
              >
              <v-divider class="mx-4" inset vertical></v-divider>
              <RegisterCourse />
            </v-toolbar>
          </template>

          <template v-slot:[`item.cost`]="{ item }">
            <v-chip color="green" dark>
              ${{ Number(item.cost).toLocaleString("es-CL") }}
            </v-chip>
          </template>

          <template v-slot:[`item.date`]="{ item }">
            <v-chip color="green" dark>
              {{ item.date }}
            </v-chip>
          </template>

          <template v-slot:[`item.status`]="{ item }">
            <v-chip v-if="item.status == true" color="gray" dark> No </v-chip>
            <v-chip v-else color="blue" dark> Si </v-chip>
          </template>

          <template v-slot:[`item.actions`]="{ item }">
            <router-link
              class="text-decoration-none"
              :to="`/course/${item.id}`"
            >
              <v-icon small class="mr-2"> mdi-pencil </v-icon>
            </router-link>
            <v-icon small @click="deleteCourse(item)"> mdi-delete </v-icon>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <v-row class="mt-10">
      <v-alert class="ml-3" dense outlined color="purple" width="98%">
        <v-icon class="mr-2" color="purple"> mdi-account-group </v-icon>
        Cantidad total de alumnos permitidos: {{ totalQuotas }} alumnos
      </v-alert>
      <v-alert class="ml-3" dense outlined color="blue" width="98%">
        <v-icon class="mr-2" color="blue"> mdi-account-multiple-check </v-icon>
        Cantidad total de alumnos inscritos: {{ totalInscribed }} alumnos
      </v-alert>
      <v-alert class="ml-3" dense outlined color="red" width="98%">
        <v-icon class="mr-2" color="red"> mdi-account-clock </v-icon>
        Cantidad total de cupos restantes: {{ quotasRemaining }} alumnos
      </v-alert>
      <v-alert class="ml-3" dense outlined color="pink" width="98%">
        <v-icon class="mr-2" color="pink"> mdi-block-helper </v-icon>
        Cantidad total de cursos terminados: {{ coursesFinished }} cursos
      </v-alert>
      <v-alert class="ml-3" dense outlined color="brown" width="98%">
        <v-icon class="mr-2" color="brown"> mdi-bell-ring-outline </v-icon>
        Cantidad total de cursos activos: {{ coursesActives }} cursos
      </v-alert>
      <v-alert class="ml-3" dense outlined color="orange darken-4" width="98%">
        <v-icon class="mr-2" color="orange darken-4">
          mdi-bell-ring-outline
        </v-icon>
        Cantidad total de cursos: {{ countCourses }} cursos
      </v-alert>
    </v-row>
  </v-container>
</template>

<script>
import RegisterCourse from "../components/RegisterCourse.vue";
import { mapActions, mapState, mapGetters } from "vuex";
import { db } from "@/firebase/firebase.js";
import { doc, deleteDoc } from "firebase/firestore";
export default {
  name: "administracion-component",
  props: ["idCourse"],
  data: () => ({
    dialogDelete: false,

    headers: [
      { text: "Curso", align: "start", sortable: false, value: "name" },
      { text: "Cupos", value: "quotas", sortable: false },
      { text: "Inscritos", value: "inscribed", sortable: false },
      { text: "Duración", value: "duration", sortable: false },
      { text: "Costo", value: "cost", sortable: false },
      { text: "Terminado", value: "status", sortable: false },
      { text: "Fecha", value: "date", sortable: false },
      { text: "Actions", value: "actions", sortable: false },
    ],
  }),

  computed: {
    ...mapState(["courses"]),
    ...mapGetters([
      "totalQuotas",
      "totalInscribed",
      "quotasRemaining",
      "countCourses",
      "coursesFinished",
      "coursesActives",
    ]),
  },

  components: {
    RegisterCourse,
  },

  methods: {
    ...mapActions(["fetchCourses"]),

    async deleteCourse(item) {
      try {
        let resp = confirm("¿Estas seguro de eliminar el curso?");

        if (resp) {
          await deleteDoc(doc(db, "courses", item.id));
          this.fetchCourses();
        }
      } catch (error) {
        console.log(error);
      }
    },
  },

  created() {
    this.fetchCourses();
  },
};
</script>

<style scoped>
.v-toolbar__title {
  overflow: visible;
}
</style>
