/* ==========================================================================
   TRABALHO DE PROGRAMAÇÃO WEB - CATÁLOGO DE FILMES
   ==========================================================================
   REQUISITOS A CUMPRIR:
   1. Consumir uma API pública usando fetch() com async/await (método GET).
   2. Tratar respostas HTTP e erros de rede.
   3. Manipular elementos do DOM e criar cards/elementos dinamicamente.
   4. Implementar eventos de clique e evento de submissão de formulário.
   5. Gerenciar array de objetos (favoritos) e persistir dados no localStorage.
   ========================================================================== */

// ==========================================================================
// 1. ESTADO DA APLICAÇÃO E VARIÁVEIS GLOBAIS
// ==========================================================================
let todosFilmes = [];
let favoritos = JSON.parse(localStorage.getItem("meusFavoritos")) || [];

// URL base da sua API
const API_URL = 'https://fooapi.com/api/movies';


// ==========================================================================
// 2. MAPEAMENTO DOS ELEMENTOS DO DOM
// ==========================================================================
const gridFilmes = document.getElementById("grid-filmes");
const formPesquisa = document.getElementById("form-pesquisa");
const inputPesquisa = document.getElementById("input-pesquisa");
const containerCategorias = document.getElementById("container-categorias");
const modalDetalhes = document.getElementById("modal-detalhes");
const btnFecharModal = document.getElementById("btn-fechar-modal");
const detalhesProdutoContainer = document.getElementById("detalhes-produto");
const gridFavoritos = document.getElementById("grid-favoritos");
const mensagemFavoritosVazia = document.getElementById("mensagem-favoritos-vazia");


// ==========================================================================
// 3. REQUISIÇÃO HTTP E CONSUMO DA API (Async/Await & Fetch API)
// ==========================================================================
async function carregarFilmesAPI() {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error('Erro ao buscar o catálogo de filmes');
    }

    const json = await response.json();

    // Armazena os dados retornados no array global
    todosFilmes = json.data || json;

    // Desenha os filmes na tela principal
    renderizarFilmes(todosFilmes);

  } catch (error) {
    console.error('Ocorreu um erro:', error);
    if (gridFilmes) {
      gridFilmes.innerHTML = `<p class="mensagem-vazia">Erro ao carregar o catálogo de filmes.</p>`;
    }
  }
}


// ==========================================================================
// 4. CRIAÇÃO DINÂMICA DE ELEMENTOS NO DOM
// ==========================================================================
function renderizarFilmes(lista) {
  if (!gridFilmes) return;
  gridFilmes.innerHTML = "";

  if (lista.length === 0) {
    gridFilmes.innerHTML = `<p class="mensagem-vazia">Nenhum filme encontrado.</p>`;
    return;
  }

  lista.forEach((filme) => {
    const ehFavorito = favoritos.some((fav) => fav.id === filme.id);

    const card = document.createElement("div");
    card.classList.add("card-filme");
    card.setAttribute("data-id", filme.id);

    card.innerHTML = `
      <div class="poster-box">
        <img src="${filme.poster || filme.image || 'https://via.placeholder.com/300x450'}" alt="${filme.title}" />
        <button class="btn-favorito ${ehFavorito ? 'favoritado' : ''}" aria-label="Favoritar">&#9829;</button>
      </div>
      <div class="info-filme">
        <h3 class="titulo-filme">${filme.title}</h3>
        <p class="genero-filme">${filme.genre || filme.category || 'Geral'}</p>
      </div>
    `;

    gridFilmes.appendChild(card);
  });
}


// ==========================================================================
// 5. GERENCIAMENTO DE FAVORITOS (localStorage & Renderização no Footer)
// ==========================================================================
function renderizarFavoritos() {
  if (!gridFavoritos) return;
  gridFavoritos.innerHTML = "";

  if (favoritos.length === 0) {
    if (mensagemFavoritosVazia) mensagemFavoritosVazia.style.display = "block";
    return;
  }

  if (mensagemFavoritosVazia) mensagemFavoritosVazia.style.display = "none";

  favoritos.forEach((filme) => {
    const card = document.createElement("div");
    card.classList.add("card-filme");
    card.setAttribute("data-id", filme.id);

    card.innerHTML = `
      <div class="poster-box">
        <img src="${filme.poster || filme.image || 'https://via.placeholder.com/300x450'}" alt="${filme.title}" />
        <button class="btn-favorito favoritado" aria-label="Remover favorito">&#9829;</button>
      </div>
      <div class="info-filme">
        <h3 class="titulo-filme">${filme.title}</h3>
        <p class="genero-filme">${filme.genre || filme.category || 'Geral'}</p>
      </div>
    `;

    gridFavoritos.appendChild(card);
  });
}

