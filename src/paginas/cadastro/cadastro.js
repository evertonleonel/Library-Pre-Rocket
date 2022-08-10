import { getData } from "/src/global/js/global.js";

const inputFile = document.getElementById('livro-imagem-capa');
const inputTitulo = document.getElementById('livro-titulo');
const inputAutor = document.getElementById('livro-autor');
const inputSinopse = document.getElementById('livro-sinopse');
const inputGenero = document.getElementById('livro-genero');
const inputData = document.getElementById('livro-data');

const btnSalvar = document.querySelector('.btn-salvar');
const btnCancelar = document.querySelector('.btn-cancelar');

const data = getData();

const imageSelecionada = document.querySelector('.escolher-imagem');

const imagemTexto = `Capa`;

imageSelecionada.innerHTML = ` ${imagemTexto}`

inputFile.addEventListener('change', (e) => {
  const inputTarget = e.target
  const file = inputTarget.files[0];

  if(file){
    const reader = new FileReader();

    reader.addEventListener('load', (e) => {
      const readerTarget = e.target;

      const img = document.createElement('img');
      img.src = readerTarget.result;
      img.classList.add('imagem-escolhida');
      imageSelecionada.innerHTML = '';
      imageSelecionada.appendChild(img);
    })

    document.querySelector('.livro-capa_icone').classList.add('esconder-imagem')
    document.querySelector('.livro-capa').style.border = 'none'
    reader.readAsDataURL(file);
    
  }else {
    imageSelecionada.innerHTML = ` ${imagemTexto}`;
    document.querySelector('.livro-capa_icone').classList.remove('esconder-imagem');
    document.querySelector('.livro-capa').style.border = '2px dashed currentColor';
  }
});



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




// "books": [
//   {
//     tittle: "Mais Esperto que o Diabo",
//     author: "Napoleon Hill",
//     genre: "Autoajuda",
//     status: {
//       isActive: false,
//       description: "desativado porque estragou"
//     },
//     image: "/assets/livros/livro01.png",
//     systemEntryDate": "02/01/2020",
//     synopsis: "Mussum Ipsum, cacilds vidis litro abertis. In elementis mé pra quem é amistosis quis leo.Posuere libero varius. Nullam a nisl ut ante blandit hendrerit. Aenean sit amet nisi.Quem num gosta di mé, boa gentis num é.Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis.",
//     rentHistory: [];
//   }];