import { getFileData, getData, saveBooks } from "/src/global/js/global.js";

const input_email = document.querySelector('.formulario_email');
const input_senha = document.querySelector('.formulario_senha');
const botao_submit = document.querySelector('.formulario_btnSubmit');

window.onload = () => {
  const transicao_el = document.querySelector('.transicao');
 
  setInterval (()=>{
    transicao_el.classList.remove('esta-ativa');
  },500);
};

async function importarDadosSeVazio() {
  const books = getData();
  
  if( books.length > 0 )
  return;
  
  const fileData = await getFileData();
  saveBooks(fileData);
};

function logar(e){
  e.preventDefault();
  window.location.href = "/src/paginas/home/home.html"
  importarDadosSeVazio();
};

const focado = ({target}) => {
  const span = target.previousElementSibling;
  span.classList.add('span-ativado');
};

const desfocado = ({target}) => {
  if(!target.value){
    const span = target.previousElementSibling;
    span.classList.remove('span-ativado');
  };
};

input_email.addEventListener('focus', focado);
input_senha.addEventListener('focus', focado);
input_email.addEventListener('focusout', desfocado);
input_senha.addEventListener('focusout', desfocado);

const verificarCampos = async () => {
  const data = await getFileData();

  botao_submit.addEventListener('click',  (e) => {
    const email = input_email.value;
    const senha = input_senha.value;
   
    if (!email || !senha){
      e.preventDefault();
      alert('Informe os campos')
      return
    };
    
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
};

verificarCampos();
