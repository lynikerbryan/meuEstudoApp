const firebaseConfig = {
  apiKey: "AIzaSyBhtIV85ZOPUshXhnN7MeWTnv4eTVDNfTc",
  authDomain: "study-tracker-concurso.firebaseapp.com",
  projectId: "study-tracker-concurso",
};

firebase.initializeApp(firebaseConfig);


const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();


let currentUser = null;


auth.onAuthStateChanged(user => {
currentUser = user;
document.body.classList.toggle('logged', !!user);
renderToday();
});


function login() {
auth.signInWithPopup(provider);
}


function logout() {
auth.signOut();
}
