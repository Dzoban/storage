import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import FirebaseFactory from './firebaseFactory';

const firebaseConfig = {
	apiKey: 'AIzaSyCnD7dRL7ajaJ9G2cSNfCEL4VUjCwmjRP8',
	authDomain: 'storage-3e20f.firebaseapp.com',
	projectId: 'storage-3e20f',
	storageBucket: 'storage-3e20f.appspot.com',
	messagingSenderId: '234434422442',
	appId: '1:234434422442:web:20918a3a866d4dbafa12d3',
};

export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseFirestore = getFirestore(firebaseApp);
export const firebaseStorage = getStorage(firebaseApp);

export const firebaseCollections = {
	users: 'users',
};

export const users = new FirebaseFactory(firebaseFirestore, firebaseCollections.users);
