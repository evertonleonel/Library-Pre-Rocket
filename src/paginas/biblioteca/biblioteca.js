import { getData, saveBooks } from "/src/global/js/global.js";

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
const btnAtivar = document.querySelector('.btn-ativar');
const btnHistorico = document.querySelector('.btn-historico');
const btnEmprestar = document.querySelector('.btn-emprestar');
const btnDevolver = document.querySelector('.btn-devolver');
const btnModalEmprestar = document.querySelector('.btn-ModalEmprestar');
const btnModalInativar = document.querySelector('.btn-Modal-Inativar');

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

const filtrarLivros = (pesquisa, tipo) => {
  const data = getData();
  const { books } = data.data;

  const livrosFiltrados = books.filter((livro) => (
    livro[tipo].toLowerCase().indexOf(pesquisa.toLowerCase()) > -1
  ))

  renderizarLivros(livrosFiltrados);
}

botaoBuscar.addEventListener('click', (e) => {
  filtrarLivros(inputPesquisar.value, selectFiltro.value);
})

window.onload = () => {
  const data = getData();
  const { books } = data.data;

  renderizarLivros(books);
}

livrosContainer.addEventListener('click', (e) => abrirModais(e))

function abrirModais(e){
  e.preventDefault()

  const data = getData();
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
  
  livroSelecionado = books.filter(item => item.tittle.includes(livroModal.textContent))
  
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
  modalImg.src = livroSelecionado.image;
  modalTitulo.innerHTML = livroSelecionado.tittle;
  modalSinopse.innerHTML = livroSelecionado.synopsis;
  modalAutor.innerHTML = livroSelecionado.author;
  modalGenero.innerHTML = livroSelecionado.genre;
  modalData.innerHTML = livroSelecionado.systemEntryDate;

  if( livroSelecionado.rentHistory.length === 0 ){
    modalExtra.classList.add('esconderModalExtra')
  }
  else{
    modalExtra.classList.remove('esconderModalExtra')
  }
    
  atualizarModalExtra()
}

