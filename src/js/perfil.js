import { auth, db } from "../backend/firebase.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

onAuthStateChanged(auth, async (user) => {

  if (!user) return;

  const snap = await getDoc(doc(db, "usuarios", user.uid));
  if (!snap.exists()) return;

  const dados = snap.data();

  document.getElementById("pPeso").innerText = dados.peso || "-";
  document.getElementById("pAltura").innerText = dados.altura || "-";
  document.getElementById("pImc").innerText = dados.imc || "-";
  document.getElementById("pEsporte").innerText = dados.esporte || "-";

});