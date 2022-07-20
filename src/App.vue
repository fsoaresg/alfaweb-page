<template>
  <v-app>
    <nav-bar v-if="isPrivateRoute"></nav-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar.vue";
export default {
  name: "App",

  data: function () {
    return {};
  },
  computed: {
    isPrivateRoute() {
      if (this.$route.meta.login) return true;
      return false;
    },
  },
  components: {
    "nav-bar": Navbar,
  },
};
</script>
