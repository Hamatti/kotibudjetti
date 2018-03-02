import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyC5xg7ym35K_mCDwrf2jVjJa3AtPElncY0',
  authDomain: 'kotibudjetti.firebaseapp.com',
  databaseURL: 'https://kotibudjetti.firebaseio.com',
  projectId: 'kotibudjetti',
  storageBucket: '',
  messagingSenderId: '628638089768'
})

const db = firebaseApp.database()

export default db
