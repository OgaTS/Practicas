import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Para el Login
import { getFirestore } from "firebase/firestore"; // Para la Base de Datos

// Aquí pegas el objeto que te dio Firebase
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Inicializamos Firebase
const app = initializeApp(firebaseConfig);

// Exportamos las herramientas para usarlas en otros archivos
export const auth = getAuth(app);
export const db = getFirestore(app);
