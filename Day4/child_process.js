//Child process 
const { fork } = require('child_process');
const path = require('path');
const filePath= path.join(__dirname,'child.js');

const child = fork(filePath);

child.on('message', msg => console.log('Message from child:', msg));
child.send({ task: 'process data' });

/**
 * This code demonstrates how to create and manage a child process in Node.js using the `child_process` module.
 * It uses the `fork` method to spawn a new Node.js process that runs the script located at `child.js`.
 * The parent process communicates with the child process by sending and receiving messages using the `send` and `on('message')` methods.
 */

