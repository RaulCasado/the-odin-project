function saveLibrary() {
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

function loadLibrary() {
    const stored = localStorage.getItem('myLibrary');
    if (stored) {
        const books = JSON.parse(stored);
        return books.map(bookData => {
            const book = new Book(bookData.title, bookData.author, bookData.pages, bookData.read, bookData.image);
            book.id = bookData.id;
            return book;
        });
    }
    return [];
}

let myLibrary = loadLibrary();

function Book(title, author, pages, read, image) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    if (!image)
    {
        this.image = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeJQeJyzgAzTEVqXiGe90RGBFhfp_4RcJJMQ&s';
    }
    else
    {
        this.image = image;
    }
    this.id = crypto.randomUUID();
}

Book.prototype.toggleRead = function() {
    this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read, image) {
    const newBook = new Book(title, author, pages, read, image);
    myLibrary.push(newBook);
    saveLibrary();
    displayBooks();
}

function removeBook(bookId) {
    const index = myLibrary.findIndex(book => book.id === bookId);
    if (index !== -1) {
        myLibrary.splice(index, 1);
        saveLibrary();
        displayBooks();
    }
}

function displayBooks() {
    const container = document.getElementById('library-container');
    container.innerHTML = '';

    myLibrary.forEach(book => {
        const card = document.createElement('div');
        card.className = 'book-card';
        card.dataset.bookId = book.id;

        card.innerHTML = `
            ${book.image ? `<img src="${book.image}" alt="${book.title} cover">` : ''}
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <p>Status: ${book.read ? 'Read' : 'Not Read'}</p>
            <div class="card-buttons">
                <button class="toggle-read">Toggle Read</button>
                <button class="remove">Remove</button>
            </div>
        `;

        card.querySelector('.remove').addEventListener('click', () => removeBook(book.id));
        card.querySelector('.toggle-read').addEventListener('click', () => {
            book.toggleRead();
            saveLibrary();
            displayBooks();
        });

        container.appendChild(card);
    });
}

const form = document.getElementById('new-book-form');
const dialog = document.querySelector('.dialog');

document.querySelector('.btn-show-dialog').addEventListener('click', () => dialog.showModal());
document.querySelector('.btn-close-dialog').addEventListener('click', () => dialog.close());

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;
    const image = document.getElementById('image').value;

    addBookToLibrary(title, author, pages, read, image);
    form.reset();
    dialog.close();
});

displayBooks();
