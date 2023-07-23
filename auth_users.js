const express = require('express');
const jwt = require('jsonwebtoken');
//const session = require('express-session')
const regd_users = express.Router();
let axios = require('axios');

//Function to check if the user exists
const doesExist = (username)=>{
  let userswithsamename = users.filter((user)=>{
    return user.username === username
  });
  if(userswithsamename.length > 0){
    return true;
  } else {
    return false;
  }
}

//Function to check if the user is authenticated
const authenticatedUser = (username,password)=>{
  let validusers = users.filter((user)=>{
    return (user.username === username && user.password === password)
  });
  if(validusers.length > 0){
    return true;
  } else {
    return false;
  }
}

const isValid = (username)=>{ //returns boolean
    let userswithsamename = users.filter((user)=>{
        return user.username === username
      });
      if(userswithsamename.length > 0){
        return true;
      } else {
        return false;
      }
    }



  // Get the book list available in the shop
  regd_users.get('/auth/all',function (req, res) {
    axios({
        method: 'get',
        url: 'http://localhost:5000/all/',
       
    })
    .then(function (response) {
        console.log(response.data);
        res.send(response.data);
      })
      .catch(function (error) {
        if(error.response){
            let {status, statusText}=error.response;
            console.error(status, statusText);
            res.status(status).send(statusText);
        }
        else{
            res.status(404).send(error);
        }            
        
      });


});  



// Get the book list available in the shop
regd_users.get('/auth/isbn/:isbn/',function (req, res) {
    const isbn = req.params.isbn;
    axios({
        
        method: 'get',
        url: 'http://localhost:5000/isbn/'+isbn,
       
    })
    .then(function (response) {
        console.log(response.data);
        console.log(axios.url);
        res.send(response.data);
      })
      .catch(function (error) {
        if(error.response){
            let {status, statusText}=error.response;
            console.error(status, statusText);
            res.status(status).send(statusText);
        }
        else{
            res.status(404).send(error);
        }            
        
      });


});  




// Get the book list available in the shop
regd_users.get('/auth/author/:author/',function (req, res) {
    const author = req.params.author;
    axios({
        
        method: 'get',
        url: 'http://localhost:5000/author/'+author,
       
    })
    .then(function (response) {
        console.log(response.data);
        console.log(axios.url);
        res.send(response.data);
      })
      .catch(function (error) {
        if(error.response){
            let {status, statusText}=error.response;
            console.error(status, statusText);
            res.status(status).send(statusText);
        }
        else{
            res.status(404).send(error);
        }            
        
      });


});  

// Get the book list available in the shop
regd_users.get('/auth/title/:title/',function (req, res) {
    const title = req.params.title;
    axios({
        
        method: 'get',
        url: 'http://localhost:5000/author/'+title,
       
    })
    .then(function (response) {
        console.log(response.data);
        console.log(axios.url);
        res.send(response.data);
      })
      .catch(function (error) {
        if(error.response){
            let {status, statusText}=error.response;
            console.error(status, statusText);
            res.status(status).send(statusText);
        }
        else{
            res.status(404).send(error);
        }            
        
      });


});  

  


   

regd_users.post("/login", (req,res) => {
  const username = req.query.username;
  const password = req.query.password;

  if (!username || !password) {
      return res.status(404).json({message: "Error logging in"});
  }

  if (authenticatedUser(username,password)) {
    let accessToken = jwt.sign({
      data: password
    }, 'access', { expiresIn: 160 * 60 });

    req.session.authorization = {
      accessToken,username
  }
  return res.status(200).send("User successfully logged in");
  } else {
    return res.status(208).json({message: "Invalid Login. Check username and password"});
  }
});

regd_users.post("/register", (req,res) => {
  const username = req.query.username;
  const password = req.query.password;

  if (username && password) {
    if (!doesExist(username)) { 
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});    
    }
  }
  else{
    if (username=="") {

        return res.status(404).json({message: "User information is null!"}); 

    }
    if (password=="")
    {
        return res.status(404).json({message: "password information is null!"}); 


    }
  } 
  return res.status(404).json({message: "Unable to register user."});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    let filtered_users = users2.filter((user) => user.isbn === isbn);
    if (filtered_users.length > 0) {
        let filtered_user = filtered_users[0];
        let DOB = req.query.DOB;
        //if the DOB has changed
        if(DOB) {
            filtered_user.DOB = DOB
        }
        /*
        Include code here similar to the one above for other attibutes
        */
        users = users2.filter((user) => user.isbn != isbn);
        users.push(filtered_user);
        res.send(`Registry with the isbn  ${isbn} updated.`);
    }
    else{
        res.send("Unable to find isbn!");
    }
  });

//   // Get the book list available in the shop
//   regd_users.get('/auth/all',function (req, res) {
//     //Write your code here
//     //return res.status(300).json({message: "pooooo"});
//     return res.send(JSON.stringify(users2))
  
  
//   });

  regd_users.delete("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    users = users.filter((user) => user.isbn != isbn);
    res.send(`Book with the review  ${isbn} deleted.`);
  });


regd_users.get("/auth/get_message", (req,res) => {
  return res.status(200).json({message: "Hello, You are an authenticated user. Congratulations!"});
})

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
