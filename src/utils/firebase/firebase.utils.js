import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDBzbiztyw4HTQC_XeH2cpzQMDy3lrHdw8",
  authDomain: "crown-clothing-db-7b743.firebaseapp.com",
  projectId: "crown-clothing-db-7b743",
  storageBucket: "crown-clothing-db-7b743.appspot.com",
  messagingSenderId: "642184318139",
  appId: "1:642184318139:web:84e454bdcf351734afad9e"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if(!userSnapshot.exists()) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      });
    }
    catch(error) {
      console.log("error creating the user");
    }
  }
  return userDocRef;
};