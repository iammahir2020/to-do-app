// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXBJ3F0CZZToCtAuZgk8A0cRbERA3ELuM",
  authDomain: "to-do-app-a15bc.firebaseapp.com",
  projectId: "to-do-app-a15bc",
  storageBucket: "to-do-app-a15bc.appspot.com",
  messagingSenderId: "712342959824",
  appId: "1:712342959824:web:628a3c7e1d8231d38510d5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
