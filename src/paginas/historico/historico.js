body {
  background-color: var(--cor-cinza-fraco);
}

/* 
  Link voltar
*/
.container-navegacao {
  max-width: 624px;
}

.link-voltar-home {
  position: absolute;
  top: 144px;
  left: calc(24px + 1.82%);

  display: flex;
  gap: 8px;
}

.link-voltar-home a{
  font-size: calc(16px, 20px, 26px);
  text-decoration: none;
}

.link-voltar-home a:first-of-type {
  color: #00000080;
}

.link-voltar-home a:last-of-type {
  color: var(--cor-preta);
  font-weight: 500;
}

/* 
CADASTRO CONTENT
*/

.cadastro-livro-content {
  display: flex;
  flex-direction: column;
  position: relative;
}

/* 
CONTAINER CADASTRO -> LIVROS
*/

.container-cadastro {
  display: flex;
  margin: 167px auto;
  margin-bottom: 251px;
  gap: 48px;
  position: relative;
}

/* 
INFORMACAO LIVRO
*/

.livro-capa {
  display: inline-block;
  text-align: center;
  color:var(--cor-dourada) ;
  width: 17.2rem;
  height: 20.6rem;
  border: 2px dashed var(--cor-dourada);
  cursor: pointer;
}

.livro-capa span {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50%;
  gap: 8px;
}

.cadastro-novo-livro {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  grid-gap: 24px;
}

.informacao-livro:nth-child(3){
  grid-row: 2/4;
  display: block;
}

.informacao-livro:nth-child(5){
  grid-column: 2/3;
}

#livro-sinopse{
  height: 129px;
}
 
/* 
CAMPO
 */
.campo {
  display: block;
  width: 350px;
  height: 5.3rem;
  padding: 1.6rem;
  border: 1px solid #133052;
  border-radius: 5px;
  outline: none;
  font-size: clamp(1.4rem, 1.6rem, 2.1rem);
  resize: none;
  background-color: var(--cor-branca);
}


.informacao-livro:nth-child(5) {
  position: relative;
}

.livro-data_icone {
  position: absolute;
  bottom: 30%;
  left: 90%;
}

option {
  box-shadow: 0px 0px 15px #00000033;
  border-radius: 5px;
}

/* 
BOTOES
 */

 .botao {
  width: 14.3rem;
  height: 5.3rem;

  font-size: clamp(14px,16px,18px);
  font-weight: 500;
  text-align: center;
  text-transform: uppercase;

  color: var(--cor-preta);
  background-color: var(--cor-branca);

  border: 1px solid #133052;
  border-radius: 5px;

  cursor: pointer;
 }
 
 .salvar {
  background-color: var(--cor-dourada);
  border: none;
}

.botoes-cadastro-livro {
  position: absolute;
  display: block;
  top: 65%;
  right: 0;
  display: flex;
  gap: 24px;
 }


