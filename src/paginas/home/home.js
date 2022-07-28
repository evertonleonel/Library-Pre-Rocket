const cadastro = document.getElementById('navegar-cadastro');
const biblioteca = document.getElementById('navegar-biblioteca');
const historico = document.getElementById('navegar-historico');

cadastro.addEventListener('click', () => {
  window.location.href = '/src/paginas/cadastro/cadastro.html'
});

biblioteca.addEventListener('click', () => {
  window.location.href = '/src/paginas/biblioteca/biblioteca.html'
});

historico.addEventListener('click', () => {
  window.location.href = '/src/paginas/historico/historico.html'
});