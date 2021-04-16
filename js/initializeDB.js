var firebaseConfig = {
    apiKey: "AIzaSyBLbTsPnr8rTxNfgjtRe8-bH5PXmC3Hvw8",
    authDomain: "camp-with-us.firebaseapp.com",
    projectId: "camp-with-us",
    storageBucket: "camp-with-us.appspot.com",
    messagingSenderId: "595486721018",
    //appId: "1:595486721018:web:1c1f809e9a56b6433c9a43",
    //measurementId: "G-J8V102HCKV"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

db.settings({ timestampsInSnapshots: true});