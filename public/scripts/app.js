// Configuração do Firebase
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_PROJETO.firebaseapp.com",
  projectId: "SEU_PROJETO",
  storageBucket: "SEU_PROJETO.appspot.com",
  messagingSenderId: "SEU_SENDER_ID",
  appId: "SEU_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Login
function login() {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  auth.signInWithEmailAndPassword(email, senha)
    .then(() => alert("Login feito!"))
    .catch(err => alert(err.message));
}

// Cadastro
function cadastro() {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  auth.createUserWithEmailAndPassword(email, senha)
    .then(() => alert("Usuário criado!"))
    .catch(err => alert(err.message));
}

// Mostrar placar
document.addEventListener("DOMContentLoaded", () => {
  const placarEl = document.getElementById("placar");
  if (placarEl) {
    db.collection("placar").orderBy("pontos", "desc").limit(10)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          const data = doc.data();
          const li = document.createElement("li");
          li.textContent = `${data.nome}: ${data.pontos} pontos`;
          placarEl.appendChild(li);
        });
      });
  }
});