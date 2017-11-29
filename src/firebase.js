import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyCdDFgAgH92D1Pb0mCRWUvT2f7TF0ajvNU",
    authDomain: "react-notes-9c3b3.firebaseapp.com",
    databaseURL: "https://react-notes-9c3b3.firebaseio.com",
    projectId: "react-notes-9c3b3",
    storageBucket: "react-notes-9c3b3.appspot.com",
    messagingSenderId: "234972884527"
};
firebase.initializeApp(config);

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth
export default firebase;
