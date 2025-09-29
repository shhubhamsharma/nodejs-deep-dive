const { readFile, writeTask, handleError, writeFile } = require('./taskUtility');
const EventEmitter = require('events');
const taskEvents = new EventEmitter();

async function addTask(name, duration, fileName) {
    try {
        if (!name || typeof duration !== 'number') {
            throw new Error('Invalid task data');
        }
        const file = await readFile(fileName, 'utf8');
        console.log(file);
        const tasks = JSON.parse(file);
        await writeTask(tasks, name, duration, fileName);
        taskEvents.emit('taskAdded', { name, duration });
        console.log(`Task "${name}" with duration ${duration}ms added.`);
    }
    catch (err) {
        handleError(err, name, duration, fileName);
    }
}
addTask('Sample Task 2042', 2100, 'task2.json');

taskEvents.on('taskAdded', taskAddedListener);
async function taskAddedListener(task) {
    try {
        await writeFile('taskLog.txt', `Event received: Task "${task.name}" added with duration ${task.duration}ms\n`, 'append');
        console.log(`Event received: Task "${task.name}" added with duration ${task.duration}ms`);
    }
   catch (err) {
        console.error('Error logging task event:', err);
    }
}

/**
 * This code extends the previous task management functionality by integrating the EventEmitter class from Node.js.
 * An instance of EventEmitter, taskEvents, is created to handle custom events related to task management.
 * When a task is successfully added using the addTask function, a 'taskAdded' event is emitted with the task details.
 * A listener for the 'taskAdded' event is registered, which logs the event details to the console and appends them to a log file named taskLog.txt.
 * This demonstrates how EventEmitter can be used to create an event-driven architecture, allowing different parts of the application to respond to events in a decoupled manner.
 * 
 */