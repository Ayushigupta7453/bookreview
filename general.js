const express = require('express');
//let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


let users1 = [
    {
        isbn : "1",
        author: "XChinua Achebe",
        title:"Things Fall Apart",
        reviews:"Goood movie",
    },
    {
        isbn : "2",
        author: "Hans Christian Andersen",
        title:"Things Fall Apart",
        reviews:"22-01-1990",
    },
    {
        isbn : "3",
        author: "Dante Alighieri",
        title:"The Divine Comedy",
        reviews:"five stars",
    },
    {
        isbn : "4",
        author: "Unknown",
        title:"The Epic Of Gilgamesh",
        reviews:"Very nice book",
    },
    {
        isbn : "5",
        author: "Unknown",
        title:"The Book Of Job",
        reviews:"Very nice book",
    },
];





// Get the book list available in the shop
public_users.get('/all',function (req, res) {
  //Write your code here
  //return res.status(300).json({message: "pooooo"});
  return res.send(JSON.stringify(users1))


});

public_users.get("/author/:author",(req,res)=>{
    const author = req.params.author;
    let filtered_users = users1.filter((user) => user.author === author);
    res.send(filtered_users);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    let filtered_users = users1.filter((user) => user.isbn === isbn);
    res.send(filtered_users);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const author = req.params.author;
    let filtered_users = users1.filter((user) => user.author === author);
    res.send(filtered_users);
  
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;
    let filtered_users = users1.filter((user) => user.title === title);
    res.send(filtered_users);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    let filtered_users = users1.filter((user) => user.isbn === isbn);
    res.send(filtered_users);
});

module.exports.general = public_users;
