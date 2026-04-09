function salvarDados() {
  const peso = document.getElementById("peso").value;
  const altura = document.getElementById("altura").value;
  const esporte = document.getElementById("esporte").value;

  // 🔥 agora usa Firebase
  salvarFunil(esporte, peso, altura);
}