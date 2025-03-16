// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyAKDLgj_eIP-RQMGkLqGSu_2TI1tO8RJPM",
	authDomain: "fir-first-project-bbbb1.firebaseapp.com",
	projectId: "fir-first-project-bbbb1",
	storageBucket: "fir-first-project-bbbb1.firebasestorage.app",
	messagingSenderId: "375422801757",
	appId: "1:375422801757:web:48ba567947323317013ab4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
