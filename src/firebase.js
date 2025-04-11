import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // если нужен Firestore
import { getAuth } from "firebase/auth"; // если нужна авторизация

const firebaseConfig = {
 apiKey: "AIzaSyAGHQcmX6JrPzsPgRArU4THoaRrfLRGVoA",
 authDomain: "checkers-40b4c.firebaseapp.com",
 projectId: "checkers-40b4c",
 storageBucket: "checkers-40b4c.firebasestorage.app",
 messagingSenderId: "703334907595",
 appId: "1:703334907595:web:7c87bf620642c8ff8aa54e",
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);

// Экспорт нужных сервисов
export const db = getFirestore(app);
export const auth = getAuth(app);
