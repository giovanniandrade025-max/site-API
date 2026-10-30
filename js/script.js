import { ehFavorito, alternarFavorito } from './favoritos.js';
import { buscarPorNome, inicializarBusca } from './busca.js';

const url = 'https://fooapi.com/api/movies';
const filmes = document.querySelector('.grid-filmes');
const categorias = document.querySelectorAll('.categoria');
let filmesSalvos = [];

async function renderizarFilmes(lista) {
  filmes.innerHTML = '';
  if (lista.length === 0) {
    filmes.innerHTML = '<p>Nenhum filme encontrado para esta categoria.</p>';
    return;
  }

  lista.forEach(filme => {
    const eFav = ehFavorito(filme.id);
    const cardHTML = `
      <div class="card-filme" onclick="abrirDetalhes('${filme.id}')">
        <img src="${filme.poster}" alt="${filme.title}" onerror="this.src='style/images/sem-poster.png'">
        <div class="info-filme">
          <h3>${filme.title}</h3>
          <p>Duração: ${filme.runtime}</p>
          <p>Gênero: ${filme.genre}</p>
          <p>Nota IMDB: ${filme.imdbRating}</p>
          <button class="btn-favorito" onclick="adicionarFavorito(event, '${filme.id}')">
            ${eFav ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          </button>
        </div>
      </div>
    `;
    filmes.innerHTML += cardHTML;
  });
}

function obterFilmesDaCategoriaAtiva() {
  const abaAtiva = document.querySelector('.categoria.ativa')?.textContent.trim() || 'Todos';

  if (abaAtiva === 'Ação') {
    return filmesSalvos.filter(f => f.genre.toLowerCase().includes('action'));
  } else if (abaAtiva === 'Comédia') {
    return filmesSalvos.filter(f => f.genre.toLowerCase().includes('comedy'));
  } else if (abaAtiva === 'Drama') {
    return filmesSalvos.filter(f => f.genre.toLowerCase().includes('drama'));
  } else if (abaAtiva === 'Favoritos') {
    return filmesSalvos.filter(f => ehFavorito(f.id));
  }
  return filmesSalvos;
}

async function aplicarFiltros(termo = '') {
  const listaCategoria = obterFilmesDaCategoriaAtiva();
  const inputPesquisa = document.getElementById('input-pesquisa');
  const textoBusca = termo || inputPesquisa?.value || '';

  const resultado = buscarPorNome(listaCategoria, textoBusca);
  await renderizarFilmes(resultado);
}

filmes.innerHTML = '<p>Carregando filmes...</p>';

async function carregarFilmes() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Erro ao encontrar o filme');
    }
    const data = await response.json();
    filmesSalvos = data.data;
    await renderizarFilmes(filmesSalvos);

    inicializarBusca((nome) => {
      aplicarFiltros(nome);
    });

  } catch (error) {
    filmes.innerHTML = '<p class="erro">Não foi possível carregar os filmes. Tente novamente mais tarde.</p>';
    console.error('Ocorreu um erro:', error);
  }
}

carregarFilmes();

window.adicionarFavorito = function (event, filmeId) {
  if (event) {
    event.stopPropagation();
  }
  
  alternarFavorito(filmeId);
  aplicarFiltros();
};

categorias.forEach(botao => {
  botao.addEventListener('click', async () => {
    categorias.forEach(b => b.classList.remove('ativa'));
    botao.classList.add('ativa');

    await aplicarFiltros();
  });
});

window.abrirDetalhes = function (id) {
  window.location.href = `detalhes.html?id=${id}`;
};