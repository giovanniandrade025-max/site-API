export function buscarPorNome(filmes, termo) {
  if (!termo || termo.trim() === '') {
    return filmes;
  }
  
  const termoFormatado = termo.toLowerCase().trim();
  
  return filmes.filter(filme => 
    filme.title && filme.title.toLowerCase().includes(termoFormatado)
  );
}

export function inicializarBusca(aoBuscar) {
  const formPesquisa = document.getElementById('form-pesquisa');
  const inputPesquisa = document.getElementById('input-pesquisa');

  if (!formPesquisa || !inputPesquisa) return;

  formPesquisa.addEventListener('submit', (event) => {
    event.preventDefault();
    aoBuscar(inputPesquisa.value);
  });

  inputPesquisa.addEventListener('input', () => {
    aoBuscar(inputPesquisa.value);
  });
}