function alternarFavorito(idFilme) {
  const filmeSelecionado = todosFilmes.find((item) => item.id == idFilme) || favoritos.find((item) => item.id == idFilme);
  if (!filmeSelecionado) return;

  const index = favoritos.findIndex((item) => item.id == idFilme);

  if (index > -1) {
    favoritos.splice(index, 1);
  } else {
    favoritos.push(filmeSelecionado);
  }

  localStorage.setItem("meusFavoritos", JSON.stringify(favoritos));

  // Atualiza as listas na tela
  renderizarFilmes(todosFilmes);
  renderizarFavoritos();
}


// ==========================================================================
// 6. MANIPULAÇÃO DE EVENTOS
// ==========================================================================

// 6.1 Evento do Formulário de Pesquisa
if (formPesquisa) {
  formPesquisa.addEventListener("submit", (e) => {
    e.preventDefault();
    const termo = inputPesquisa.value.toLowerCase().trim();

    const filtrados = todosFilmes.filter((filme) =>
      filme.title.toLowerCase().includes(termo)
    );

    renderizarFilmes(filtrados);
  });
}

// 6.2 Evento de Filtro por Categoria
if (containerCategorias) {
  containerCategorias.addEventListener("click", (e) => {
    if (!e.target.classList.contains("categoria")) return;

    document.querySelectorAll(".categoria").forEach((btn) => btn.classList.remove("ativa"));
    e.target.classList.add("ativa");

    const categoria = e.target.textContent.toLowerCase().trim();

    if (categoria === "todos") {
      renderizarFilmes(todosFilmes);
    } else {
      const filtrados = todosFilmes.filter((filme) => {
        const cat = (filme.genre || filme.category || "").toLowerCase();
        return cat.includes(categoria);
      });
      renderizarFilmes(filtrados);
    }
  });
}

// 6.3 Clique nos Cards do Catálogo Principal
if (gridFilmes) {
  gridFilmes.addEventListener("click", (e) => {
    const btnFavorito = e.target.closest(".btn-favorito");
    const card = e.target.closest(".card-filme");

    if (!card) return;
    const id = card.getAttribute("data-id");

    if (btnFavorito) {
      e.stopPropagation();
      alternarFavorito(id);
    } else {
      abrirModalDetalhes(id);
    }
  });
}

// 6.4 Clique nos Cards do Footer de Favoritos
if (gridFavoritos) {
  gridFavoritos.addEventListener("click", (e) => {
    const btnFavorito = e.target.closest(".btn-favorito");
    const card = e.target.closest(".card-filme");

    if (!card) return;
    const id = card.getAttribute("data-id");

    if (btnFavorito) {
      e.stopPropagation();
      alternarFavorito(id);
    } else {
      abrirModalDetalhes(id);
    }
  });
}


// ==========================================================================
// 7. MODAL DE DETALHES
// ==========================================================================
function abrirModalDetalhes(idFilme) {
  const filme = todosFilmes.find((item) => item.id == idFilme) || favoritos.find((item) => item.id == idFilme);
  if (!filme || !detalhesProdutoContainer || !modalDetalhes) return;

  detalhesProdutoContainer.innerHTML = `
    <div class="detalhes-layout">
      <img class="detalhes-imagem" src="${filme.poster || filme.image || 'https://via.placeholder.com/300x450'}" alt="${filme.title}" />
      <div class="detalhes-info">
        <h2>${filme.title}</h2>
        <p><strong>Duração:</strong> ${filme.runtime || 'N/I'}</p>
        <p><strong>Lançamento:</strong> ${filme.release_date || 'N/I'}</p>
        <p>${filme.overview || filme.description || 'Sem sinopse disponível.'}</p>
      </div>
    </div>
  `;

  modalDetalhes.style.display = "flex";
}

if (btnFecharModal) {
  btnFecharModal.addEventListener("click", () => {
    modalDetalhes.style.display = "none";
  });
}

window.addEventListener("click", (e) => {
  if (e.target === modalDetalhes) {
    modalDetalhes.style.display = "none";
  }
});


// ==========================================================================
// 8. INICIALIZAÇÃO DA APLICAÇÃO
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  carregarFilmesAPI();
  renderizarFavoritos();
});