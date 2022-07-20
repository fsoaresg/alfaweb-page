<template>
  <div>
    <v-app-bar color="deep-purple" dark>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title class="flex-grow-1 flex-shrink-0"
        >Cursos AlfaWeb</v-toolbar-title
      >

      <div>
        <v-btn
          v-if="currentUser"
          @click="logout()"
          color="deep-purple"
          depressed
        >
          {{ currentUser.email }}
          <v-icon right> mdi-logout </v-icon>
        </v-btn>
      </div>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="light-blue--text text--accent-4"
        >
          <v-list-item
            v-for="route in routes"
            :key="route.name"
            @click="redirectTo(route.name)"
            :disabled="currentRoute == route.name"
          >
            <v-list-item-icon>
              <v-icon>{{ route.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ route.title }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";

export default {
  name: "navbar-component",
  // props: {},
  data: function () {
    return {
      drawer: false,
      group: null,
      routes: [
        {
          icon: "mdi-home",
          title: "Inicio",
          name: "home",
        },
        {
          icon: "mdi-account-cog",
          title: "Administración",
          name: "administracion",
        },
      ],
    };
  },

  computed: {
    currentRoute() {
      return this.$route.name;
    },

    currentUser: () => getAuth().currentUser,
  },

  methods: {
    redirectTo(nameRoute) {
      this.$router.push({ name: nameRoute });
    },

    logout() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          this.$router.push("/login");
        })
        .catch((error) => {
          // An error happened.
          console.log(error);
        });
    },
  },
  // watch: {},
  // components: {},
  // mixins: [],
  // filters: {},
  // -- Lifecycle Methods
  // -- End Lifecycle Methods
};
</script>

<style scoped></style>
