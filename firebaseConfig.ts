// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALg1cPuTqcBMSJ5IHjMdvRs-3Rupi6_ps",
  authDomain: "northern-resident.firebaseapp.com",
  projectId: "northern-resident",
  storageBucket: "northern-resident.appspot.com",
  messagingSenderId: "250079640256",
  appId: "1:250079640256:web:d507ee9942bfb3c0bb8b25",
  measurementId: "G-5QNRW14HE0"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);