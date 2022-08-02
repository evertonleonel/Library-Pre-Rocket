import getData from "/src/global/js/global.js";

const input_email = document.querySelector('.formulario_email')
const input_senha = document.querySelector('.formulario_senha')
const botao_submit = document.querySelector('.formulario_btnSubmit')

window.onload = () => {
  const transicao_el = document.querySelector('.transicao');
 
  setInterval (()=>{
    transicao_el.classList.remove('esta-ativa');
  },500);
};

function logar(e){
  e.preventDefault();
  window.location.href = "/src/paginas/home/home.html"
}

const verificarCampos = async () => {
  const data = await getData();
  
  botao_submit.addEventListener('click',  (e) => {
    const email = input_email.value;
    const senha = input_senha.value;
   
    if (!email || !senha){
      e.preventDefault();
      alert('Informe os campos')
      return
    }

    const {login} = data.data
    
    const found = login.find((login) => login.email === email && login.password === senha);
   
    if(found){
      logar(e)
    }else {
      alert('Senha ou usuários incorretos')
      input_email.value = '';
      input_email.focus();
      input_senha.value = '';
    };

  });

}

verificarCampos()
