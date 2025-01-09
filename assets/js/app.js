// Import necessary functions from Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js';
import { getDatabase, ref, get } from 'https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js';

// Firebase config and initialization
const firebaseConfig = {
  apiKey: "AIzaSyBgCsmllgCTvI0xBNTbdYml_iEOFezpzNI",
  authDomain: "lhtpropview2.firebaseapp.com",
  databaseURL: "https://lhtpropview2-default-rtdb.firebaseio.com",
  projectId: "lhtpropview2",
  storageBucket: "lhtpropview2.firebasestorage.app",
  messagingSenderId: "1016618063317",
  appId: "1:1016618063317:web:3bb03b28a98f129d35195c"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database
const db = getDatabase(app);

// Fetch data from Firebase and store it in global propertyData
export async function fetchMLSData() {
    const dbRef = ref(db);
    try {
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
            console.log("Data loaded successfully.");
            return snapshot.val();
        } else {
            console.log("No data available in Firebase.");
            return null;
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}
