import { getData } from "/src/global/js/global.js";

const uploadImagem = document.getElementById('livro-imagem-capa');
const inputTitulo = document.getElementById('livro-titulo');
const inputAutor = document.getElementById('livro-autor');
const inputSinopse = document.getElementById('livro-sinopse');
const inputGenero = document.getElementById('livro-genero');
const inputData = document.getElementById('livro-data');

const btnSalvar = document.querySelector('.btn-salvar');
const btnCancelar = document.querySelector('.btn-cancelar');

const data = getData();

let escolherImagem = document.querySelector('.escolher-imagem') 

btnCancelar.addEventListener('click', limparCampos)

uploadImagem.addEventListener('change', (e) => {
  const inputTaget = e.target
  console.log(inputTaget, 'mudei')
  const file = inputTaget.files[0];
  if(file){
    const reader = new FileReader();

    reader.addEventListener('load', (e)=> {
      const readerTarget = e.target;
    })

    escolherImagem.src = readerTarget.result

    reader.readAsDataURL(file);
  }
})


function limparCampos(){
  uploadImagem.value = '';
  inputTitulo.value = '';
  inputAutor.value = '';
  inputSinopse.value = '';
  inputGenero.value = '';
  inputData.value = '';
}

// uploadImagem.onchange = () => {
//   let reader = new FileReader();
//   reader.readAsDataURL(uploadImagem.files[0]);
//   console.log(uploadImagem.files[0]);
//   reader.onload = () =>{
//     uploadImagem.setAttribute('src', reader.result);
//   }
// }

"books": [
  {
    tittle: "Mais Esperto que o Diabo",
    author: "Napoleon Hill",
    genre: "Autoajuda",
    status: {
      isActive: false,
      description: "desativado porque estragou"
    },
    image: "/assets/livros/livro01.png",
    systemEntryDate": "02/01/2020",
    synopsis: "Mussum Ipsum, cacilds vidis litro abertis. In elementis mé pra quem é amistosis quis leo.Posuere libero varius. Nullam a nisl ut ante blandit hendrerit. Aenean sit amet nisi.Quem num gosta di mé, boa gentis num é.Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis.",
    rentHistory: [];
  }];