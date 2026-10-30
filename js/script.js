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

async function pesquisaPorCategoria(categoria) {
  return filmesSalvos.filter(filme => filme.genre.toLowerCase().includes(categoria.toLowerCase()));
}

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
    
      categorias.forEach(b => b.classList.remove('ativa'));
      
      const resultado = buscarPorNome(filmesSalvos, nome);
      renderizarFilmes(resultado);
    });

  } catch (error) {
    console.error('Ocorreu um erro:', error);
  }
}

carregarFilmes();

window.adicionarFavorito = function (event, filmeId) {
  if (event) {
    event.stopPropagation();
  }
  
  alternarFavorito(filmeId);

  const abaAtiva = document.querySelector('.categoria.ativa');
  if (abaAtiva) {
    abaAtiva.click();
  } else {
    renderizarFilmes(filmesSalvos);
  }
};

categorias.forEach(botao => {
  botao.addEventListener('click', async () => {
    categorias.forEach(b => b.classList.remove('ativa'));
    botao.classList.add('ativa');

    const categoriaSelecionada = botao.textContent.trim();

    if (categoriaSelecionada === 'Todos') {
      await renderizarFilmes(filmesSalvos);

    } else if (categoriaSelecionada === 'Ação') {
      const resultado = await pesquisaPorCategoria('action');
      await renderizarFilmes(resultado);

    } else if (categoriaSelecionada === "Comédia") {
      const resultado = await pesquisaPorCategoria('comedy');
      await renderizarFilmes(resultado);

    } else if (categoriaSelecionada === 'Drama') {
      const resultado = await pesquisaPorCategoria('drama');
      await renderizarFilmes(resultado);

    } else if (categoriaSelecionada === 'Favoritos') {
      const listaFavs = filmesSalvos.filter(f => ehFavorito(f.id));
      await renderizarFilmes(listaFavs);
    }
  });
});

window.abrirDetalhes = function (id) {
  window.location.href = `detalhes.html?id=${id}`;
};

// TESTA O FILTRO DE PESQUISA POR QUE NÃO PARECE FUNCIONAR CORRETAMENTE
