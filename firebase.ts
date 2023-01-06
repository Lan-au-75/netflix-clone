// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyCRqYFBFFSFJJpMtHMYZzUsYdLfXmtGkII',
    authDomain: 'netflix-clone-f8cbb.firebaseapp.com',
    projectId: 'netflix-clone-f8cbb',
    storageBucket: 'netflix-clone-f8cbb.appspot.com',
    messagingSenderId: '161260242206',
    appId: '1:161260242206:web:f89797935491d68276750f',
}

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }
