import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js'
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, sendEmailVerification } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js'
import { getFirestore, collection, addDoc, getDocs, getDoc, doc, deleteDoc, updateDoc, deleteField, setDoc, onSnapshot } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js';
import { getStorage, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-storage.js";


const firebaseConfig = {
  apiKey: "AIzaSyB0YK0OmBjg6AFeqa-Kl3sm0_b1FWZfQV4",
  authDomain: "dashboard-ui-89564.firebaseapp.com",
  projectId: "dashboard-ui-89564",
  storageBucket: "dashboard-ui-89564.appspot.com",
  messagingSenderId: "891949740369",
  appId: "1:891949740369:web:7f79bedd618ec20b8ca370",
  measurementId: "G-2W1X0W90WB",
  storageBucket: 'gs://dashboard-ui-89564.appspot.com'
};

//init app
export const firebaseApp = initializeApp(firebaseConfig);

//init services
const storage = getStorage(firebaseApp);
export const db = getFirestore(firebaseApp);
const auth = getAuth();

const imagesRef = ref(storage, 'images');

function uploadPic(user, file) {
  const usrPic = ref(imagesRef, user);
  uploadBytes(usrPic, file).then((snapshot) => {
    console.log(snapshot);
    console.log('Uploaded a blob or file!');
  });
}

// const analytics = getAnalytics(firebaseApp);
export const loginUser = async function(email, password) {
  try {
    const userCreadentials = await signInWithEmailAndPassword(auth, email, password);
    return auth.currentUser;
  } catch (err) {
    throw err
  }
}

export const createUserSendEmailVerif = async function(email, password) {
  try {
    const userCredentials = await createUserWithEmailAndPassword(auth, email, password);

    const user = await userCredentials.user;
    sendEmailVerif();
    return user
  } catch (err) {
    throw err
  }
}

const signoutUser = async function() {
  const signout = await signOut(auth);
  console.log(signout, 'signout');
}

export const createUserData = async function(user) {
  await setDoc(doc(db, 'users', user.uid), {
    fullname: user.displayName,
    profilePic: user.photoURL,
    userEmail: user.email,
    uid: user.uid,
    phone: user.phoneNumber,
  });
  uploadPic(user.uid, user.photoURL)
}

export const getUserData = async function() {
  try {
    const currUser = auth.currentUser;
    const docSnap = await getDoc(doc(db, "users", currUser.uid));
    if (docSnap.exists()) return docSnap.data();
    throw Error('erorrrrr')
  } catch (err) {
    throw err
  }
}

export const sendEmailVerif = async function() {
  await sendEmailVerification(auth.currentUser);
}