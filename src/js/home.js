document.addEventListener("DOMContentLoaded", () => {
const peso = document.querySelectorAll("peso").value;
const altura = document.querySelectorAll("altura").value;
  const user = DB.getUsuarioLogado();
  if (!user) return;

  const imcs = (peso / (alturaM * alturaM));

  pesos = user.historico.map(d => d.peso);
  imcs = user.historico.map(d => d.imc);
  const labels = user.historico.map((_, i) => "Dia " + (i + 1));

  new Chart(document.getElementById("graficoPeso"), {
    type: 'line',
    data: { labels, datasets: [{ label: "Peso", data: pesos }] }
  });

  new Chart(document.getElementById("graficoIMC"), {
    type: 'line',
    data: { labels, datasets: [{ label: "IMC", data: imcs }] }
  });

});