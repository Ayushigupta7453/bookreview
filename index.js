const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;




const app = express();

app.use(express.json());

app.use(session({secret:"fingerpint"}))

app.use("/customer/auth", function auth(req,res,next){
   if(req.session.authorization) { //get the authorization object stored in the session
       token = req.session.authorization['accessToken']; //retrieve the token from authorization object
       jwt.verify(token, "access",(err,user)=>{ //Use JWT to verify token
           if(!err){
               req.user = user;
               next();
           }
           else{
               return res.status(403).json({message: "User not authenticated"})
           }
        });
    } else {
        return res.status(403).json({message: "User not logged in"})
    }
});





app.get("/auth/get_message", (req,res) => {
  return res.status(200).json({message: "****Hello, You are an authenticated user. Congratulations!"});
})

const PORT =5000;
app.use("/customer", customer_routes);
app.use("/", genl_routes);


app.listen(PORT,()=>console.log("Server is running"));
