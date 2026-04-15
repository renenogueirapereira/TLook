const novoUsuario = {
  id: Date.now(),
  nome,
  email,
  senha,
  peso: null,
  altura: null,
  imc: null,
  esporte: null,
  historico: [],
  treinos: {}
};

usuarios.push(novoUsuario);

DB.salvarUsuarios(usuarios);

// 🔥 ESSA LINHA FALTAVA
DB.setUsuarioLogado(novoUsuario);

window.location.href = "../html/funil-esporte.html";