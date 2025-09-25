const fs = require('fs').promises;

async function readFile(__filename, encoding = 'utf8') {
    return await fs.readFile(__filename, encoding)
}

async function writeTask(tasks, name, duration, fileName) {
    tasks.push({ name, duration });
    await fs.writeFile(fileName, JSON.stringify(tasks, null, 2));
}

async function handleError(err, name, duration, filename) {
    if (err.code === 'ENOENT') {
        console.log('File not found, creating a new tasks.json...');
        await fs.writeFile(filename, JSON.stringify([{ name, duration }], null, 2));
    } else {
        console.error('Unexpected error:', err);
    }
}
module.exports = { readFile, writeTask, handleError };