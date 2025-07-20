const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (isValid(username)) {
    return res.status(400).json({message: "User already exists!"});
  }
  users.push({"username": username, "password": password});
  return res.status(200).json({message: "User successfully registered. Now you can login."});

});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  return res.status(200).json(books);
});


// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  if(!books[isbn]){
    return res.status(404).json({message: "Book not found"});
  }
  return res.status(200).json(books[isbn]);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
  const booksByAuthor = [];
  for (const isbn in books) {
    if (books[isbn].author === author) {
      booksByAuthor.push(books[isbn]);
    }
  }
  return res.status(200).json(booksByAuthor);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;
  const booksByTitle = [];
  for (const isbn in books) {
    if (books[isbn].title === title) {
      booksByTitle.push(books[isbn]);
    }
  }
  return res.status(200).json(booksByTitle);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  if(!books[isbn]){
    return res.status(404).json({message: "Book not found"});
  }
  return res.status(200).json(books[isbn].reviews);
});

module.exports.general = public_users;
