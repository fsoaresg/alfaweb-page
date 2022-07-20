import Vue from "vue";
import Vuex from "vuex";
import { db } from "@/firebase/firebase.js";
import { collection, getDocs } from "firebase/firestore";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    courses: [],
  },
  getters: {
    totalQuotas: (state) => {
      return state.courses.reduce((total, course) => {
        return total + Number(course.quotas);
      }, 0);
    },
    totalInscribed: (state) => {
      return state.courses.reduce((total, course) => {
        return total + Number(course.inscribed);
      }, 0);
    },
    quotasRemaining: (state) => {
      return (
        state.courses.reduce((total, course) => {
          return total + Number(course.quotas);
        }, 0) -
        state.courses.reduce((total, course) => {
          return total + Number(course.inscribed);
        }, 0)
      );
    },
    countCourses: (state) => {
      return state.courses.length;
    },
    coursesFinished: (state) => {
      let addFinished = 0;
      state.courses.forEach((course) => {
        if (course.status === false) {
          addFinished++;
        }
      });
      return addFinished;
    },

    coursesActives: (state) => {
      let addActives = 0;
      state.courses.forEach((course) => {
        if (course.status === true) {
          addActives++;
        }
      });
      return addActives;
    },
  },

  mutations: {
    ADD_COURSE(state, course) {
      state.courses.push({
        id: course.id,
        name: course.data().name,
        image: course.data().image,
        quotas: course.data().quotas,
        inscribed: course.data().inscribed,
        duration: course.data().duration,
        cost: course.data().cost,
        code: course.data().code,
        description: course.data().description,
        date: course.data().date,
        status: course.data().status,
      });
    },
    RESET_COURSE(state) {
      state.courses = [];
    },
  },
  actions: {
    async fetchCourses({ commit }) {
      let querySnapShot = await getDocs(collection(db, "courses"));
      commit("RESET_COURSE");
      querySnapShot.forEach(
        (doc) => (
          commit("ADD_COURSE", doc), console.log(doc.id, "=>", doc.data())
        )
      );
    },
  },
  modules: {},
});
