// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD662TmCgnxdMwe04r-Zs-qS89WxPJlhGw",
    authDomain: "device-share-ac8ef.firebaseapp.com",
    projectId: "device-share-ac8ef",
    storageBucket: "device-share-ac8ef.appspot.com",
    messagingSenderId: "1051596831426",
    appId: "1:1051596831426:web:9a25cfa7249d0da730195b",
    measurementId: "G-JM92DCPJGL"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Get references to the services
  const auth = firebase.auth();
  const db = firebase.firestore();
  
  // Attach them to the global window object
  window.auth = auth;
  window.db = db;
  