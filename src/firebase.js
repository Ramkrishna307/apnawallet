// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; 
import {getFirestore,doc,setDoc} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwQRxNo7yfNx-uAiK7bDIe_r_TRVQEzhw",
  authDomain: "apnawallet-98a10.firebaseapp.com",
  projectId: "apnawallet-98a10",
  storageBucket: "apnawallet-98a10.appspot.com",
  messagingSenderId: "813083784833",
  appId: "1:813083784833:web:50ffdd7120eab149b27f80",
  measurementId: "G-5PYNBY6VJ6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db=getFirestore(app);
const auth=getAuth(app);
const provider=new GoogleAuthProvider();

export {db,auth,provider,doc,setDoc};