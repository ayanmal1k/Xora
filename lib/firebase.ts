import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBaNZYAoxTEdtf1IHuaXgPivXbcqrpL1Ks",
  authDomain: "xora-d3646.firebaseapp.com",
  projectId: "xora-d3646",
  storageBucket: "xora-d3646.firebasestorage.app",
  messagingSenderId: "74084131545",
  appId: "1:74084131545:web:c9717e931e1fa9cb5494c8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;
