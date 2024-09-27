// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBx8GSNLsS7gSJOTDBbWhimAYqHLVgcZk",
  authDomain: "vulnscout-a847d.firebaseapp.com",
  databaseURL: "https://vulnscout-a847d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "vulnscout-a847d",
  storageBucket: "vulnscout-a847d.appspot.com",
  messagingSenderId: "775289450391",
  appId: "1:775289450391:web:cfffa51366bef55175ded2",
  measurementId: "G-GF32LDD0M9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Add the click event listener after DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
  const submit = document.getElementById("submit");
  
  submit.addEventListener("click", function(event) {
    event.preventDefault(); // Prevent form submission

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in successfully
        const user = userCredential.user;
        window.location.href = "UserInterface.html";
      })
      .catch((error) => {
        alert("Wrong Credentials");
        console.error(error.code, error.message);
      });
  });
});
