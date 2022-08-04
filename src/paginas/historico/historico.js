import getData from "/src/global/js/global.js";

const corpoTabela = document.querySelector('.corpo-tabela');
const buscarAluno = document.querySelector('.buscar_aluno');
const buscarTurma = document.querySelector('.buscar_turma');
const buscarLivro = document.querySelector('.buscar_livro');
const buscarDataRetirada = document.querySelector('.buscar_data-retirada');
const buscarEntrega = document.querySelector('.buscar_data-entrega');

const obterHistoricos = async () => {
  const data =  await getData();
  const { books } = data.data;

  const booksTratado = books.map((book) => ({
    tittle: book.tittle,
    rentHistory: book.rentHistory
  }))

  return booksTratado;
}

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
    })
   
  })
};

// const filtrarLivros = async (pesquisa) => {
//   const data =  await getData();
//   const { books } = data.data;

//   const livrosFiltrados = books.forEach((item) => {

//     let alunos = item.rentHistory

//     alunos.filter((aluno)=> {  
//     aluno.studentName.toLowerCase() == pesquisa.toLowerCase();})

//   })



// //  let historico =  books.map((item) => {
// //      return item.rentHistory;
// //   })

// //   historico.forEach((item => {
// //     console.log(item[0])
// //   }))

// // const livrosFiltrados = historico.filter((livro) => (
// //   livro.studentName.toLowerCase().indexOf(pesquisa.toLowerCase()) > -1
// // ))

//   renderizarLivros(livrosFiltrados);
// }

// buscarAluno.addEventListener('input', (e) => {
//   filtrarLivros(buscarAluno.value);
// })

window.onload = async () => {
  const historicos = await obterHistoricos();

  renderizarHistorico(historicos);
}

//{
//  "tittle": "Mais Esperto que o Diabo",
//  "rentHistory": [
//    {
//      "studentName": "Gustavo Kunde",
//      "class": "T312",
//      "withdrawalDate": "29/05/2022",
//      "deliveryDate": "19/06/2022"
//    },
//    {
//      "studentName": "Douglas Miller",
//      "class": "T127",
//      "withdrawalDate": "25/06/2022",
//      "deliveryDate": "12/07/2022"
//    }
//  ]
//}

const filtrarHistorico = async (filtro, campo) => {
  const livros = await obterHistoricos();

  livros.forEach((livro) => {
    livro.rentHistory = livro.rentHistory.filter((historico) =>
      historico[campo].toLowerCase().indexOf(filtro.toLowerCase()) > -1
    )
  })

  renderizarHistorico(livros);
}

buscarAluno.addEventListener('input', () => filtrarHistorico(buscarAluno.value, 'studentName'));
buscarTurma.addEventListener('input', () => filtrarHistorico(buscarTurma.value, 'class'));

 //function filtrarAlunos(){
 // 
 // let linhas = corpoTabela.getElementsByTagName('tr');
 // let cells = corpoTabela.getElementsByTagName("td"); //
 // let pesquisar = buscarAluno.value
 // // console.log(linhas[0].childNodes[2])
 //
 // for (let i = 0; i < linhas.length; i++){
//
 //   if( linhas[i].childNodes[3].innerText.includes(buscarAluno.value)){
 //     
 //     let inclui = linhas[i].childNodes[3]
 //     inclui.style.color = 'red'
 //   } else if ( !linhas[i].childNodes[i].innerText.includes(buscarAluno.value)) {
 //     linhas[i].childNodes[3].style.color = 'blue'
 //   }
 // }
//
//
 //console.log(linhas[0].childNodes[0])

//}
