document.addEventListener("DOMContentLoaded", () => {

  const user = DB.getUsuarioLogado();
  if (!user) return;

  const lista = document.getElementById("listaTreinos");

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
    const carga = document.getElementById("c"+i).value;

    if (!user.treinos[nome]) user.treinos[nome] = [];

    user.treinos[nome].push({ carga });

    let usuarios = DB.getUsuarios();
    usuarios = usuarios.map(u => u.id === user.id ? user : u);

    DB.salvarUsuarios(usuarios);
    DB.setUsuarioLogado(user);

    alert("Salvo!");
  };

});