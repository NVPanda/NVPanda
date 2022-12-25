function validatePassword(password) {
  // Valida a senha aqui
  if (password.length < 8) {
    return false;
  }
  if (!password.match(/[a-z]/)) {
    return false;
  }
  if (!password.match(/[\u0080-\uFFFF]/)) {
    return false;
  }
  return true;
}
  
  // Obtém o campo de senha do formulário
  var passwordField = document.getElementById('password');
  
  // Valida a senha quando o formulário é enviado
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    var password = passwordField.value;
    var isValid = validatePassword(password);
    if (!isValid) {
      // Mostra uma mensagem de erro ou faz outra coisa aqui
    } else {
      // Continua com o envio do formulário ou faz outra coisa aqui
    }
  });

  