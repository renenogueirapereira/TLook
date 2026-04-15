document.addEventListener("DOMContentLoaded", () => {

  const user = DB.getUsuarioLogado();

  if (!user) {
    alert("Nenhum usuário logado!");
    return;
  }

  document.getElementById("pPeso").innerText = user.peso || "-";
  document.getElementById("pAltura").innerText = user.altura || "-";
  document.getElementById("pImc").innerText = user.imc || "-";
  document.getElementById("pEsporte").innerText = user.esporte || "-";

});