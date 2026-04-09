// =======================
// IMPORTS FIREBASE
// =======================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// =======================
// CONFIG (COLOQUE OS SEUS DADOS)
// =======================
const firebaseConfig = {
 apiKey: "AIzaSyB9zNq6yPpNA6697MGxgf_-zxERiGNDNt0",
  authDomain: "tlook-30f36.firebaseapp.com",
  projectId: "tlook-30f36",
  storageBucket: "tlook-30f36.firebasestorage.app",
  messagingSenderId: "640710025121",
  appId: "1:640710025121:web:d2291e65f046afe10db5e0",
  measurementId: "G-GEBJHEXQQR"
};

// =======================
// INICIAR FIREBASE
// =======================
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// =======================
// CADASTRO
// =======================
async function cadastrar(nomeUsuario, email, senha, repetirSenha) {
  if (senha !== repetirSenha) {
    alert("As senhas não coincidem!");
    return;
  }

  try {
    const cred = await createUserWithEmailAndPassword(auth, email, senha);
    const uid = cred.user.uid;

    await setDoc(doc(db, "usuarios", uid), {
      nomeUsuario,
      email,
      criadoEm: new Date()
    });

    alert("Cadastro realizado!");

    // 🔥 REDIRECIONA PARA O FUNIL
    window.location.href = "../html/funil-esporte.html";

  } catch (erro) {
    alert("Erro: " + erro.message);
  }
}

// =======================
// LOGIN
// =======================
async function login(email, senha) {
  try {
    await signInWithEmailAndPassword(auth, email, senha);
    alert("Login realizado!");
    window.location.href = "../html/home.html";
  } catch (erro) {
    alert("Erro: " + erro.message);
  }
}

// =======================
// RECUPERAR SENHA
// =======================
async function recuperarSenha(email) {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Email enviado!");
  } catch (erro) {
    alert("Erro: " + erro.message);
  }
}

// =======================
// CALCULAR IMC
// =======================
function calcularIMC(peso, altura) {
  const alturaM = altura / 100;
  return (peso / (alturaM * alturaM)).toFixed(1);
}

// =======================
// SALVAR DADOS (FUNIL)
// =======================
async function salvarFunil(esporte, peso, altura) {
  const user = auth.currentUser;
  if (!user) return alert("Não logado!");

  const imc = calcularIMC(peso, altura);

  // salva perfil
  await updateDoc(doc(db, "usuarios", user.uid), {
    esporte,
    peso: parseFloat(peso),
    altura: parseFloat(altura),
    imc,
    atualizadoEm: new Date()
  });

  // 🔥 HISTÓRICO (IMPORTANTE)
  const ref = doc(db, "historicoPeso", user.uid);
  const snap = await getDoc(ref);

  let lista = [];

  if (snap.exists()) {
    lista = snap.data().lista || [];
  }

  lista.push({
    peso: parseFloat(peso),
    imc: parseFloat(imc),
    data: new Date()
  });

  await setDoc(ref, { lista });

  alert("Dados salvos!");
}

// =======================
// CARREGAR PERFIL
// =======================
async function carregarPerfil() {
  const user = auth.currentUser;
  if (!user) return;

  const snap = await getDoc(doc(db, "usuarios", user.uid));

  if (!snap.exists()) return;

  const d = snap.data();

  if (document.getElementById("perfil-nome"))
    document.getElementById("perfil-nome").textContent = d.nomeUsuario;

  if (document.getElementById("perfil-email"))
    document.getElementById("perfil-email").textContent = d.email;

  if (document.getElementById("perfil-peso"))
    document.getElementById("perfil-peso").textContent = d.peso + " kg";

  if (document.getElementById("perfil-altura"))
    document.getElementById("perfil-altura").textContent = d.altura + " cm";

  if (document.getElementById("perfil-esporte"))
    document.getElementById("perfil-esporte").textContent = d.esporte;

  if (document.getElementById("perfil-imc"))
    document.getElementById("perfil-imc").textContent = d.imc;
}

// =======================
// SALVAR TREINO (PROGRESSÃO)
// =======================
async function salvarTreino(nomeExercicio, carga) {
  const user = auth.currentUser;
  if (!user) return alert("Não logado!");

  const ref = doc(db, "treinos", user.uid);
  const snap = await getDoc(ref);

  let dados = snap.exists() ? snap.data() : {};

  if (!dados[nomeExercicio]) {
    dados[nomeExercicio] = [];
  }

  dados[nomeExercicio].push({
    carga: parseFloat(carga),
    data: new Date()
  });

  await setDoc(ref, dados);

  alert("Treino salvo!");
}

// =======================
// LOGOUT
// =======================
async function logout() {
  await signOut(auth);
  alert("Saiu!");
  window.location.href = "../html/login.html";
}

// =======================
// VERIFICAR LOGIN
// =======================
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("Logado:", user.email);
    carregarPerfil();
  } else {
    console.log("Não logado");
  }
});

// =======================
// EXPORTAR PRA HTML
// =======================
window.cadastrar = cadastrar;
window.login = login;
window.recuperarSenha = recuperarSenha;
window.salvarFunil = salvarFunil;
window.logout = logout;
window.salvarTreino = salvarTreino;