const fs = require('fs').promises;

async function readOrCreate(filePath, defaultContent='Hello Node.js'){
    try {
        const data = await fs.readFile(filePath, 'utf8');
        console.log('File content:', data);
    } catch(err){
        if(err.code === 'ENOENT'){
            console.log('File not found, creating it...');
            await fs.writeFile(filePath, defaultContent);
        } else {
            console.error('Error:', err);
        }
    }
}

// To handle multiple files in parallel
async function handleMultipleFiles(filePaths){
    const tasks = filePaths.map(path => readOrCreate(path));
    await Promise.all(tasks);
}
handleMultipleFiles(['data1.txt', 'data2.txt', 'data3.txt']);
/**
 * This code defines a function `readOrCreate` that attempts to read a file at the specified path.
 * If the file does not exist, it creates the file with default content.
 * The function uses async/await for handling asynchronous file operations with Promises.
 * The `handleMultipleFiles` function demonstrates how to process multiple files in parallel using `Promise.all`.
 * This approach ensures that all file operations are initiated simultaneously, improving efficiency when dealing with multiple files.
 * more about fs.promises: https://nodejs.org/api/fs.html#fs_fs_promises_api
 * more about async/await: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await
 * more about Promise.all: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
 * more about error handling in async functions: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function#error_handling
 * more about file system errors: https://nodejs.org/api/errors.html#errors_common_system_errors
 */

//async function always returns a Promise
//await can only be used inside async functions
//fs.promises methods return Promises
//fs.promises.readFile, fs.promises.writeFile
//Promise.all waits for all Promises to resolve or any to reject