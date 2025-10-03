const userController = require("../controllers/userController");
const url=require('url');
function routes(req, res,id=null) {
  const baseUrl = url.parse(req?.url,true);

  if (req.url === "/users" && req.method === "GET") {
    console.log(req)
    return userController.getUsers(req, res);
  }
  if(req.url.startsWith('/users/') && req.method==='GET'){
    return userController.getUserById(req,res,id)
  }
}

module.exports = routes;
