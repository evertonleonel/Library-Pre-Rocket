import getData from "/src/global/js/global.js";

const inputPesquisar = document.querySelector('.campo--pesquisar')
const selectFiltro = document.querySelector('.campo--filtro')
const botaoBuscar = document.querySelector('.botao-buscar')
const livrosContainer = document.querySelector('.container-livros')

const renderizarLivros = (livros) => {
  livrosContainer.innerHTML = '';

  livros.forEach(item => {

    const h3 = document.createElement('h3');
    let titulo = document.createTextNode(item.tittle);
    h3.appendChild(titulo);
    h3.classList.add('livro-descricao_nome');
   
    const img = document.createElement('img');
    img.src = item.image;
    img.classList.add('livro-descricao_nome', 'livro-descricao_imagem')

    const div = document.createElement('div');
    div.classList.add('livro-descricao');
    div.setAttribute('onclick', 'abrirModal('+id+')')
    div.appendChild(img);
    div.appendChild(h3);
   
    livrosContainer.appendChild(div);
  });
}

const filtrarLivros = async (pesquisa, tipo) => {
  const data =  await getData();
  const { books } = data.data;

  const livrosFiltrados = books.filter((livro) => (
    livro[tipo].toLowerCase().indexOf(pesquisa.toLowerCase()) > -1
  ))

  renderizarLivros(livrosFiltrados);
}

botaoBuscar.addEventListener('click', (e) => {
  filtrarLivros(inputPesquisar.value, selectFiltro.value);
})

window.onload = async () => {
  const data =  await getData();
  const { books } = data.data;

  renderizarLivros(books);
}

// function gerarID(){
//   return Math.floor(Math.random() * 100)
// }

// let id = gerarID;

// console.log(id)

