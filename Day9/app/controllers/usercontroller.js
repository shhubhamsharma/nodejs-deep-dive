const users = [
  { id: 1, name: 'Amit', email: 'amit@example.com' },
  { id: 2, name: 'Priya', email: 'priya@example.com' },
];

// GET all users
exports.getAllUsers = (req, res) => {
  res.status(200).json(users);
};

// GET user by ID
exports.getUserById = (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.status(200).json(user);
};

// CREATE new user
exports.createUser = (req, res) => {
  const { name, email } = req.body;
  if (!name || !email)
    return res.status(400).json({ message: 'Name and email required' });

  const newUser = {
    id: users.length + 1,
    name,
    email,
  };
  users.push(newUser);
  res.status(201).json(newUser);
};

// UPDATE user
exports.updateUser = (req, res) => {
  const { id } = req.params;
  const user = users.find((u) => u.id === parseInt(id));

  if (!user) return res.status(404).json({ message: 'User not found' });

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  res.status(200).json(user);
};

// DELETE user
exports.deleteUser = (req, res) => {
  const { id } = req.params;
  const index = users.findIndex((u) => u.id === parseInt(id));

  if (index === -1) return res.status(404).json({ message: 'User not found' });

  users.splice(index, 1);
  res.status(200).json({ message: 'User deleted successfully' });
};
