require('dotenv').config({path: './Day4/dev.env'});

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';
console.log('Server running on', PORT, 'in', NODE_ENV, 'mode');