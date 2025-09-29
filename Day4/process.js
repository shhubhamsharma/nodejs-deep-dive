/**
| Property/Method                | Description               | Example                        |
| ------------------------------ | ------------------------- | ------------------------------ |
| `process.pid`                  | Current process ID        | `12345`                        |
| `process.version`              | Node.js version           | `'v20.1.0'`                    |
| `process.cwd()`                | Current working directory | `/Users/me/project`            |
| `process.argv`                 | CLI args                  | `['node', 'index.js', 'arg1']` |
| `process.env`                  | Environment variables     | `process.env.NODE_ENV`         |
| `process.exit([code])`         | Exit process with code    | `process.exit(1)`              |
| `process.on('exit', callback)` | Handle exit               | log before process exits       |

 */
const process = require('process');

process.on('exit', (code) => {
    console.log(`Process exiting with code: ${code}`);
});
console.log('Process ID:', process.pid);
console.log('Node.js Version:', process.version);
console.log('Current Working Directory:', process.cwd());
// Uncomment the next line to test process exit
// process.exit(1); // Exit with code 1

console.log('Command Line Arguments:', process.argv);
console.log('Environment Variables:', process.env);


/**
 * 
 * 
 * This code demonstrates the use of the Node.js process module to access and log various properties and methods related to the current Node.js process.
 * It retrieves and displays the process ID, Node.js version, current working directory, command line arguments, and environment variables.
 * Additionally, it sets up an event listener for the 'exit' event to log a message just before the process exits.
 * The process module provides a way to interact with the current Node.js process, allowing developers to manage and monitor the execution environment effectively.
 * * Uncommenting the process.exit(1) line will terminate the process with an exit code of 1, triggering the exit event listener.   
 *  
 * 
 */

// Nodejs can listend to various OS signals like SIGINT,SIGTERM
process.on('SIGINT', () => {
    console.log('Received SIGINT. Exiting gracefully...');
    process.exit(0);
}
);
process.on('SIGTERM', () => {
    console.log('Received SIGTERM. Exiting gracefully...');
    process.exit(0);
});

//Graceful Shutdown / Cleanup

process.on('exit', (code) => {
    console.log(`Process exiting with code ${code}`);
    // Close DB connections, write logs, etc.
});

// Example async cleanup
async function cleanup() {
    console.log('Cleaning resources...');
    await new Promise(res => setTimeout(res, 1000));
    console.log('Cleanup done');
    process.exit(0);
}

process.on('SIGINT', cleanup);

setInterval(() => {
    console.log('Running... Press Ctrl+C to exit.');
}, 5000);
// To test, run the script and press Ctrl+C to send SIGINT or use `kill` command to send SIGTERM