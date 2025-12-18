const firebaseConfig = {
  apiKey: "AIzaSyBhtIV85ZOPUshXhnN7MeWTnv4eTVDNfTc",
  authDomain: "study-tracker-concurso.firebaseapp.com",
  projectId: "study-tracker-concurso",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
