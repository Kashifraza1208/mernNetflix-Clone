import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  // Your Firebase configuration settings here
  apiKey: "AIzaSyDKI2zFHFsVnghkPveSeV-SHKCkCvnzyGQ",
  authDomain: "netflix-fullstack-e6f44.firebaseapp.com",
  projectId: "netflix-fullstack-e6f44",
  storageBucket: "netflix-fullstack-e6f44.appspot.com",
  messagingSenderId: "277582474249",
  appId: "1:277582474249:web:2201fc926e4855fce09cd8",
  measurementId: "G-5N9V7CJYDS",
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export default storage;