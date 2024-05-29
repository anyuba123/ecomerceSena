// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBYEOZVhV7zYqJ-vWZ4lKZuSFJMM5CGEKc",
  authDomain: "ecommercesena-d5747.firebaseapp.com",
  projectId: "ecommercesena-d5747",
  storageBucket: "ecommercesena-d5747.appspot.com",
  messagingSenderId: "921981575894",
  appId: "1:921981575894:web:611ba41443135564655f77",
  measurementId: "G-1K83TFZRH2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);