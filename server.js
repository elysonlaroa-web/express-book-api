// server.js
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// --- MIDDLEWARE ---
// Parse incoming JSON bodies (this replaces the manual chunk collection from Activity 2!)
app.use(express.json());

// Enable CORS (allows frontend apps to talk to this API)
app.use(cors());

// --- IN-MEMORY "DATABASE" ---
let books = [
    { id: 1, title: 'The Hobbit', author: 'J.R.R. Tolkien', year: 1937 },
    { id: 2, title: '1984', author: 'George Orwell', year: 1949 },
    { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960 }
];

let nextId = 4;

// --- ROUTES ---

// GET /api/books - Get all books
app.get('/api/books', (req, res) => {
    res.json(books);
});

// GET /api/books/:id - Get a single book by ID
app.get('/api/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const book = books.find(b => b.id === bookId);

    if (!book) {
        return res.status(404).json({ error: 'Book not found' });
    }

    res.json(book);
});

// POST /api/books - Add a new book
app.post('/api/books', (req, res) => {
    const { title, author, year } = req.body;

    // Validation
    if (!title || !author || !year) {
        return res.status(400).json({ error: 'Title, author, and year are required' });
    }

    const newBook = {
        id: nextId++,
        title,
        author,
        year
    };

    books.push(newBook);

    res.status(201).json({
        message: 'Book created successfully',
        book: newBook
    });
});

// DELETE /api/books/:id - Delete a book by ID
app.delete('/api/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const bookIndex = books.findIndex(b => b.id === bookId);

    if (bookIndex === -1) {
        return res.status(404).json({ error: 'Book not found' });
    }

    const deletedBook = books.splice(bookIndex, 1)[0];

    res.json({
        message: 'Book deleted successfully',
        book: deletedBook
    });
});

// --- START SERVER ---
app.listen(PORT, () => {
    console.log(`🚀 Express server running at http://localhost:${PORT}`);
    console.log('📚 Try these endpoints:');
    console.log(`   GET     http://localhost:${PORT}/api/books`);
    console.log(`   GET     http://localhost:${PORT}/api/books/1`);
    console.log(`   POST    http://localhost:${PORT}/api/books`);
    console.log(`   DELETE  http://localhost:${PORT}/api/books/1`);
});
