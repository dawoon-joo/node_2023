import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyDYLhaAGwbiyYEZ0pSr0YsdcwbZRI9B4M8',
	authDomain: 'react-node-01.firebaseapp.com',
	projectId: 'react-node-01',
	storageBucket: 'react-node-01.appspot.com',
	messagingSenderId: '219045563054',
	appId: '1:219045563054:web:7f0d869e5e132be9b9fb3f',
};

firebase.initializeApp(firebaseConfig);

export default firebase;
