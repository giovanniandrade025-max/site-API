import { ehFavorito, alternarFavorito } from './favoritos.js';

const url = 'https://fooapi.com/api/movies';
const parametros = new URLSearchParams(window.location.search);
const id = parametros.get('id');

fetch(url)
    .then(response => response.json())
    .then(data => {
        const filme = data.data.find(filme => filme.id == id);

        if (!filme) {
            document.getElementById('detalhes-filme').innerHTML = '<p>Filme não encontrado.</p>';
            return;
        }

        document.getElementById('detalhes-filme').innerHTML = `
      <div class="cartao-filme">
        <img src="${filme.poster}" alt="${filme.title}" onerror="this.src='style/images/sem-poster.png'">
        <div class="info-filme">
          <h1>${filme.title} (${filme.year})</h1>
          <p>${filme.runtime} | ${filme.genre} | ${filme.imdbRating}</p>
          <p class="sinopse">${filme.plot}</p>
          <p><strong>Direção:</strong> ${filme.director}</p>
          <p><strong>Elenco:</strong> ${filme.actors}</p>
          <p><strong>Prêmios:</strong> ${filme.awards}</p>
          <button id="btn-fav" class="btn-favorito" onclick="adicionarFavorito('${filme.id}')">
            ${ehFavorito(filme.id) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          </button>
        </div>
      </div>
    `;
    })
    .catch(error => console.error('Erro ao carregar detalhes:', error));


window.adicionarFavorito = function (filmeId) {
    alternarFavorito(filmeId);
    const btn = document.getElementById('btn-fav');
    if (btn) {
        btn.textContent = ehFavorito(filmeId) ? 'Remover dos favoritos' : 'Adicionar aos favoritos';
    }
};