function alternaBotoesEmprestarDevolver(){

  if(livroSelecionado.rentHistory.length > 0){
    btnEmprestar.classList.add('esconder-botao');
    btnDevolver.classList.remove('esconder-botao');
  }else {
    btnEmprestar.classList.remove('esconder-botao');
    btnDevolver.classList.add('esconder-botao');
  }
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

const corpo_tabelaExtra = document.querySelector('.corpo_tabela-modal-extra')

function atualizarModalExtra (){
  
  corpo_tabelaExtra.innerHTML = '';

  livroSelecionado.rentHistory.forEach((aluno) => {

    let trExtra = document.createElement('tr');
    trExtra = corpo_tabelaExtra.insertRow();
  
    let tdAluno = document.createElement('td');
    tdAluno = trExtra.insertCell();
    tdAluno.innerText = aluno.studentName;
    
    let tdTurma = document.createElement('td');
    tdTurma = trExtra.insertCell();
    tdTurma.innerText  = aluno.class;
    
    let tdDataRetirada = document.createElement('td');
    tdDataRetirada = trExtra.insertCell();
    tdDataRetirada.innerText =  aluno.withdrawalDate;
    
    let tdDataEntrega = document.createElement('td');
    tdDataEntrega = trExtra.insertCell()
    tdDataEntrega.innerText =  aluno.deliveryDate;
  })
   
  alternaBotoesEmprestarDevolver()

}

function mostrarModal(e){
  janelaModal.classList.toggle('mostrarModal')
  corpoTabela.innerHTML = '';
}

btnFecharModal.addEventListener('click',(e) => {
  janelaModal.classList.toggle('mostrarModal');
  modalExtra.classList.toggle('esconderModalExtra')
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

const modalAlunoNome = document.querySelector('#aluno_nome');
const modalAlunoTurma = document.querySelector('#aluno_turma');
const modalAlunoDataRetirada = document.querySelector('#aluno_data-retirada');
const modalAlunoDataEntrega = document.querySelector('#aluno_data-entrega');

function limparCamposEmprestarLivro(){
  modalAlunoNome.value = '';
  modalAlunoTurma.value = '';
  modalAlunoDataRetirada.value = '';
  modalAlunoDataEntrega.value = '';
}

function formatarData(dataAtual){
  
  let formatarData = dataAtual.value
  return formatarData.split('-').reverse().join('/');
}

function salvarEmprestimo(){
  const data = getData();
  const livros = data.data.books.filter((book) => book.tittle !== livroSelecionado.tittle);

  if (!modalAlunoNome.value) return;
  if (!modalAlunoTurma.value) return;
  if (!modalAlunoDataRetirada.value) return;
  if (!modalAlunoDataEntrega.value) return;

  const newRentHistory = {
    studentName: modalAlunoNome.value,
    class: modalAlunoTurma.value,
    withdrawalDate: formatarData(modalAlunoDataRetirada),
    deliveryDate: formatarData(modalAlunoDataEntrega)
  }

  livroSelecionado.rentHistory.push(newRentHistory);
  livros.push(livroSelecionado);
  data.data.books = livros;

  saveBooks(data);
 
  modalExtra.classList.remove('esconderModalExtra');

  limparCamposEmprestarLivro()
}

function emprestarLivro(){
  salvarEmprestimo();
  atualizarModalExtra()
  janelaModal.classList.toggle('mostrarModal');
  janelaModalEmprestar.classList.toggle('mostrarModal-emprestar');
}

function devolverLivro(){
  btnEmprestar.classList.remove('esconder-botao');
  btnDevolver.classList.add('esconder-botao');

  modalExtra.classList.add('esconderModalExtra');
}

function bloquearBotaoDevolvereEmprestar(){
  btnDevolver.disabled = true;
  btnEmprestar.disabled = true;
  btnDevolver.style.cursor = 'default';
  btnEmprestar.style.cursor = 'default';
  btnDevolver.style.opacity = '0.5';
  btnEmprestar.style.opacity = '0.5';
  
}

function desbloquerBotaoDevolvereEmprestar(){
  btnDevolver.disabled = false;
  btnEmprestar.disabled = false;
  btnDevolver.style.cursor = 'pointer';
  btnEmprestar.style.cursor = 'pointer';
  btnDevolver.style.opacity = '1';
  btnEmprestar.style.opacity = '1';
}


function salvaAtivacaoLivro (){
  const data = getData();
  const livros = data.data.books.filter((book) => book.tittle !== livroSelecionado.tittle);

  
  const newStatus = {
    isActive: true,
    description: ''
  };

  livroSelecionado.status = newStatus;

  livros.push(livroSelecionado);

  data.data.books = livros;
  
  saveBooks(data);
  
  const modalExtraInativacao = document.querySelector('.modal_extra-inativar');
  
  modalExtraInativacao.classList.add('esconderModalExtra');

  btnInativar.classList.remove('esconder-botao');
  btnAtivar.classList.add('esconder-botao');
  desbloquerBotaoDevolvereEmprestar()
}


function salvarInativacaoLivro (){
  const data = getData();
  const livros = data.data.books.filter((book) => book.tittle !== livroSelecionado.tittle);

  const modalExtraInativacao = document.querySelector('.modal_extra-inativar');
  const receberMotivoInativacao = document.querySelector('.motivo-inativacao');
  const mostrarMotivoInativacao = document.querySelector('.modal-extra-motivoInativar');

  if(!receberMotivoInativacao){
    return
  }
  
  const newStatus = {
    isActive: false,
    description: receberMotivoInativacao.value
  };

  livroSelecionado.status = newStatus;

  livros.push(livroSelecionado);

  data.data.books = livros;

  saveBooks(data);

  mostrarMotivoInativacao.textContent = receberMotivoInativacao.value;
  
  alternaParaModalInativar()

  modalExtraInativacao.classList.remove('esconderModalExtra');
  modalExtra.classList.add('esconderModalExtra');

  receberMotivoInativacao.value = '';

  bloquearBotaoDevolvereEmprestar();

  btnInativar.classList.add('esconder-botao');
  btnAtivar.classList.remove('esconder-botao');
  
}

btnEmprestar.addEventListener('click', alternaParaModalEmprestar);

btnHistorico.addEventListener('click', alternaParaModalHistorico);

btnInativar.addEventListener('click', alternaParaModalInativar);

btnModalInativar.addEventListener('click', salvarInativacaoLivro);

btnModalEmprestar.addEventListener('click', emprestarLivro);

btnDevolver.addEventListener('click', devolverLivro);

btnEditar.addEventListener('click', abriEditarLivro);

btnAtivar.addEventListener('click', salvaAtivacaoLivro);

function abriEditarLivro(){
  window.location = '/src/paginas/editar_livro/editar_livro.html'
  console.log(livroSelecionado)
}

function ultimoLivroSelecionado(){
  const ultimoLivroSelecionado = livroSelecionado;
} 

export {ultimoLivroSelecionado};
