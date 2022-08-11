(function(){
  const $body = document.querySelector('body');
  $body.classList.remove('no-js');
  $body.classList.add('js');
  
  const $logout = document.querySelector('.cabecalho_logout');
  $logout.removeAttribute('style')

  $logout.addEventListener('click', ()=> {
    let $sair = document.querySelector('.cabecalho_sair ');
    
    let sairEstado = $sair.style.display;

    $sair.style.display = sairEstado == 'none' ? 'block' : 'none';
  })
 
})();