/**
 * Add SIGINT & SIGTERM handling in your Task Manager.
Log uncaught exceptions for any async operation.
Measure task addition time using process.hrtime.bigint().
(Optional) Split heavy tasks into a child process and communicate using IPC.
 */
const { readFile, writeTask, handleError, writeFile } = require('../taskUtility');
const EventEmitter = require('events');
const taskEvents = new EventEmitter();

async function addTask(name, duration, fileName) {
    try {
        const start = process.hrtime.bigint();
        if (!name || typeof duration !== 'number') {
            throw new Error('Invalid task data');
        }
        const file = await readFile(fileName, 'utf8');
        const tasks = JSON.parse(file);
        await writeTask(tasks, name, duration, fileName);
        const end = process.hrtime.bigint();
        console.log(`Task addition took ${(end - start) / BigInt(1e6)} ms`);
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
        // process.emit('SIGINT',true); // Simulate SIGINT for testing
    }
    catch (err) {
        console.error('Error logging task event:', err);
    }
}

handleEvent = async () => {
    console.log('Received SIGTERM. Gracefully shutting down...');
    await writeFile('taskLog.txt', `Received SIGTERM. Gracefully shutting down...\n`, 'append');
    process.exit(0);
}
process.on('SIGINT', handleEvent);

process.on('SIGTERM', handleEvent);

process.on('uncaughtException', async (err) => {
    console.error('Uncaught Exception:', err);
    await writeFile('taskLog.txt', `'Uncaught Exception:', ${err}`, 'append');
    // Optionally log the error to a file or monitoring service
    process.exit(1); // Exit the process to avoid undefined state
});

/**
 * This code extends the previous task management functionality by integrating the EventEmitter class from Node.js.
 * An instance of EventEmitter, taskEvents, is created to handle custom events related to task management.
 * When a task is successfully added using the addTask function, a 'taskAdded' event is emitted with the task details.
 * A listener for the 'taskAdded' event is registered, which logs the event details to the console and appends them to a log file named taskLog.txt.
 * This demonstrates how EventEmitter can be used to create an event-driven architecture, allowing different parts of the application to respond to events in a decoupled manner.
 * 
 */

/**
 * This code adds robust signal handling and error management to a task management application.
 * It listens for SIGINT and SIGTERM signals to allow graceful shutdowns, ensuring that any necessary cleanup or logging can occur before the application exits.
 * Additionally, it captures uncaught exceptions in asynchronous operations, logging the errors and exiting the process to prevent undefined states.
 * The use of async functions for signal handling ensures that any asynchronous cleanup tasks can be completed before the process exits.
 * This approach enhances the reliability and maintainability of the application, making it more resilient to unexpected interruptions and errors.
 * 
 */