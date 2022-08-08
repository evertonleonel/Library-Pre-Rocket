import { getData, saveBooks } from "/src/global/js/global.js";



const imagemLivro = document.getElementById('livro-imagem-capa');
const tituloLivro = document.getElementById('livro-titulo');
const autorLivro = document.getElementById('livro-autor');
const sinopseLivro = document.getElementById('livro-sinopse');
const generoLivro = document.getElementById('livro-genero');
const btnCancelar = document.querySelector('.btn-cancelar');
const btnSalvar = document.querySelector('.btn-salvar');

function voltarParaBiblioteca(){
  window.location = '/src/paginas/biblioteca/biblioteca.html'
};

btnCancelar.addEventListener('click', voltarParaBiblioteca);

function salvarEdicao(){
  const data = getData ();
  console.log(data)

}

btnSalvar.addEventListener('click', salvarEdicao);



