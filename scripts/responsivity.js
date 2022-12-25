// Ajusta o tamanho da página quando o usuário redimensiona a janela
window.addEventListener('resize', function() {
    adjustPageSize();
  });
  
  function adjustPageSize() {
    // Ajusta o tamanho do conteúdo da página de acordo com o tamanho da janela
    var content = document.getElementById('content');
    content.style.width = window.innerWidth + 'px';
    content.style.height = window.innerHeight + 'px';
  }
  
  // Chama a função de ajuste de tamanho da página quando a página é carregada
  window.addEventListener('load', function() {
    adjustPageSize();
  });