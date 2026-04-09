document.addEventListener("DOMContentLoaded", () => {

  const botao = document.querySelector(".entra");

  botao.addEventListener("click", (e) => {
    e.preventDefault(); // 🔥 impede o link de ir pra outra página

    const inputs = document.querySelectorAll(".inbox");

    const nome = inputs[0].value.trim();
    const email = inputs[1].value.trim();
    const senha = inputs[2].value.trim();
    const repetir = inputs[3].value.trim();

    // 🚨 validação básica
    if (!nome || !email || !senha || !repetir) {
      alert("Preencha todos os campos!");
      return;
    }

    if (senha !== repetir) {
      alert("As senhas não coincidem!");
      return;
    }

    // 🔥 chama Firebase
    cadastrar(nome, email, senha, repetir);
  });

});