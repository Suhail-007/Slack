import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js'
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js'
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc, updateDoc, deleteField, setDoc } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js'

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

export const db = getFirestore(firebaseApp);
const auth = getAuth();

// const analytics = getAnalytics(firebaseApp);
export const getUser = async function(email, password) {
  try {
   const userCreadentials = await signInWithEmailAndPassword(auth, email, password);
    return userCreadentials.user;
  } catch (err) {
    throw err
  }
}


// try {
//   signInWithEmailAndPassword(auth, 'dastaanq007@gmail.com', '123456').then((userCredentials) => {
//     console.log(userCredentials);
//     const user = userCredentials.user;

//     // console.log(user);
//   })
// } catch (e) {
//   // console.log(e.code);
//   console.log(e);
// }