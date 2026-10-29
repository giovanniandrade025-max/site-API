const url = 'https://fooapi.com/api/movies';
const filmes = document.querySelector('.grid-filmes');
const categorias = document.querySelectorAll('.categoria');
let filmesSalvos = []

function renderizarFilmes(lista) {
  filmes.innerHTML = '';
  if (lista.length === 0) {
    filmes.innerHTML = '<p>Nenhum filme encontrado para esta categoria.</p>';
    return;
  }

  lista.forEach(filme => {
    const cardHTML = `
      <div class ="card-filme">
        <img src="${filme.poster}" alt="${filme.title}" onerror="this.src='images/sem-poster.png'">
        <div class="info-filme">
          <h3>${filme.title}</h3>
          <p>Duração: ${filme.runtime}</p>
          <p>Gênero: ${filme.genre}</p>
          <p>Nota IMDB: ${filme.imdbRating}</p>
          <button class="btn-favorito" onclick="adicionarFavorito('${filme.id}')">
            Adicionar aos favoritos
          </button>
        </div>
      </div>
    `;
    filmes.innerHTML += cardHTML;
  });
}

function pesquisaPorCategoria(categoria) {
  return filmesSalvos.filter(filme => filme.genre.toLowerCase().includes(categoria));
}

fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro ao encontrar o filme');
    }
    return response.json();
  })
  .then(data => {
    filmesSalvos = data.data;
    renderizarFilmes(filmesSalvos);
  })
  .catch(error => {
    console.error('Ocorreu um erro:', error);
  });

categorias.forEach(botao => {
  botao.addEventListener('click', () => {
    categorias.forEach(b => b.classList.remove('ativa'));
    botao.classList.add('ativa');

    const categoriaSelecionada = botao.textContent.trim();

    if (categoriaSelecionada === 'Todos') {
      renderizarFilmes(filmesSalvos);

    } else if (categoriaSelecionada === 'Ação') {
      renderizarFilmes(pesquisaPorCategoria('action'));

    } else if (categoriaSelecionada === "Comédia") {
      renderizarFilmes(pesquisaPorCategoria('comedy'))

    } else if (categoriaSelecionada === 'Drama') {
      renderizarFilmes(pesquisaPorCategoria('drama'))
    }
  });
});

