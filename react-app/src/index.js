import React from 'react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { createRoot } from 'react-dom/client';


const firebaseConfig = {
    apiKey: "AIzaSyBqJaeAoRU7yZQduOqqDtd8t3pL_ORiRFM",
    authDomain: "db-challenge-t11.firebaseapp.com",
    projectId: "db-challenge-t11",
    storageBucket: "db-challenge-t11.appspot.com",
    messagingSenderId: "179940941606",
    appId: "1:179940941606:web:cea2e7713883b21364abe7",
    measurementId: "G-6TSWWEK0KJ"
};



const app = initializeApp(firebaseConfig);




const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<React.StrictMode>
  <BrowserRouter>
    <App />
  </BrowserRouter>
</React.StrictMode>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
