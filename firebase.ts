import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getFirestore } from "firebase/firestore/lite";

import { getStorage } from "firebase/storage"


const firebaseConfig = {
    apiKey: "AIzaSyDo7VKzf2MciMOD1drU6mQRE2N7GaXSnfk",
    authDomain: "chat-with-ai-98fea.firebaseapp.com",
    projectId: "chat-with-ai-98fea",
    storageBucket: "chat-with-ai-98fea.appspot.com",
    messagingSenderId: "323188877508",
    appId: "1:323188877508:web:44fc47db75bb151a7dc191"
  };
  


  const app =getApps().length===0?initializeApp(firebaseConfig):getApp();

  const db =getFirestore(app) 

  const storage = getStorage(app)

  export {db,storage}