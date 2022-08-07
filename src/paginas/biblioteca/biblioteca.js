import getData from "/src/global/js/global.js";

const inputPesquisar = document.querySelector('.campo--pesquisar');
const selectFiltro = document.querySelector('.campo--filtro');
const botaoBuscar = document.querySelector('.botao-buscar');
const livrosContainer = document.querySelector('.container-livros');
const janelaModal =  document.querySelector('.janela-modal');
const janelaModalHistorico = document.querySelector('.janela-modal-historico');
const janelaModalInativar = document.querySelector('.janela-modal-inativar');
const janelaModalEmprestar = document.querySelector('.janela-modal-emprestar');

const btnFecharModal = document.querySelector('.fecharAba');
const btnFecharModalInativar = document.querySelector('.fecharAba-inativar');
const btnFecharModalHistorico = document.querySelector('.fecharAba-historico');
const btnFecharModalEmprestar = document.querySelector('.fecharAba-emprestar');
const btnEditar = document.querySelector('.btn-editar');
const btnInativar = document.querySelector('.btn-inativar');
const btnHistorico = document.querySelector('.btn-historico');
const btnEmprestar = document.querySelector('.btn-emprestar');

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
    // div.setAttribute('onclick', 'mostrarModal')
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

livrosContainer.addEventListener('click', (e) => abrirModais(e))

async function abrirModais(e){
  e.preventDefault()

  const data =  await getData();
  const { books } = data.data;

  let livroModal;
  
  if ( e.target.parentNode == livrosContainer){
    livroModal = e.target;
  }else{
    livroModal = e.target.parentNode;
  }
  
  if(livroModal.className !== 'livro-descricao'){
    return
  }
  
  livroSelecionado =  books.filter(item => item.tittle.includes(livroModal.textContent))
  
  if (livroSelecionado.length > 0){
    livroSelecionado = livroSelecionado[0]
  }

  mostrarModal(e)
  atualizarModal()
  atualizarModalHistorico()
}

let livroSelecionado = [];

const modalImg = document.querySelector('#modal_img');
const modalTitulo = document.querySelector('.descricao_titulo');
const modalSinopse = document.querySelector('.descricao_sinopse');
const modalAutor = document.querySelector('.descricao_autor');
const modalGenero = document.querySelector('.descricao_genero');
const modalData = document.querySelector('.descricao_data');
const modalExtra = document.querySelector('.modal_extra');

function atualizarModal(){
  modalImg.src =  livroSelecionado.image;
  modalTitulo.innerHTML = livroSelecionado.tittle;
  modalSinopse.innerHTML = livroSelecionado.synopsis;
  modalAutor.innerHTML = livroSelecionado.author;
  modalGenero.innerHTML = livroSelecionado.genre;
  modalData.innerHTML = livroSelecionado.systemEntryDate;
}

const corpoTabela = document.querySelector('.corpo-tabela');

function atualizarModalHistorico (){

  livroSelecionado.rentHistory.forEach( (aluno) => {
    let tr = document.createElement('tr');
    tr = corpoTabela.insertRow();
  
    let tdAluno = document.createElement('td');
    tdAluno = tr.insertCell();
    tdAluno.innerText = aluno.studentName;
    
    let tdTurma = document.createElement('td');
    tdTurma = tr.insertCell();
    tdTurma.innerText  = aluno.class;
    
    let tdDataRetirada = document.createElement('td');
    tdDataRetirada = tr.insertCell();
    tdDataRetirada.innerText =  aluno.withdrawalDate;
    
    let tdDataEntrega = document.createElement('td');
    tdDataEntrega = tr.insertCell()
    tdDataEntrega.innerText =  aluno.deliveryDate;
    
  })
}

function mostrarModal(e){
  janelaModal.classList.toggle('mostrarModal')
  corpoTabela.innerHTML = '';
}

btnFecharModal.addEventListener('click',(e) => {
  janelaModal.classList.toggle('mostrarModal');
})

btnFecharModalInativar.addEventListener('click', (e) => {
  janelaModalInativar.classList.toggle('mostrarModal-inativar');
  janelaModal.classList.toggle('mostrarModal');
})

btnFecharModalHistorico.addEventListener('click',(e) => {
  janelaModalHistorico.classList.toggle('mostrarModal-Historico');
  janelaModal.classList.toggle('mostrarModal');
})

btnFecharModalEmprestar.addEventListener('click', (e) => {
  janelaModalEmprestar.classList.toggle('mostrarModal-emprestar');
  janelaModal.classList.toggle('mostrarModal');
})

function alternaParaModalHistorico(){
  janelaModalHistorico.classList.toggle('mostrarModal-Historico');
  janelaModal.classList.toggle('mostrarModal');
}

function alternaParaModalInativar(){
  janelaModalInativar.classList.toggle('mostrarModal-inativar');
  janelaModal.classList.toggle('mostrarModal');
}

function alternaParaModalEmprestar(){
  janelaModal.classList.toggle('mostrarModal');
  janelaModalEmprestar.classList.toggle('mostrarModal-emprestar');
}

btnEmprestar.addEventListener('click', alternaParaModalEmprestar)

btnHistorico.addEventListener('click', alternaParaModalHistorico)

btnInativar.addEventListener('click', alternaParaModalInativar)

btnEditar.addEventListener('click', abriEditarLivro)

function abriEditarLivro(){
  window.location = '/src/paginas/editar_livro/editar_livro.html'
}