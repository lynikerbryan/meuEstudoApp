const firebaseConfig = {
  apiKey: "AIzaSyBhtIV85ZOPUshXhnN7MeWTnv4eTVDNfTc",
  authDomain: "study-tracker-concurso.firebaseapp.com",
  projectId: "study-tracker-concurso",
};

firebase.initializeApp(firebaseConfig);


const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();


const ALLOWED_EMAIL = 'lyniker.bryan@gmail.com';
let currentUser = null;


auth.onAuthStateChanged(user => {
if (user && user.email !== ALLOWED_EMAIL) {
alert('Acesso não autorizado');
auth.signOut();
return;
}


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
