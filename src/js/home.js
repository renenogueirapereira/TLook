document.addEventListener("DOMContentLoaded", () => {

  const user = DB.getUsuarioLogado();
  if (!user) return;

  const pesos = user.historico.map(d => d.peso);
  const imcs = user.historico.map(d => d.imc);
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