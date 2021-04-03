import firebase from 'firebase';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC73ZgITkxUAzWSgwY9Gd5F6cMImyENLzE",
    authDomain: "banco-sigr.firebaseapp.com",
    databaseURL: "https://banco-sigr.firebaseio.com",
    projectId: "banco-sigr",
    storageBucket: "banco-sigr.appspot.com",
    messagingSenderId: "339251859699",
    appId: "1:339251859699:web:23ff0d1dface35dba92786",
    measurementId: "G-JJV6Y1MEG3"
};
// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);
//firebase.analytics();

