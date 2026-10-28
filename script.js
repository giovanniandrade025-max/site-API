/* ==========================================================================
   TRABALHO DE PROGRAMAÇÃO WEB - CATÁLOGO DE FILMES
   ==========================================================================
   ESTRUTURA DE INSTRUÇÕES PARA O ARQUIVO SCRIPT.JS

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
// - Declarar um array global para armazenar os produtos carregados da API.
// - Declarar um array global para os favoritos, inicializando-o com os dados
//   recuperados do localStorage (usando JSON.parse). Caso não existam dados,
//   inicializar com um array vazio [].


// ==========================================================================
// 2. MAPEAMENTO DOS ELEMENTOS DO DOM
// ==========================================================================
// - Obter referências para os elementos do HTML utilizando document.getElementById:
//   * Contêiner do grid de produtos (#grid-filmes)
//   * Formulário de pesquisa (#form-pesquisa)
//   * Campo de texto de entrada da pesquisa (#input-pesquisa)
//   * Contêiner dos botões de categoria (#container-categorias)
//   * Modal de detalhes (#modal-detalhes)
//   * Botão de fechar o modal (#btn-fechar-modal)
//   * Contêiner das informações do produto no modal (#detalhes-produto)


// ==========================================================================
// 3. REQUISIÇÃO HTTP E CONSUMO DA API (Async/Await & Fetch API)
// ==========================================================================
// - Criar uma função assíncrona para buscar os dados da API pública.
// - Instruções internas da função:
//   1. Definir a URL da API pública (ex: FakeStore API ou TVMaze API).
//   2. Utilizar o bloco try...catch para tratamento de erros.
//   3. Dentro do try, realizar a chamada com `await fetch(URL)`.
//   4. Validar se a resposta foi bem-sucedida (propriedade response.ok).
//   5. Converter a resposta para objeto JavaScript usando `await response.json()`.
//   6. Armazenar o resultado no array global de produtos.
//   7. Chamar a função de renderização passando o array de produtos.
//   8. No bloco catch, capturar eventuais erros de rede ou processamento e
//      exibir uma mensagem amigável no DOM para o usuário.


// ==========================================================================
// 4. CRIAÇÃO DINÂMICA DE ELEMENTOS NO DOM
// ==========================================================================
// - Criar uma função responsável por desenhar/renderizar os produtos na tela.
// - Instruções internas da função:
//   1. Receber como parâmetro a lista de produtos a ser exibida.
//   2. Limpar o conteúdo atual da div do grid (#grid-filmes).
//   3. Se a lista estiver vazia, exibir uma mensagem indicando que nada foi encontrado.
//   4. Percorrer o array de produtos utilizando um laço (forEach ou for...of).
//   5. Para cada produto, verificar se ele já consta no array de favoritos.
//   6. Criar o elemento do card (ex: document.createElement('div')).
//   7. Adicionar as classes CSS necessárias e o atributo data-id com o ID do produto.
//   8. Definir o innerHTML do card contendo a imagem, botão de favorito
//      (com o caractere Unicode ♥), título e categoria.
//   9. Adicionar a classe 'favoritado' ao botão caso o item já esteja salvo.
//   10. Inserir o card criado dentro do grid usando appendChild().


// ==========================================================================
// 5. GERENCIAMENTO DE FAVORITOS (localStorage e JSON)
// ==========================================================================
// - Criar uma função para alternar o status de favorito de um produto.
// - Instruções internas da função:
//   1. Receber o ID do produto e o elemento do botão clicado.
//   2. Localizar o objeto do produto correspondente no array global.
//   3. Verificar se o produto já existe no array de favoritos (usando findIndex ou some).
//   4. Se existir: remover o item do array e retirar a classe visual 'favoritado'.
//   5. Se não existir: criar o objeto do favorito com ID, título, categoria e imagem,
//      adicioná-lo ao array de favoritos e incluir a classe visual 'favoritado'.
//   6. Salvar o array de favoritos atualizado no localStorage utilizando JSON.stringify().


// ==========================================================================
// 6. MANIPULAÇÃO DE EVENTOS
// ==========================================================================

// 6.1 Evento de Formulário (Pesquisa)
// - Adicionar um ouvinte do evento 'submit' no formulário de pesquisa.
// - Instruções:
//   1. Prevenir o comportamento padrão do formulário com event.preventDefault().
//   2. Capturar o texto digitado no input e converter para minúsculas.
//   3. Filtrar o array global de produtos (usando .filter) buscando correspondência no título.
//   4. Chamar a função de renderização passando o array filtrado.

// 6.2 Evento de Filtro por Categoria
// - Adicionar um ouvinte do evento 'click' no contêiner de categorias.
// - Instruções:
//   1. Verificar se o elemento clicado possui a classe 'categoria'.
//   2. Atualizar a classe 'ativa' para destacar o botão selecionado.
//   3. Obter o texto da categoria do botão clicado.
//   4. Se for "Todos", renderizar a lista completa de produtos.
//   5. Caso contrário, filtrar o array global pela categoria correspondente e renderizar.

// 6.3 Evento de Clique nos Cards (Delegação de Eventos)
// - Adicionar um ouvinte do evento 'click' no grid de produtos (#grid-filmes).
// - Instruções:
//   1. Identificar se o clique ocorreu no botão de favorito (.btn-favorito).
//   2. Se sim: interromper a propagação do evento (event.stopPropagation()) e chamar
//      a função de alternar favorito passando o ID do produto.
//   3. Se o clique foi no restante do card: extrair o ID do produto e disparar
//      a função para abrir o modal de detalhes.


// ==========================================================================
// 7. MODAL DE DETALHES
// ==========================================================================
// - Criar uma função para abrir o modal com as informações detalhadas do produto.
// - Instruções:
//   1. Buscar as informações completas do produto no array global usando o ID.
//   2. Injetar o HTML com imagem, título, categoria, preço e descrição detalhada no modal.
//   3. Alterar a propriedade de exibição do modal para 'flex'.

// - Adicionar ouvintes de evento para fechar o modal:
//   1. Evento de clique no botão de fechar (#btn-fechar-modal) que altera o display para 'none'.
//   2. Evento de clique no fundo escuro do modal (fora do conteúdo) para também fechar.


// ==========================================================================
// 8. INICIALIZAÇÃO
// ==========================================================================
// - Adicionar um ouvinte do evento 'DOMContentLoaded' no objeto document para
//   executar a função de carregar os produtos assim que a página for carregada.