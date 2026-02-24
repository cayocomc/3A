(function () {
  const AUTH_KEY = "3a-logado";
  const USER_KEY = "3a-usuario";

  function login(usuario, senha) {
    const usuarioValido = "3a";
    const senhaValida = "pantera2026";

    if (usuario === usuarioValido && senha === senhaValida) {
      localStorage.setItem(AUTH_KEY, "true");
      localStorage.setItem(USER_KEY, usuario);
      return true;
    }

    return false;
  }

  function logout() {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(USER_KEY);
    window.location.href = "login.html";
  }

  function estaLogado() {
    return localStorage.getItem(AUTH_KEY) === "true";
  }

  function protegerPagina() {
    if (!estaLogado()) {
      window.location.href = "login.html";
    }
  }

  function ativarLogout(idLink) {
    const link = document.getElementById(idLink);
    if (!link) return;

    if (!estaLogado()) {
      link.style.display = "none";
      return;
    }

    link.addEventListener("click", function (event) {
      event.preventDefault();
      logout();
    });
  }

  window.auth3A = {
    login,
    logout,
    estaLogado,
    protegerPagina,
    ativarLogout,
  };

  window.protegerPagina = protegerPagina;
  window.ativarLogout = ativarLogout;
})();
