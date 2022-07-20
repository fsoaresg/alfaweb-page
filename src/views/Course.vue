<template>
  <div>
    <v-form v-model="valid" ref="form">
      <v-container>
        <v-row class="my-10 text-center">
          <div class="text-h2">Editando el curso: {{ form.name }}</div>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="form.name"
              :rules="requiredRules"
              label="Nombre"
              required
            >
            </v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="form.image"
              :rules="requiredRules"
              label="Enlace de la imagen"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="form.quotas"
              label="Cupos del Curso"
              type="number"
              min="0"
              required
            >
            </v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="form.inscribed"
              label="Inscritos en el Curso"
              type="number"
              min="0"
              required
            >
            </v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="form.duration"
              :rules="requiredRules"
              label="Duración del Curso"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="form.cost"
              label="Costo del Curso"
              type="number"
              min="0"
              required
            >
            </v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="form.code"
              :rules="requiredRules"
              label="Código del Curso"
              required=""
            >
            </v-text-field>
          </v-col>
          <v-col class="mb-0 pb-0">
            <v-textarea
              solo
              v-model="form.description"
              :rules="requiredRules"
              label="Descripción del Curso"
              required
            ></v-textarea>
          </v-col>
          <v-col cols="12">
            <v-text-field
              class="mt-0 pt-0"
              v-model="form.date"
              :rules="requiredRules"
              label="Fecha de Registro"
              required=""
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-switch
              class="mt-0"
              v-model="form.status"
              label="Terminado: No"
              color="info"
              hide-details
            >
            </v-switch>
          </v-col>
        </v-row>
        <v-row>
          <v-alert
            v-if="Number(form.inscribed) > Number(form.quotes)"
            dense
            outlined
            type="error"
          >
            La cantidad de inscritos debe ser menor o igual a la cantidad de
            cupos!!
          </v-alert>
        </v-row>
        <v-row>
          <v-col class="d-flex justify-center">
            <v-btn
              class="mr-2"
              color="deep-purple accent-2"
              text
              @click="editCourse"
            >
              Actualizar
            </v-btn>
            <v-btn
              class="mr-2"
              color="deep-purple accent-2"
              text
              @click="resetForm"
            >
              Limpiar Formulario
            </v-btn>
            <router-link class="text-decoration-none" :to="`/administracion`">
              <v-btn color="deep-purple accent-2" text> Regresar </v-btn>
            </router-link>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { db } from "@/firebase/firebase.js";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default {
  name: "editcourse-component",
  props: ["idCourse"],
  data: function () {
    return {
      valid: true,
      form: {
        name: "",
        image: "",
        quotas: 0,
        inscribed: 0,
        duration: "",
        cost: 0,
        code: "",
        description: "",
        date: "",
        status: false,
      },
      requiredRules: [(v) => !!v || "La información es requerida"],
    };
  },
  //computed: {},
  methods: {
    ...mapActions(["fetchCourses"]),

    async fetchCourseById() {
      const docRef = doc(db, "courses", this.$route.params.id);
      let response = await getDoc(docRef);
      console.log(response.data());
      this.form = response.data();
    },
    async editCourse() {
      try {
        let course = this.form;
        course.id = this.$route.params.id;
        await updateDoc(doc(db, "courses", course.id), course);
        this.$router.push("/administracion");
      } catch (error) {
        console.log(error);
      }
    },
    resetForm() {
      this.$refs.form.reset();
    },
  },
  // watch: {},
  // components: {},
  // mixins: [],
  // filters: {},
  // -- Lifecycle Methods
  created() {
    this.fetchCourseById();
  },
};
</script>

<style scoped></style>
