const repo = require("../repositories/userRepository");

exports.listUsers = () => repo.findAll();
exports.findUserById = (id) => repo.findById(id);
exports.addUser = (user) => repo.create(user);
