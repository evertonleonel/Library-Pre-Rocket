import getData from "/src/global/js/global.js";

const inputPesquisar = document.querySelector('.campo--pesquisar')
const inputFiltro = document.querySelector('.campo--filtro')
const botaoBuscar = document.querySelector('.botao-buscar')
const livrosContainer = document.querySelector('.container-livros')

window.onload = async () => {

  const data =  await getData();
  const {books} = data.data;
  
  books.forEach(item => {
    const p = document.createElement('p');
    let autor = document.createTextNode(item.author);
    p.appendChild(autor)

    const p1 = document.createElement('p');
    let genero = document.createTextNode(item.genre);
    p1.appendChild(genero)

    const p2 = document.createElement('p');
    let dataEntrada = document.createTextNode(item.systemEntryDate);
    p2.appendChild(dataEntrada)

    const h3 = document.createElement('h3');
    let titulo = document.createTextNode(item.tittle)
    h3.appendChild(titulo)
    h3.classList.add('livro-descricao_nome');
   
    const img = document.createElement('img');
    img.src = item.image
    img.classList.add('livro-descricao_nome', 'livro-descricao_imagem')

    const div = document.createElement('div');
    div.classList.add('livro-descricao');
    div.appendChild(img)
    div.appendChild(h3)
    div.appendChild(p)
    div.appendChild(p1)
    div.appendChild(p2)
  
    livrosContainer.appendChild(div)
  });
}

const esconderLivros = (divLivros, inputValue) => {
  divLivros
  .filter(livro =>  !livro.textContent.toLowerCase().includes(inputValue))
  .forEach(livro => {
   livro.classList.add('hidden')
  })
}

const mostrarLivros = (divLivros, inputValue) => {
  divLivros
  .filter(livro =>  livro.textContent.toLowerCase().includes(inputValue))
  .forEach(livro => {
   livro.classList.remove('hidden')
  })
}

inputPesquisar.addEventListener('input', event => {
  const inputValue = event.target.value.trim().toLowerCase();
  const divLivros = Array.from(livrosContainer.children)

  esconderLivros(divLivros, inputValue);
  mostrarLivros(divLivros, inputValue);
})
  
// botaoBuscar.addEventListener('click', () => {

  
// })

// function selecionou(){
//   const select = inputFiltro.value

//   if (select == '0'){
//     console.log('olá')
//   }else if (select == '1'){
//     console.log('2')
//   }else if (select == '2'){
//     console.log('data')
//   }
// }

// selecionou()

