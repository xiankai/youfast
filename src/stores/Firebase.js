import * as firebase from 'firebase';
import 'firebase/firestore';

import {
    FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_DATABASE_URL,
    FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET,
} from 'react-native-dotenv';

firebase.initializeApp({
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    databaseUrl: FIREBASE_DATABASE_URL,
    projectId: FIREBASE_PROJECT_ID,
    storageBucket: FIREBASE_STORAGE_BUCKET,
});

const firestore = firebase.firestore();
const auth = firebase.auth();
const Timestamp = firebase.firestore.Timestamp;

export { firestore, auth, Timestamp };
