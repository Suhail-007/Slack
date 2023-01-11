import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js'
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signOut
} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js'
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  deleteDoc,
  updateDoc,
  deleteField,
  setDoc,
  onSnapshot
} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js';
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-storage.js";

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
const storage = getStorage();
export const db = getFirestore();
const auth = getAuth();

// const analytics = getAnalytics(firebaseApp);
export const loginUser = async function(email, password) {
  try {
    const userCreadentials = await signInWithEmailAndPassword(auth, email, password);
    return auth.currentUser;
  } catch (err) {
    throw err
  }
}

//create user & send user email verification
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

export const sendEmailVerif = async function() {
  await sendEmailVerification(auth.currentUser);
}

export const resetUserPass = async function(email) {
  try {
    return await sendPasswordResetEmail(auth, email);
  } catch (err) {
    throw err
  }
}

export const signoutUser = async function() {
  try {
    await signOut(auth);
  } catch (err) {
    throw err
  }
}

//when user sign up create user data in firebase database
export const createUserData = async function(user, formData) {
  try {
    await setDoc(doc(db, 'users', user.uid), {
      fullname: formData.fullname,
      profilePic: formData.profile.name,
      userEmail: formData.email,
      uid: user.uid,
      phone: formData.countryCode + formData.phone,
      dob: formData.dob,
      state: formData.state,
      country: formData.country,
      gender: formData.gender,
      isEmailVerified: user.emailVerified,
    });
    //if theres no profile don't upload it to servers
    if (formData.profile.name === '') return
    await uploadPic(user.uid, formData.profile);
  } catch (err) {
    console.log(err);
    throw err
  }
}

export const getUserData = function(user) {
  const currUser = auth.currentUser;
  return new Promise(function(resolve, reject) {
    onSnapshot(doc(db, "users", currUser.uid), doc => {
      if (doc.exists()) {
        user.data = doc.data();
        resolve();
      }
      reject('data not found');
    });
  });
}

const imagesRef = ref(storage, 'images');

const uploadPic = async function(user, file) {
  //it's like this inside of images folder create user(user.id) folder there create a file name(file param) and upload that file to server. i.e images/user/file(same name as user have saved)
  try {
    const profilePicRef = ref(storage, `images/${user}/${file.name}`);

    const snapshot = await uploadBytes(profilePicRef, file);
    console.log('Image uploaded to server');
    return snapshot
  } catch (err) {
    throw err
  }
}

export const getUserImage = async function(user) {
  try {
    if (user.profilePic === '') return

    const profilePicRef = ref(storage, `images/${user.uid}/${user.profilePic}`);

    const imgUrl = await getDownloadURL(profilePicRef);
    user.profilePic = imgUrl;
  } catch (err) {
    throw err
  }
}