const fs = require('fs').promises;
const path = require('path');
const filePath = path.join(__dirname, '../data/users.json');

async function readUsers() {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    if (err.code === 'ENOENT') {
      await fs.writeFile(filePath, JSON.stringify([]));
      return [];
    }
    throw err;
  }
}

async function writeUsers(users) {
  await fs.writeFile(filePath, JSON.stringify(users, null, 2));
}

exports.findAll = async () => await readUsers();

exports.findById = async (id) => {
  const users = await readUsers();
  return users.find((u) => u.id === id);
};

exports.create = async (user) => {
  const users = await readUsers();
  users.push(user);
  await writeUsers(users);
  return user;
};
