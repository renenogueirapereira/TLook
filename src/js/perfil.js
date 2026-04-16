document.addEventListener("DOMContentLoaded", () => {

  const user = DB.getUsuarioLogado();

  document.getElementById("pPeso").innerText = user.peso || "-";
  document.getElementById("pAltura").innerText = user.altura || "-";
  document.getElementById("pImc").innerText = user.imc || "-";
  document.getElementById("pEsporte").innerText = user.esporte || "-";

});