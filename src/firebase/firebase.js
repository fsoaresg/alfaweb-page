//firebase library
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
//config firebase
import { firebaseConfig } from "./firebaseConf.js";

initializeApp(firebaseConfig);

export const db = getFirestore();
