const url = 'https://fooapi.com/api/movies';

fetch(url + '/1')
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro ao encontrar o filme');
    }
    return response.json();
  })
  .then(data => {
    console.log(data.data.title, data.data.runtime, data.data.release_date);
    
  })
  .catch(error => {
    console.error('Ocorreu um erro:', error);
  });