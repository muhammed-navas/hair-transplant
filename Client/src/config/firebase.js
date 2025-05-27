// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDeAv9gIZd9WPf7fZFuQJddpLIJT7CIBT8",
//   authDomain: "otp-mobile-verification-3c4c2.firebaseapp.com",
//   projectId: "otp-mobile-verification-3c4c2",
//   storageBucket: "otp-mobile-verification-3c4c2.firebasestorage.app",
//   messagingSenderId: "416807139231",
//   appId: "1:416807139231:web:981f4af5251a15d3e1efaa",
//   measurementId: "G-RN7MV1STXM",
// };

// // Initialize Firebase
// export const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);




// firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // 🔹 Add this

// const firebaseConfig = {
//   apiKey: "AIzaSyDeAv9gIZd9WPf7fZFuQJddpLIJT7CIBT8",
//   authDomain: "otp-mobile-verification-3c4c2.firebaseapp.com",
//   projectId: "otp-mobile-verification-3c4c2",
//   storageBucket: "otp-mobile-verification-3c4c2.firebasestorage.app",
//   messagingSenderId: "416807139231",
//   appId: "1:416807139231:web:981f4af5251a15d3e1efaa",
//   measurementId: "G-RN7MV1STXM",
// };
const firebaseConfig = {
  apiKey: "AIzaSyDeAv9gIZd9WPf7fZFuQJddpLIJT7CIBT8",
  authDomain: "otp-mobile-verification-3c4c2.firebaseapp.com",
  projectId: "otp-mobile-verification-3c4c2",
  storageBucket: "otp-mobile-verification-3c4c2.firebasestorage.app",
  messagingSenderId: "416807139231",
  appId: "1:416807139231:web:60c861275b883a04e1efaa",
  measurementId: "G-5KTNYEL6T3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // 🔹 Initialize auth

export { app, analytics, auth }; // 🔹 Export auth










// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDeAv9gIZd9WPf7fZFuQJddpLIJT7CIBT8",
//   authDomain: "otp-mobile-verification-3c4c2.firebaseapp.com",
//   projectId: "otp-mobile-verification-3c4c2",
//   storageBucket: "otp-mobile-verification-3c4c2.firebasestorage.app",
//   messagingSenderId: "416807139231",
//   appId: "1:416807139231:web:60c861275b883a04e1efaa",
//   measurementId: "G-5KTNYEL6T3"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);