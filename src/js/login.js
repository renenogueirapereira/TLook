function loginLocal() {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  const usuarios = DB.getUsuarios();

  const user = usuarios.find(u => u.email === email && u.senha === senha);

  if (!user) {
    alert("Login inválido!");
    return;
  }

  DB.setUsuarioLogado(user); // 🔥 ESSA LINHA É CRÍTICA

  window.location.href = "../html/home.html";
}