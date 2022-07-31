const form = document.forms.registro;
const { email, senha } = form;

window.onload = () => {
  const transicao_el = document.querySelector('.transicao');
 
  setInterval (()=>{
    transicao_el.classList.remove('esta-ativa');
  },500);
};

form.addEventListener('submit', (e) => {
  
  if (!email.value || !senha.value){
    e.preventDefault();
  }

  function logar(e){
    e.preventDefault();
    window.location.href = "/src/paginas/home/home.html"
  }
  
  logar(e)
});
