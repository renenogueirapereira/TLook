const DB = {
  getUsuarios() {
    return JSON.parse(localStorage.getItem("usuarios")) || [];
  },

  salvarUsuarios(lista) {
    localStorage.setItem("usuarios", JSON.stringify(lista));
  },

  getUsuarioLogado() {
    return JSON.parse(localStorage.getItem("usuarioLogado"));
  },

  setUsuarioLogado(user) {
    localStorage.setItem("usuarioLogado", JSON.stringify(user));
  }
};