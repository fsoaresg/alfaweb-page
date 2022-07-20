<template>
  <v-card max-width="350" class="mx-auto" color="deep-purple lighten-5">
    <v-col>
      <v-img height="310" :src="course.image"></v-img>
    </v-col>
    <v-card-text>
      <div class="text-subtitle-1 font-weight-black ml-8 mb-5">
        {{ course.name }}
      </div>
      <div class="font-weight-black ml-8 mb-2">Información</div>
      <v-timeline align-top dense>
        <v-timeline-item small color="deep-purple lighten-3">
          <div>
            <div class="font-weight-normal">
              Costo:
              <strong
                >${{ Number(course.cost).toLocaleString("es-CL") }}</strong
              >
            </div>
            <div>Duración: {{ course.duration }}</div>
          </div>
        </v-timeline-item>
        <v-timeline-item small color="light-green lighten-1">
          <div>
            <div class="font-weight-normal">
              Cupos: <strong>{{ course.quotas }}</strong>
            </div>
            <div v-if="course.inscribed == course.quotas">Completado: Si</div>
            <div v-else>Completado: No</div>
          </div>
        </v-timeline-item>
        <v-timeline-item small color="deep-purple lighten-3">
          <div>
            <div class="font-weight-normal">Fecha de Registro:</div>
            <div>{{ course.date }}</div>
          </div>
        </v-timeline-item>
        <v-timeline-item small color="light-green lighten-1">
          <div>
            <div class="font-weight-normal">Descripción:</div>
            <div>{{ course.description }}</div>
          </div>
        </v-timeline-item>
      </v-timeline>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "my-card",
  props: {
    course: {
      type: Object,
      required: true,
    },
  },
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
img {
  height: 30rem;
  width: 30rem;
}
</style>
