// Função para buscar livros de Stephen King na API do Google Books
async function searchBooksByStephenKing() {
    const author = "Stephen King";
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=inauthor:${author}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Erro ao buscar os livros de Stephen King');
        }
        const data = await response.json();
        const books = data.items;
        displayBooksCatalog(books);
    } catch (error) {
        console.error('Erro:', error);
    }
}

// Função para exibir o catálogo de livros na página
function displayBooksCatalog(books) {
    const catalogContainer = document.getElementById('catalog-container');
    catalogContainer.innerHTML = ''; // Limpa o conteúdo anterior

    books.forEach(book => {
        const title = book.volumeInfo.title;
        const description = book.volumeInfo.description || 'Sem descrição disponível';
        const thumbnail = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : 'Sem imagem';
        
        // Criar elemento HTML para exibir o livro
        const bookElement = document.createElement('div');
        bookElement.classList.add('book');
        bookElement.innerHTML = `
            <img src="${thumbnail}" alt="Capa do Livro">
            <h2>${title}</h2>
            <p>${description}</p>
        `;

        catalogContainer.appendChild(bookElement);
    });
}

// Chamada da função principal
searchBooksByStephenKing();
