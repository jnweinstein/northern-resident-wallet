// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-hpb6ISG7fAld718m8vUQLx0993Fe1GM",
  authDomain: "northern-resident-dummy-2.firebaseapp.com",
  projectId: "northern-resident-dummy-2",
  storageBucket: "northern-resident-dummy-2.appspot.com",
  messagingSenderId: "1088318374290",
  appId: "1:1088318374290:web:8b44bda218f1de9d8b414b",
  measurementId: "G-6QVLVY933X"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);

/* // For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
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
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app); */



/*
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmWlz7KTPY3gF2zxf4enfzzcDLPNTqIAw",
  authDomain: "northern-resident-dummy.firebaseapp.com",
  projectId: "northern-resident-dummy",
  storageBucket: "northern-resident-dummy.appspot.com",
  messagingSenderId: "704985568672",
  appId: "1:704985568672:web:7e4eaa327dcd60846f00c5",
  measurementId: "G-XFQH4D2GL4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
*/