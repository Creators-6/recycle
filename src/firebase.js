// Import required SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5Xk6syLhoEVPKpOptk7xbhdXH4vunGmQ",
  authDomain: "ewaste-f45c3.firebaseapp.com",
  projectId: "ewaste-f45c3",
  storageBucket: "ewaste-f45c3.appspot.com",
  messagingSenderId: "513895863111",
  appId: "1:513895863111:web:ef421422ff96ebc3663262",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export only what you need
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
