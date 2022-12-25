function hashPassword(password) {
    // Gera o hash da senha usando o sha-256 duplamente
    var hash = CryptoJS.SHA256(password);
    hash = CryptoJS.SHA256(hash);
    return hash.toString();
  }
  
  // Obtém o campo de senha do formulário
  var passwordField = document.getElementById('password');
  
  // Criptografa a senha quando o formulário é enviado
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    var password = passwordField.value;
    var hashedPassword = hashPassword(password);
    // Faz alguma coisa com a senha criptografada aqui
  });