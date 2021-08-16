import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB-aW5mPARAibVw4vRMEIdJT-2n60f-N78",
  authDomain: "cart-68b7e.firebaseapp.com",
  projectId: "cart-68b7e",
  storageBucket: "cart-68b7e.appspot.com",
  messagingSenderId: "308260666656",
  appId: "1:308260666656:web:5e8cb1ccf4c3fdd8fc6b45"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


