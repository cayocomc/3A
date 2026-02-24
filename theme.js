(function () {
  const STORAGE_KEY = "tema-preferido";
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  let botaoTema;

  function obterTemaInicial() {
    const temaSalvo = localStorage.getItem(STORAGE_KEY);
    if (temaSalvo === "dark" || temaSalvo === "light") return temaSalvo;
    return mediaQuery.matches ? "dark" : "light";
  }

  function aplicarTema(tema) {
    document.body.classList.toggle("light-theme", tema === "light");
    document.body.classList.toggle("dark-theme", tema === "dark");

    if (botaoTema) {
      botaoTema.textContent = tema === "dark" ? "☀️ Tema claro" : "🌙 Tema escuro";
      botaoTema.setAttribute("aria-label", `Mudar para ${tema === "dark" ? "tema claro" : "tema escuro"}`);
    }
  }

  function alternarTema() {
    const temaAtual = document.body.classList.contains("light-theme") ? "light" : "dark";
    const novoTema = temaAtual === "dark" ? "light" : "dark";
    localStorage.setItem(STORAGE_KEY, novoTema);
    aplicarTema(novoTema);
  }

  function criarBotaoTema() {
    botaoTema = document.createElement("button");
    botaoTema.type = "button";
    botaoTema.className = "theme-toggle-button";
    botaoTema.addEventListener("click", alternarTema);
    document.body.appendChild(botaoTema);
  }

  document.addEventListener("DOMContentLoaded", function () {
    criarBotaoTema();
    aplicarTema(obterTemaInicial());
  });

  mediaQuery.addEventListener("change", function (event) {
    if (localStorage.getItem(STORAGE_KEY)) return;
    aplicarTema(event.matches ? "dark" : "light");
  });
})();
