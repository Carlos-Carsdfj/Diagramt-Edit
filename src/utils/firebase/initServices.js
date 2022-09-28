import { initializeApp } from 'firebase/app'
import {
  getAuth,
  GithubAuthProvider,
  signInWithPopup,
  signOut as userSignOut,
  onAuthStateChanged,
} from 'firebase/auth'
import {
  getFirestore,
  collection,
  setDoc,
  doc,
  getDocs,
  getDoc,
  updateDoc,
} from 'firebase/firestore'
import idGenerate from './idGenerate'

const provider = new GithubAuthProvider()
const firebaseConfig = {
  apiKey: import.meta.env.VITE_KEY_FIREBASE,
  authDomain: 'diagredit-12.firebaseapp.com',
  projectId: 'diagredit-12',
  storageBucket: 'diagredit-12.appspot.com',
  messagingSenderId: '338121180302',
  appId: '1:338121180302:web:e726a8824f36ecf065b5df',
  measurementId: 'G-ELM5YW9HW0',
}
let db = null
let app = null
let auth = null
export const start = async () => {
  try {
    app = await initializeApp(firebaseConfig)
    auth = await getAuth(app)
    db = getFirestore(app)
    console.log('init')
  } catch (error) {
    if (!/already exists/.test(error.message)) {
      console.error('Firebase initialization error', error.stack)
    }
  }
  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      resolve(user)
    })
  })
}

export const singIn = async () => {
  let authUser = null
  await signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a GitHub Access Token. You can use it to access the GitHub API.
      const credential = GithubAuthProvider.credentialFromResult(result)
      const token = credential.accessToken
      console.log('credential:', credential)
      console.log('token :', token)
      // The signed-in user info.
      const user = result.user
      console.log('user name :', user.reloadUserInfo.screenName)
      console.log('user :', user)
      authUser = user
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code
      const errorMessage = error.message
      // The email of the user's account used.
      const email = error.customData.email
      // The AuthCredential type that was used.
      const credential = GithubAuthProvider.credentialFromError(error)
      // ...
    })
  return new Promise((resolve) => {
    resolve(authUser)
  })
}

export const signOut = async () => {
  return userSignOut(auth)
    .then((s) => {
      console.log('a:', s)
    })
    .catch((error) => {
      console.log('Error In signOut', error)
    })
}

export const uploadDiagram = async (info) => {
  const newId = idGenerate()()
  const newDiagram = {
    link: info.link,
    title: info.title,
    comment: info.comment,
    problem: info.problem,
    solution: info.solution,
    imgUrl: info.imgUrl,
    uid: newId,
  }
  const docRef = doc(db, 'diagrams', auth.currentUser.uid)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    if (
      info?.uid &&
      docSnap.data().diagrams.some((diagram) => diagram.uid === info?.uid)
    ) {
      newDiagram.uid = info?.uid
    }
    console.log(newDiagram)
    const newDigramsList = [
      ...docSnap
        .data()
        .diagrams.filter((diagram) => diagram.uid !== newDiagram.uid),
      newDiagram,
    ]
    try {
      await updateDoc(docRef, {
        diagrams: newDigramsList,
      })
      return newDiagram.uid
    } catch (error) {
      console.log('Error In uploadDiagram', error)
    }
  } else {
    try {
      const docReady = await setDoc(docRef, {
        user: auth.currentUser.displayName,
        email: auth.currentUser.email,
        diagrams: [newDiagram],
      })
      return newDiagram.uid
    } catch (error) {
      console.log('Error In uploadDiagram', error)
    }
  }
}
export const getAllDiagrams = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'diagrams'))
    console.log(querySnapshot)
    querySnapshot.forEach((doc) => {
      console.log(doc.id, ' => ', doc.data())
    })
  } catch (error) {
    console.log('error try catch', error)
  }
}
