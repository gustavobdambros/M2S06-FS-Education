document.getElementById("cep").addEventListener("blur", function () {
  const cep = this.value.replace(/\D/g, "");
  if (cep.length === 8) {
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((response) => response.json())
      .then((data) => {
        if (!data.erro) {
          document.getElementById("rua").value = data.logradouro;
          document.getElementById("cidade").value = data.localidade;
          document.getElementById("estado").value = data.uf;
        } else {
          alert("CEP não encontrado.");
          document.getElementById("rua").value = "";
          document.getElementById("cidade").value = "";
          document.getElementById("estado").value = "";
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar o CEP:", error);
        alert("Erro ao buscar o CEP.");
      });
  } else {
    alert("CEP inválido.");
  }
});

document
  .getElementById("cadastroForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const idade = document.getElementById("idade").value;
    const serie = document.getElementById("serie").value;
    const escola = document.getElementById("escola").value;
    const materia = document.getElementById("materia").value;
    const cep = document.getElementById("cep").value;
    const rua = document.getElementById("rua").value;
    const cidade = document.getElementById("cidade").value;
    const estado = document.getElementById("estado").value;

    const aluno = {
      nome,
      idade,
      serie,
      escola,
      materia,
      cep,
      rua,
      cidade,
      estado,
    };

    localStorage.setItem("aluno", JSON.stringify(aluno));

    // Redirecionar para a tela de home do aluno
    window.location.href = "home.html"; // substitua 'home.html' pelo nome correto da sua página de home do aluno
  });
