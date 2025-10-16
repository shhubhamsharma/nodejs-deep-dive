const express= require("express");
const routes = require("../routes/userRoutes");

const app= express();

//Middleware 
app.use(express.json());
app.use("/users",routes);

app.get("/",(req,res)=>{
  res.send("Welcome to User manage ment API")
})

app.use((req,res)=>{
  res.status(404).send({message:"Route not found"})
});

module.exports = app;