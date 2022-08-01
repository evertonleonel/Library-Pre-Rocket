import getData from "/src/global/js/global.js";
const form = document.forms.registro;
const { email, senha } = form;

// window.onload = () => {
//   const transicao_el = document.querySelector('.transicao');
 
//   setInterval (()=>{
//     transicao_el.classList.remove('esta-ativa');
//   },500);
// };

function logar(e){
  e.preventDefault();
  window.location.href = "/src/paginas/home/home.html"
}

const verificarCampos = async () => {
  const data = await getData();
  
  form.addEventListener('submit', (e) => {

    if (!email.value || !senha.value){
      e.preventDefault();
      alert('Informe os campos')
      return
    }
  
    if(email.value === data.data.login[0].email && senha.value === data.data.login[0].password){
      logar(e)
    } else if (email.value === data.data.login[1].email && senha.value === data.data.login[1].password){
      logar(e)
    } else if (email.value === data.data.login[2].email && senha.value === data.data.login[2].password){
      logar(e)
    } else {
      alert('Senha ou Usuário incorretos!')
    }

  });
  
}

verificarCampos()







  
