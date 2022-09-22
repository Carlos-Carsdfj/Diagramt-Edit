import { initializeApp } from 'firebase/app'
import {
  getAuth,
  GithubAuthProvider,
  signInWithPopup,
  signOut as userSignOut,
} from 'firebase/auth'

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

let app = null
let auth = null
export const start = async () => {
  try {
    app = await initializeApp(firebaseConfig)
    auth = await getAuth(app)
    console.log('init')
  } catch (error) {
    if (!/already exists/.test(error.message)) {
      console.error('Firebase initialization error', error.stack)
    }
  }
  return new Promise((resolve) => {
    resolve(auth?.currentUser)
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
      // An error happened.
    })
}

export const currentUser = () => {
  const user = auth.currentUser
  console.log(user)
}
