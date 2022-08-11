import { getData } from "/src/global/js/global.js";

const corpoTabela = document.querySelector('.corpo-tabela');
const buscarAluno = document.querySelector('.buscar_aluno');
const buscarTurma = document.querySelector('.buscar_turma');
const buscarLivro = document.querySelector('.buscar_livro');
const buscarDataRetirada = document.querySelector('.buscar_data-retirada');
const buscarEntrega = document.querySelector('.buscar_data-entrega');

const obterHistoricos = () => {
  const data = getData();
  const { books } = data.data;

  const booksTratado = books.map((book) => ({
    tittle: book.tittle,
    rentHistory: book.rentHistory
  }))

  return booksTratado;
};

const renderizarHistorico = (livros) => {

  corpoTabela.innerHTML = '';

  livros.forEach((livro) => {

    let alunos = livro.rentHistory

    alunos.forEach((aluno)=> {

      let tr = document.createElement('tr');
      tr = corpoTabela.insertRow();
    
      let tdAluno = document.createElement('td');
      tdAluno = tr.insertCell();
      tdAluno.innerText = aluno.studentName;
      
      let tdTurma = document.createElement('td');
      tdTurma = tr.insertCell();
      tdTurma.innerText  = aluno.class;
      
      let tdLivro = document.createElement('td');
      tdLivro = tr.insertCell();
      tdLivro.innerText  = livro.tittle;
     
      let tdDataRetirada = document.createElement('td');
      tdDataRetirada = tr.insertCell();
      tdDataRetirada.innerText =  aluno.withdrawalDate;
     
      let tdDataEntrega = document.createElement('td');
      tdDataEntrega = tr.insertCell()
      tdDataEntrega.innerText =  aluno.deliveryDate;
    });
  });

};

window.onload = async () => {
  const historicos = await obterHistoricos();

  renderizarHistorico(historicos);
};

function formatarData(dataAtual){
  let formatarData = dataAtual.value
  return formatarData.split('-').reverse().join('/');
};

const filtrarHistorico =  (filtro, campo) => {
  const livros =  obterHistoricos();

  livros.forEach((livro) => {
    livro.rentHistory = livro.rentHistory.filter((historico) =>
      historico[campo].toLowerCase().indexOf(filtro.toLowerCase()) > -1
    );
  });

  renderizarHistorico(livros);
};

const filtrarHistoricoPorData =  (filtro, campo) => {
  const livros =  obterHistoricos();

  filtro = formatarData({value: filtro})

  livros.forEach((livro) => {
    livro.rentHistory = livro.rentHistory.filter((historico) =>
      historico[campo].toLowerCase().indexOf(filtro.toLowerCase()) > -1
    );
  });

  renderizarHistorico(livros);
};

const filtrarTittle = (filtro) => {
  const livros = obterHistoricos();

  const livrosFiltrados = livros.filter((livro) =>
    livro.tittle.toLowerCase().indexOf(filtro.toLowerCase()) > -1
  );

  renderizarHistorico(livrosFiltrados);
};

buscarAluno.addEventListener('input', () => filtrarHistorico(buscarAluno.value, 'studentName'));
buscarTurma.addEventListener('input', () => filtrarHistorico(buscarTurma.value, 'class'));
buscarLivro.addEventListener('input', () => filtrarTittle(buscarLivro.value));
buscarDataRetirada.addEventListener('input', () => filtrarHistoricoPorData(buscarDataRetirada.value, 'withdrawalDate'));
buscarEntrega.addEventListener('input', () => filtrarHistoricoPorData(buscarEntrega.value, 'deliveryDate'));
