import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js'

// If you enabled Analytics in your project, add the Firebase SDK for Google Analytics
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js'

// Add Firebase products that you want to use
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js'
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js'

const firebaseConfig = {
  apiKey: "AIzaSyB0YK0OmBjg6AFeqa-Kl3sm0_b1FWZfQV4",
  authDomain: "dashboard-ui-89564.firebaseapp.com",
  projectId: "dashboard-ui-89564",
  storageBucket: "dashboard-ui-89564.appspot.com",
  messagingSenderId: "891949740369",
  appId: "1:891949740369:web:7f79bedd618ec20b8ca370",
  measurementId: "G-2W1X0W90WB"
};

export const firebaseApp = initializeApp(firebaseConfig);

//database
export const db = getFirestore(firebaseApp);
// console.log(db);

//user login auth

// const analytics = getAnalytics(firebaseApp);


// try {
//   createUserWithEmailAndPassword(auth, 'dastaanq007@gmail.com', '123456').then((userCredentials) => {
//     const user = userCredentials.user;
//     console.log(user);
//   })
// } catch (e) {
//   console.log(e.code, e.message);
// }


export const auth = getAuth();
try {
  signInWithEmailAndPassword(auth, 'dastaanq007@gmail.com', '123456').then((userCredentials) => {
    console.log(userCredentials);
    const user = userCredentials.user;
    
    // console.log(user);
  })
} catch (e) {
  // console.log(e.code);
  console.log(e);
}