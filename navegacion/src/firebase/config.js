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


// IMPORTANTE JORGE DEL FUTURO ESTOS DATOS SON IMPORTANTES PARA VER LOS DATOS DE LA PAGINA


// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCq0KWzs3FdT0Q222qCUWohTwNkPmYTr9A",
//   authDomain: "mi-super-app-3a0f5.firebaseapp.com",
//   projectId: "mi-super-app-3a0f5",
//   storageBucket: "mi-super-app-3a0f5.firebasestorage.app",
//   messagingSenderId: "691237583392",
//   appId: "1:691237583392:web:f0313c6f0096be84831a45"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);