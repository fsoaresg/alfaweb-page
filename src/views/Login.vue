<template>
  <v-container>
    <h3 class="text-center">usuario: user@alfaweb.cl</h3>
    <h3 class="text-center">pass: 123456a-</h3>
    <v-row justify="center" class="text-center">
      <v-col md="5" class="my-5">
        <img id="img-1" src="../assets/logo.jpg" alt="" />
        <v-row justify="center" class="text-center">
          <v-col md="5">
            <img id="img-2" class="mb-1" src="../assets/logo1.png" alt="" />
          </v-col>
        </v-row>
        <h2>Iniciar Sesión</h2>

        <v-form>
          <v-text-field
            v-model="user"
            type="email"
            label="Correo"
            :rules="emailRules"
            required
          ></v-text-field>
          <v-text-field
            v-model="pass"
            :type="show1 ? 'text' : 'password'"
            label="Contraseña"
            :rules="[rules.min]"
            required
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="show1 = !show1"
          ></v-text-field>
          <v-btn @click="login" color="deep-purple" dark block>Ingresar</v-btn>
        </v-form>

        <v-divider class="my-5" color="grey"></v-divider>

        <v-btn class="mt-5" @click="irRegister" color="deep-purple" dark
          >Registrate</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
export default {
  name: "login-view",
  // props: {},
  data: function () {
    return {
      user: "",
      pass: "",
      show1: false,
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+/.test(v) || "E-mail must be valid",
      ],
      rules: {
        min: (v) => v.length >= 6 || "Min 6 characters",
      },
    };
  },
  // computed: {},
  methods: {
    login() {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.user, this.pass)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          this.$router.push("/");
          console.log(user);
        })
        .catch((error) => {
          // const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);
        });
    },

    irRegister() {
      this.$router.push("/registrarse");
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

<style scoped>
#img-1 {
  width: 6rem;
  height: 6rem;
}

#img-2 {
  width: 2.5rem;
  height: 1rem;
}
</style>
