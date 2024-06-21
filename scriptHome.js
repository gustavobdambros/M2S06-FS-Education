document.addEventListener("DOMContentLoaded", () => {
  const aluno = JSON.parse(localStorage.getItem("aluno"));

  if (aluno) {
    document.getElementById("nome-aluno").textContent = "Nome: " + aluno.nome;
    document.getElementById("idade-aluno").textContent =
      "Idade: " + aluno.idade;
    document.getElementById("serie-aluno").textContent =
      "Série: " + aluno.serie;
    document.getElementById("escola-aluno").textContent =
      "Escola: " + aluno.escola;
    document.getElementById("materia-preferida").textContent =
      "Matéria preferida: " + aluno.materia;
  }

  // Inicialize a array de médias com a média inicial
  mediaMaterias = [...document.querySelectorAll("#tabela-body tr")].map(
    (tr) => {
      const media = parseFloat(tr.cells[5].textContent);
      return !isNaN(media) ? media : 0;
    }
  );

  atualizarMediaGeral();
});

document.getElementById("add-linha").addEventListener("click", () => {
  adicionarLinha();
  atualizarMediaGeral();

  const maiorMedia = encontrarMaiorMedia(mediaMaterias);
  document.getElementById(
    "maior-media"
  ).textContent = `A maior média entre as matérias é: ${maiorMedia}`;
});

let mediaMaterias = [];

function adicionarLinha() {
  const materia = prompt("Qual a matéria deseja cadastrar?");
  if (!materia) return;

  const notas = [];
  let i = 0;

  while (i < 4) {
    const nota = parseFloat(prompt(`Digite a nota ${i + 1} para ${materia}:`));
    if (!isNaN(nota) && nota >= 0 && nota <= 10) {
      notas.push(nota);
      i++;
    } else {
      alert("Insira um número válido.");
    }
  }

  const media = calcularMedia(notas);
  mediaMaterias.push(parseFloat(media));
  adicionarLinhaTabela(materia, notas, media);
}

function calcularMedia(notas) {
  const soma = notas.reduce((acc, nota) => acc + nota, 0);
  return (soma / notas.length).toFixed(2);
}

function adicionarLinhaTabela(materia, notas, media) {
  const tbody = document.querySelector("tbody");
  tbody.innerHTML += `
      <tr>
          <td>${materia}</td>
          <td>${notas[0]}</td>
          <td>${notas[1]}</td>
          <td>${notas[2]}</td>
          <td>${notas[3]}</td>
          <td>${media}</td>
      </tr>
  `;
}

function encontrarMaiorMedia(medias) {
  if (medias.length === 0) {
    return null;
  }

  let maiorMedia = medias[0];

  for (let i = 1; i < medias.length; i++) {
    if (medias[i] > maiorMedia) {
      maiorMedia = medias[i];
    }
  }

  return maiorMedia;
}

function atualizarMediaGeral() {
  const mediaGeral = calcularMedia(mediaMaterias);
  document.getElementById(
    "media-geral"
  ).textContent = `A média geral do aluno é: ${mediaGeral}`;
}

function calcularMedia(medias) {
  const soma = medias.reduce((acc, media) => acc + media, 0);
  return (soma / medias.length).toFixed(2);
}
