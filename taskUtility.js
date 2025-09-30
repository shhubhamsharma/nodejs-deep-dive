const fs = require('fs').promises;

async function readFile(__filename, encoding = 'utf8') {
    return await fs.readFile(__filename, encoding)
}

async function writeTask(tasks, name, duration, fileName) {
    tasks.push({ name, duration });
    await writeFile(fileName, JSON.stringify(tasks, null, 2));
}

async function handleError(err, name, duration, filename) {
    if (err.code === 'ENOENT') {
        console.log('File not found, creating a new tasks.json...');
        await writeFile(filename, JSON.stringify([{ name, duration }], null, 2));
    } else {
        console.error('Unexpected error:', err);
    }
}

async function writeFile(fileName, tasks, writeFile = null) {
    const method = writeFile === 'append' ? fs.appendFile : fs.writeFile;
    return await method(fileName, tasks);
}

module.exports = { readFile, writeTask, handleError, writeFile };
