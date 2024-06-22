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

  if (!localStorage.getItem("notasMaterias")) {
    const dadosIniciais = [
      {
        nome: "Matemática",
        nota1: 8,
        nota2: 9,
        nota3: 7,
        nota4: 6,
      },
      {
        nome: "Português",
        nota1: 7,
        nota2: 6,
        nota3: 8,
        nota4: 9,
      },
      {
        nome: "História",
        nota1: 6,
        nota2: 7,
        nota3: 8,
        nota4: 9,
      },
    ];

    localStorage.setItem("notasMaterias", JSON.stringify(dadosIniciais));
  }

  const dadosIniciais = JSON.parse(localStorage.getItem("notasMaterias"));
  if (dadosIniciais && dadosIniciais.length > 0) {
    const tbody = document.getElementById("tabela-body");
    tbody.innerHTML = "";

    dadosIniciais.forEach((materia) => {
      const notas = [
        materia.nota1,
        materia.nota2,
        materia.nota3,
        materia.nota4,
      ];
      const media = calcularMedia(notas);
      adicionarLinhaTabela(materia.nome, notas, media);
    });

    mediaMaterias = dadosIniciais.map((materia) => {
      const notas = [
        materia.nota1,
        materia.nota2,
        materia.nota3,
        materia.nota4,
      ];
      return parseFloat(calcularMedia(notas));
    });

    atualizarMediaGeral();
    atualizarMaiorMedia();
  }

  // Fetch the list of students from the JSON server
  fetch("http://localhost:3000/alunos")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      const listaAlunos = document.getElementById("lista-alunos");
      listaAlunos.innerHTML = ""; // Clear the list before adding new items

      data.forEach((aluno) => {
        const li = document.createElement("li");
        li.textContent = aluno.nome;
        listaAlunos.appendChild(li);
      });
    })
    .catch((error) =>
      console.error("Erro ao carregar lista de alunos:", error)
    );
});

document.getElementById("add-linha").addEventListener("click", () => {
  adicionarLinha();
  atualizarMediaGeral();
  atualizarMaiorMedia();

  const tbody = document.getElementById("tabela-body");
  const ultimaLinha = tbody.lastChild;
  const materia = ultimaLinha.firstChild.textContent;
  const notas = [
    parseFloat(ultimaLinha.cells[1].textContent),
    parseFloat(ultimaLinha.cells[2].textContent),
    parseFloat(ultimaLinha.cells[3].textContent),
    parseFloat(ultimaLinha.cells[4].textContent),
  ];

  const novaMateria = {
    nome: materia,
    nota1: notas[0],
    nota2: notas[1],
    nota3: notas[2],
    nota4: notas[3],
  };

  const notasMaterias = JSON.parse(localStorage.getItem("notasMaterias"));
  notasMaterias.push(novaMateria);
  localStorage.setItem("notasMaterias", JSON.stringify(notasMaterias));
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

  const novaMateria = {
    nome: materia,
    nota1: notas[0],
    nota2: notas[1],
    nota3: notas[2],
    nota4: notas[3],
  };

  const notasMaterias = JSON.parse(localStorage.getItem("notasMaterias"));
  notasMaterias.push(novaMateria);
  localStorage.setItem("notasMaterias", JSON.stringify(notasMaterias));
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

function atualizarMaiorMedia() {
  const maiorMedia = encontrarMaiorMedia(mediaMaterias);
  document.getElementById(
    "maior-media"
  ).textContent = `A maior média entre as matérias é: ${maiorMedia}`;
}
