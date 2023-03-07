import { initializeApp } from 'firebase/app'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  browserSessionPersistence,
  setPersistence,
  sendPasswordResetEmail,
  signOut,
  deleteUser,
  updatePassword
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  doc,
  deleteDoc,
  updateDoc,
  setDoc,
  onSnapshot
} from 'firebase/firestore';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject
} from "firebase/storage";
import {
  initializeAppCheck,
  ReCaptchaV3Provider
} from 'firebase/app-check';

const firebaseConfig = {
  apiKey: "AIzaSyB0YK0OmBjg6AFeqa-Kl3sm0_b1FWZfQV4",
  authDomain: "dashboard-ui-89564.firebaseapp.com",
  projectId: "dashboard-ui-89564",
  storageBucket: "dashboard-ui-89564.appspot.com",
  messagingSenderId: "891949740369",
  appId: "1:891949740369:web:7f79bedd618ec20b8ca370",
  measurementId: "G-2W1X0W90WB",
};

//init app
const firebaseApp = initializeApp(firebaseConfig);

const appCheck = initializeAppCheck(firebaseApp, {
  provider: new ReCaptchaV3Provider('6LclvcckAAAAALXB7BPnP3RT0gIUpQiCMCvYDk_m'),
  isTokenAutoRefreshEnabled: true
})

//init services
const storage = getStorage(firebaseApp);
const db = getFirestore(firebaseApp);
const auth = getAuth();

let unSubSnapShot;
let unSubAuth;

const loginUser = async function(email, password) {
  try {
    await setPersistence(auth, browserSessionPersistence);
    await signInWithEmailAndPassword(auth, email, password);
    return auth.currentUser;
  } catch (err) {
    throw err.message
  }
}

const authChanged = function(user) {
  return new Promise((resolve, reject) => {
      unSubAuth = onAuthStateChanged(auth, user => user ? resolve(user) : reject('no user is currently log in'))
    })
    .then(res => getUserDataAndUserPic(user))
    .catch(err => console.log(err));
}

//create user & send user email verification
const createUserSendEmailVerif = async function(email, password) {
  try {
    const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
    const user = await userCredentials.user;
    sendEmailVerif();
    return user
  } catch (err) {
    throw err
  }
}

export const updateUserData = async function(field) {
  try {
    const userRef = doc(db, 'users', auth.currentUser.uid);

    await updateDoc(userRef, field);
  } catch (err) {
    console.log(err);
    throw err
  }
}

const sendEmailVerif = async function() {
  await sendEmailVerification(auth.currentUser);
}

const resetUserPass = async function(email) {
  try {
    return await sendPasswordResetEmail(auth, email);
  } catch (err) {
    throw err
  }
}

const updateUserPassword = async function(user, newPassword) {
  try {
    await updatePassword(user, newPassword);
  } catch (err) {
    throw err
  }
}

const logoutUser = async function() {
  try {
    await signOut(auth);
    unSubAuth();
    unSubSnapShot();
  } catch (err) {
    throw err
  }
}

//when user sign up create user data in firebase database
const createUserData = async function(user, formData) {
  try {
    await setDoc(doc(db, 'users', user.uid), {
      personalInfo: {
        fullname: formData.fullname,
        email: formData.email,
        contact: formData.countryCode + formData.phone,
        dob: formData.dob,
        state: formData.state,
        country: formData.country,
        gender: formData.gender,
      },
      extraInfo: {
        profilePicName: formData.profile.name,
        profilePic: '',
        uid: user.uid,
        bio: 'Write something about yourself'
      },
      accountInfo: {
        wallet: 0,
        movements: [],
      },
      preference: {
        theme: 'system default',
        charts: {
          roi: 'Doughnut',
          bi: 'Line'
        }
      }
    });

    //if theres no profile don't upload it to servers
    if (formData.profile.name !== '') await uploadPic(user, formData.profile);
    return true;
  } catch (err) {
    throw err
  }
}

const getUserDataAndUserPic = function(user) {
  const currUser = auth.currentUser;
  return new Promise(function(resolve, reject) {
      unSubSnapShot = onSnapshot(doc(db, "users", currUser.uid), async doc => {
        try {
          if (doc.exists()) {
            user.data = doc.data();
            await getUserImage(user.data);
            resolve(true);
          }
          reject(false);
        } catch (err) {
          throw err
        }
      })
    })
    .catch(err => {
      throw Error(`User data not found, ${err}`)
    })
}

const assetsRef = ref(storage, 'assets');

const uploadPic = async function(user, file) {
  //it's like this inside of assets folder create user(user.id) folder there create a file name(file param) and upload that file to server. i.e assets/user/file(same name as user have saved)
  try {
    const { name } = file;
    const profilePicRef = ref(storage, `assets/${user.uid}/${name}`);
    // // 
    const snapshot = await uploadBytes(profilePicRef, file);
    console.log('Image uploaded to server');
    return snapshot
  } catch (err) {
    throw err
  }
}

const getUserImage = async function(user) {
  try {
    const { uid, profilePicName: name } = user.extraInfo;

    //if there's no profie pic name ref in user return & use default profile
    if (name === '') return

    const profilePicRef = ref(storage, `assets/${uid}/${name}`);

    //user obj model
    user.extraInfo.profilePic = await getDownloadURL(profilePicRef);

  } catch (err) {
    throw err
  }
}

const deleteUserAndData = async function(user, currUser) {
  try {
    await deleteUserPic(user);
    await deleteUserDoc();
    await deleteUser(currUser);
    return true;
  } catch (err) {
    throw err
  }
}

const deleteUserPic = async function(user) {
  try {
    const { uid, profilePic, profilePicName: name } = user.extraInfo;

    if (!profilePic && !name) return;

    const profilePicRef = ref(storage, `assets/${uid}/${name}`);
    await deleteObject(profilePicRef);
  } catch (err) {
    throw err
  }
}

const deleteUserDoc = async function() {
  try {
    const currUser = auth.currentUser;
    await deleteDoc(doc(db, 'users', currUser.uid));
    unSubSnapShot();
    unSubAuth();
  } catch (err) {
    throw err
  }
}

const firebaseObj = {
  loginUser,
  createUserSendEmailVerif,
  createUserData,
  getUserDataAndUserPic,
  resetUserPass,
  sendEmailVerif,
  logoutUser,
  authChanged,
  deleteUserAndData,
  updateUserData,
  uploadPic,
  updateUserPassword
}

export default firebaseObj;