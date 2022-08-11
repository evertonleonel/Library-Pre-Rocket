import { getData, saveBooks } from "/src/global/js/global.js";

const inputFile = document.getElementById('livro-imagem-capa');
const inputTitulo = document.getElementById('livro-titulo');
const inputAutor = document.getElementById('livro-autor');
const inputSinopse = document.getElementById('livro-sinopse');
const inputGenero = document.getElementById('livro-genero');
const inputData = document.getElementById('livro-data');

const btnSalvar = document.querySelector('.btn-salvar');
const btnCancelar = document.querySelector('.btn-cancelar');

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
    });

    document.querySelector('.livro-capa_icone').classList.add('esconder-imagem')
    document.querySelector('.livro-capa').style.border = 'none'
    reader.readAsDataURL(file);
    
  }else {
    imageSelecionada.innerHTML = ` ${imagemTexto}`;
    document.querySelector('.livro-capa_icone').classList.remove('esconder-imagem');
    document.querySelector('.livro-capa').style.border = '2px dashed currentColor';
  };
});

function formatarData(dataAtual){
  
  let formatarData = dataAtual.value
  return formatarData.split('-').reverse().join('/');
};

function salvarNovoLivro (){
  const data = getData();
  
  const imagemBase64 = document.querySelector('.imagem-escolhida').src
 
  if(!inputFile.value) return;
  if(!inputTitulo.value) return;
  if(!inputAutor.value) return;
  if(!inputSinopse.value) return;
  if(!inputGenero.value) return;
  if(!inputData.value)  return;
  
  const newBook = 
  {
    tittle: inputTitulo.value,
    author: inputAutor.value,
    genre: inputGenero.value,
    status: {
      isActive: true,
      description: ""
    },
    image: imagemBase64,
    systemEntryDate: formatarData(inputData),
    synopsis:  inputSinopse.value,
    rentHistory: []
  };
  
  data.data.books.push(newBook);

  saveBooks(data);

  limparCampos();
};


function voltarParaBiblioteca(){
  limparCampos();
};

btnCancelar.addEventListener('click', voltarParaBiblioteca);

btnSalvar.addEventListener('click', salvarNovoLivro);

function limparCampos(){
  imageSelecionada.innerHTML = ` ${imagemTexto}`;
  document.querySelector('.livro-capa_icone').classList.remove('esconder-imagem');
  document.querySelector('.livro-capa').style.border = '2px dashed currentColor';
  inputTitulo.value = '';
  inputAutor.value = '';
  inputSinopse.value = '';
  inputGenero.value = '';
  inputData.value = '';
};