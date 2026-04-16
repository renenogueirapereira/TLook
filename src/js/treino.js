document.addEventListener("DOMContentLoaded", () => {

  const user = DB.getUsuarioLogado();
  if (!user) return;

  const lista = document.getElementById("listaTreinos");

  // garante que treinos exista
  if (!user.treinos) user.treinos = {};

  let treinos = user.esporte === "volei"
    ? ["Agachamento", "Salto", "Leg Press"]
    : ["Puxada", "Terra", "Pegada"];

  lista.innerHTML = treinos.map((nome, i) => `
    <div class="card">
      <p>${nome}</p>
      <input id="c${i}" type="number" placeholder="Carga">
      <button onclick="salvar(${i}, '${nome}')">Salvar</button>
    </div>
  `).join("");

  window.salvar = (i, nome) => {

    
    const carga = document.getElementById("c" + i).value;

    if (!user.treinos[nome]) {
      user.treinos[nome] = [];
    }

    user.treinos[nome].push({
      carga,
      data: new Date().toLocaleDateString()
    });

    let usuarios = DB.getUsuarios();

    usuarios = usuarios.map(u =>
      u.id === user.id ? user : u
    );

    DB.salvarUsuarios(usuarios);

    // corrigido
    DB.setUsuarioLogado(user.email);

    alert("Treino salvo!");
  };

});