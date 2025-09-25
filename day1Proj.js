const fs = require('fs').promises;

async function addTask(name, duration) {
    try {
        if (!name || typeof duration !== 'number') {
            throw new Error('Invalid task data');
        }
        const file = await fs.readFile('tasks.json', 'utf8')
        const tasks = JSON.parse(file);
        tasks.push({ name, duration });
        await fs.writeFile('tasks.json', JSON.stringify(tasks, null, 2));
    }
    catch (err) {
        if (err.code === 'ENOENT') {
            console.log('File not found, creating a new tasks.json...');
            await fs.writeFile('tasks.json', JSON.stringify([{ name, duration }], null, 2));
        } else {
            console.error('Unexpected error:', err);
        }
    }
}
addTask('Sample Task', 2000);