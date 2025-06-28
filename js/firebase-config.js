// Configuration Firebase
const firebaseConfig = {
    // Remplacez ces valeurs par vos propres configurations Firebase
    apiKey: "VOTRE_API_KEY",
    authDomain: "votre-projet.firebaseapp.com",
    projectId: "votre-projet",
    storageBucket: "votre-projet.appspot.com",
    messagingSenderId: "votre-messaging-sender-id",
    appId: "votre-app-id"
};

// Initialisation de Firebase
firebase.initializeApp(firebaseConfig);

// Référence à la base de données Firestore
const db = firebase.firestore(); 