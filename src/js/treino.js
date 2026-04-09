import { auth, db } from "../backend/firebase.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

onAuthStateChanged(auth, async (user) => {

  if (!user) return;

  const lista = document.getElementById("listaTreinos");
  if (!lista) return;

  // 🔥 pega dados do usuário no Firebase
  const snapUser = await getDoc(doc(db, "usuarios", user.uid));
  if (!snapUser.exists()) return;

  const dados = snapUser.data();

  let treinos;

  if (dados.esporte === "volei") {
    treinos = ["Agachamento", "Salto", "Leg Press"];
  } else {
    treinos = ["Puxada", "Terra", "Pegada"];
  }

  // 🔥 renderiza treinos
  lista.innerHTML = treinos.map((nome, i) => `
    <div class="card">
      <p>${nome} - 4x10</p>

      <input id="c${i}" type="number" placeholder="Carga">

      <button onclick="salvarTreinoBtn('${nome}', 'c${i}')">
        Salvar
      </button>

      <canvas id="g${i}"></canvas>
    </div>
  `).join("");

  // 🔥 carregar gráficos reais
  setTimeout(() => carregarGraficos(user.uid, treinos), 200);

});


// =======================
// SALVAR TREINO (BOTÃO)
// =======================
function salvarTreinoBtn(nome, inputId) {
  const carga = document.getElementById(inputId).value;

  // usa função do firebase.js
  salvarTreino(nome, carga);
}


// =======================
// CARREGAR GRÁFICOS
// =======================
async function carregarGraficos(uid, treinos) {

  const snap = await getDoc(doc(db, "treinos", uid));
  if (!snap.exists()) return;

  const dados = snap.data();

  treinos.forEach((nome, i) => {

    const historico = dados[nome] || [];

    new Chart(document.getElementById("g" + i), {
      type: 'line',
      data: {
        labels: historico.map((_, j) => "T" + (j+1)),
        datasets: [{
          label: nome,
          data: historico.map(d => d.carga)
        }]
      }
    });

  });

}