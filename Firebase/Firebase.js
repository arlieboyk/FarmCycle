import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, collectionGroup } from 'firebase/firestore/lite';
import {getDatabase} from 'firebase/database'
import "firebase/firestore";

const firebaseConfig ={
    apiKey: "AIzaSyDeWWny9C3G9T7s4bUqaJROstQzKeEsfwA",
    authDomain: "farmcycle-9ccea.firebaseapp.com",
    projectId: "farmcycle-9ccea",
    storageBucket: "farmcycle-9ccea.appspot.com",
    messagingSenderId: "801074370409",
    appId: "1:801074370409:web:78fd73fa70979772bb8ff8",
    measurementId: "G-B5VCYY80F5",
};



const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);


