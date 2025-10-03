const userService = require("../services/userService");

exports.getUsers = (req, res) => {
  const users = userService.listUsers();
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(users));
};

exports.getUserById = (req, res,id) => {
  const users = userService.listUsers();
  const user =users.filter(el=>el.id==id)
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(user));
};
