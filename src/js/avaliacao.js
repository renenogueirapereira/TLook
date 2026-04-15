function salvarDados() {
  const peso = document.getElementById("peso").value;
  const altura = document.getElementById("altura").value;
  const esporte = document.getElementById("esporte").value;

  if (!peso || !altura) {
    alert("Preencha peso e altura!");
    return;
  }

  let usuarios = DB.getUsuarios();
  let user = DB.getUsuarioLogado();

  if (!user) {
    alert("Usuário não logado!");
    return;
  }

  const imc = (peso / (altura * altura)).toFixed(2);

  // 👉 mantém a mesma lógica do Firebase
  user.peso = parseFloat(peso);
  user.altura = parseFloat(altura);
  user.imc = imc;
  user.esporte = esporte;

  // histórico (igual você fazia no Firebase)
  if (!user.historico) user.historico = [];

  user.historico.push({
    peso: user.peso,
    imc: parseFloat(imc),
    data: new Date()
  });

  // atualiza no "banco"
  usuarios = usuarios.map(u => u.id === user.id ? user : u);

  DB.salvarUsuarios(usuarios);
  DB.setUsuarioLogado(user);

  alert("Dados salvos!");
}