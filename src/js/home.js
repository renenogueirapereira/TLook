import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

onAuthStateChanged(auth, async (user) => {

  if (!user) return;

  const canvasPeso = document.getElementById("graficoPeso");
  const canvasIMC = document.getElementById("graficoIMC");

  if (!canvasPeso || !canvasIMC) return;

  const snap = await getDoc(doc(db, "historicoPeso", user.uid));
  if (!snap.exists()) return;

  const lista = snap.data().lista;

  const pesos = lista.map(d => d.peso);
  const imcs = lista.map(d => d.imc);
  const labels = lista.map((_, i) => "Dia " + (i + 1));

  new Chart(canvasPeso, {
    type: 'line',
    data: {
      labels,
      datasets: [{ label: "Peso", data: pesos }]
    }
  });

  new Chart(canvasIMC, {
    type: 'line',
    data: {
      labels,
      datasets: [{ label: "IMC", data: imcs }]
    }
  });

});