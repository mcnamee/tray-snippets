import * as Firebase from 'firebase';
var dotenv = require('dotenv');

console.log(dotenv.load({ path: '../../../.env' }));
console.log(process.env);
Firebase.initializeApp({
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
});

export const FirebaseRef = Firebase.database().ref();
export default Firebase;
