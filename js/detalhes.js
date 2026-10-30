const url = 'https://fooapi.com/api/movies';

const parametros = new URLSearchParams(window.location.search);
const id = parametros.get('id');

fetch(url)
    .then(response => response.json())
    .then(data => {

        const filme = data.data.find(filme => filme.id == id);

        document.getElementById('detalhes-filme').innerHTML = `
            <div class="cartao-filme">
                <img src="${filme.poster}" alt="${filme.title}">

                <div class="info-filme">

                    <h1>${filme.title} (${filme.year})</h1>

                    <p>${filme.runtime} | ${filme.genre} | ${filme.imdbRating}</p>
                    <p class="sinopse">${filme.plot}</p>
                    <p><strong>Direção:</strong> ${filme.director}</p>
                    <p><strong>Elenco:</strong> ${filme.actors}</p>
                    <p><strong>Prêmios:</strong> ${filme.awards}</p>
                     <button class="btn-favorito" onclick="adicionarFavorito('${filme.id}')">
            Adicionar aos favoritos
          </button>
                </div>
            </div>
        `;
    });