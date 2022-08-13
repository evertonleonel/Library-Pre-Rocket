import { getData, saveBooks } from "/src/global/js/global.js";
import { setaNavegar, navegarParaPagina } from "../../global/js/navegaParaPagHome.js";

const inputFile = document.getElementById('livro-imagem-capa');
const tituloLivro = document.getElementById('livro-titulo');
const autorLivro = document.getElementById('livro-autor');
const sinopseLivro = document.getElementById('livro-sinopse');
const generoLivro = document.getElementById('livro-genero');
const dataLivro = document.getElementById('livro-data')
const btnCancelar = document.querySelector('.btn-cancelar');
const btnSalvar = document.querySelector('.btn-salvar');

const imageSelecionada = document.querySelector('.escolher-imagem');

function adicionarImagemInputLivro(livroSelecionado){
  const img = document.createElement('img');
  img.src = livroSelecionado.image;
  img.classList.add('imagem-escolhida');
  imageSelecionada.innerHTML = '';
  imageSelecionada.appendChild(img);
  document.querySelector('.livro-capa_icone').classList.add('esconder-imagem')
  document.querySelector('.livro-capa').style.border = 'none'
}

function formatarDataParaUS(dataAtual){
  
  let formatarData = dataAtual
  return formatarData.split('/').reverse().join('-');
};

window.onload = () => {
  const getLivroSelecionado = () => {
    const livroAtual = localStorage.getItem('@livroSelecionado:livro');
    return livroAtual ? JSON.parse(livroAtual) : {};
  };
  
  let livroSelecionado = getLivroSelecionado()

  adicionarImagemInputLivro(livroSelecionado)
  
  tituloLivro.value = livroSelecionado.tittle;
  autorLivro.value = livroSelecionado.author;
  sinopseLivro.value = livroSelecionado.synopsis;
  dataLivro.value = formatarDataParaUS(livroSelecionado.systemEntryDate)
  
  const novaOption = document.createElement('option');
  novaOption.innerHTML = livroSelecionado.genre
  generoLivro.appendChild(novaOption)
  
  generoLivro.value = novaOption.innerHTML
};

inputFile.addEventListener('change', (e) => {
  const inputTarget = e.target
  const file = inputTarget.files[0];

  if(file){
    const reader = new FileReader();

    reader.addEventListener('load', (e) => {
      const readerTarget = e.target;
      const imagemBase64 = readerTarget.result

      const img = document.createElement('img');
      img.src = imagemBase64;
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

function voltarParaBiblioteca(){
  window.location = '/src/paginas/biblioteca/biblioteca.html';
  limparCampos()
};

btnCancelar.addEventListener('click', voltarParaBiblioteca);

function formatarData(dataAtual){
  
  let formatarData = dataAtual.value
  return formatarData.split('-').reverse().join('/');
};

function salvarEdicao(){
  
  const getLivroSelecionado = () => {
    const livroAtual = localStorage.getItem('@livroSelecionado:livro');
    return livroAtual ? JSON.parse(livroAtual) : {};
  };

  let livroSelecionado = getLivroSelecionado()
  
  let novoStatus = livroSelecionado.status;
  
  let novoRentHistory = livroSelecionado.rentHistory;
  
  const data = getData();
  
  const livros = data.data.books.filter((book) => book.tittle !== livroSelecionado.tittle);
  
  if (!tituloLivro.value) return;
  if (!autorLivro.value) return;
  if (!sinopseLivro.value) return;
  if (!generoLivro.value) return;
  // if (!inputFile.value) return;
  if (!dataLivro.value) return;
  
  let editarImagem;
  if(inputFile.files[0]){
    editarImagem = document.querySelector('.imagem-escolhida').src;
  }else{ 
    editarImagem = livroSelecionado.image}

  const newBook = {
    tittle: tituloLivro.value,
    author: autorLivro.value,
    genre: generoLivro.value,
    status: novoStatus,
    image: editarImagem,
    systemEntryDate: formatarData(dataLivro),
    synopsis: sinopseLivro.value,
    rentHistory: novoRentHistory
  };

  livroSelecionado = newBook;
  
  livros.push(livroSelecionado);

  data.data.books = livros;

  saveBooks(data);

  limparCampos();

  window.location = '/src/paginas/biblioteca/biblioteca.html';
};

btnSalvar.addEventListener('click', salvarEdicao);

function limparCampos(){
  tituloLivro.value = '';
  autorLivro.value = '';
  sinopseLivro.value = '';
  generoLivro.value = '';
  inputFile.value = '';
  dataLivro.value = '';
};

// setaNavegar.addEventListener('click', navegarParaPagina);

