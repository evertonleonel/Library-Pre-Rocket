const body = document.querySelector('body');

body.addEventListener('dblclick', () => {
  window.location.href = '/src/paginas/login/login.html'
});

window.onload = () => {
  const transicao_el = document.querySelector('.transicao');
 
  setInterval (()=>{
    transicao_el.classList.remove('esta-ativa');
  },500);
  
};