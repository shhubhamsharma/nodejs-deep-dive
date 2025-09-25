const { readFile, writeTask, handleError } = require('./taskUtility');

async function addTask(name, duration, fileName) {
    try {
        if (!name || typeof duration !== 'number') {
            throw new Error('Invalid task data');
        }
        const file = await readFile(fileName, 'utf8')
        const tasks = JSON.parse(file);
        await writeTask(tasks, name, duration, fileName);
        console.log(`Task "${name}" with duration ${duration}ms added.`);
    }
    catch (err) {
        handleError(err, name, duration, fileName);
    }
}
addTask('Sample Task 2', 2100, 'task2.json');
