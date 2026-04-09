let current = 0;
const steps = document.querySelectorAll(".step");
const progress = document.getElementById("progress");
const progressText = document.getElementById("progress-text");

let respostas = {};

/* ================= UI ================= */
function updateUI() {
  if (!steps.length) return;

  steps.forEach((step, index) => {
    step.classList.remove("active");
    if (index === current) step.classList.add("active");
  });

  let percent = ((current + 1) / steps.length) * 100;

  if (progress) progress.style.width = percent + "%";
  if (progressText) progressText.innerText = `${current + 1}/${steps.length}`;
}

/* ================= AVANÇAR ================= */
function next(valor) {
  respostas[`pergunta${current}`] = valor;

  if (current < steps.length - 1) {
    current++;
    updateUI();
  }
}

/* ================= INPUT ================= */
function nextInput(id) {
  const el = document.getElementById(id);
  if (!el) return;

  const value = el.value;

  if (value === "" || value <= 0) {
    alert("Digite um valor válido!");
    return;
  }

  respostas[id] = parseFloat(value);

  if (current < steps.length - 1) {
    current++;
    updateUI();
  }

  // 🔥 finalizar só no final MESMO
  if (current === steps.length - 1) {
    finalizar();
  }
}

/* ================= VOLTAR ================= */
function voltar() {
  if (current > 0) {
    current--;
    updateUI();
  } else {
    window.history.back();
  }
}

/* ================= IMC ================= */
function calcularIMC(peso, altura) {
  // 🔥 corrigido: altura em cm → metros
  const alturaM = altura > 3 ? altura / 100 : altura;
  return (peso / (alturaM * alturaM)).toFixed(2);
}

function classificarIMC(imc) {
  if (imc < 18.5) return "Magreza";
  if (imc < 25) return "Peso normal";
  if (imc < 30) return "Sobrepeso";
  return "Obesidade";
}

/* ================= FINAL ================= */
function finalizar() {
  const peso = respostas.peso;
  const altura = respostas.altura;

  if (!peso || !altura) return;

  const imc = calcularIMC(peso, altura);
  const classificacao = classificarIMC(imc);

  const final = document.getElementById("final");
  if (!final) return;

  final.innerHTML = `
    <h2>Resultado</h2>
    <p>Seu IMC é <strong>${imc}</strong> (${classificacao})</p>
    <p>Vamos montar seu plano ideal agora 🚀</p>
    <button onclick="irHome()">Começar agora</button>
  `;

  // 🔥 Firebase (se existir)
  if (typeof salvarFunil === "function") {
    salvarFunil(
      respostas.esporte || "volei",
      peso,
      altura
    );
  }
}

/* ================= NAVEGAÇÃO ================= */
function irHome() {
  window.location.href = "../html/index.html";
}

/* ================= START ================= */
document.addEventListener("DOMContentLoaded", () => {
  updateUI();
});