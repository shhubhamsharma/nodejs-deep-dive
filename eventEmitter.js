//We will learn about event emitter
const EventEmitter = require('events');//importing events module
const taskEvents = new EventEmitter();//creating an instance of EventEmitter
/**
 * EventEmitter is a class in Node.js that allows you to create, emit, and listen for custom events.
 * It is part of the 'events' module and is widely used for handling asynchronous events in Node.js applications.
 * Key methods of EventEmitter include:
 * - on(eventName, listener): Registers a listener function to be called when the specified event is emitted.
 * - emit(eventName, ...args): Emits the specified event, calling all registered listeners with the provided arguments.
 */
// Register an event listener for 'taskAdded' event

taskEvents.on('taskAdded', (task) => {
    console.log(`Event received: Task "${task.name}" added with duration ${task.duration}ms`);
});
// Function to add a task and emit 'taskAdded' event
/**
 * 
 * @param {*} name 
 * @param {*} duration 
 * @returns 
 * The addTask function creates a task object with the provided name and duration, then emits a 'taskAdded' event using the taskEvents EventEmitter instance. The event listener registered earlier will log the details of the added task when the event is emitted.
 * Common events associated with EventEmitter include:
 * - 'newListener': Emitted when a new listener is added.
 * - 'removeListener': Emitted when a listener is removed.
 * - 'error': Emitted when an error occurs within an event listener.
 * EventEmitter is essential for building event-driven applications in Node.js, allowing for decoupled and modular code by enabling communication between different parts of an application through events.
 */

function addTask(name, duration) {
    const task = { name, duration };
    taskEvents.emit('taskAdded', task);
}

addTask('Learn EventEmitter', 2500);

addTask('Build a project', 5000);

addTask('Write tests', 3000);
/**
 * In this example, we create an instance of EventEmitter called taskEvents.
 * We register a listener for the 'taskAdded' event that logs the task details when the event is emitted.
 *  
 * We define an addTask function that creates a task object and emits the 'taskAdded' event with the task as an argument.
 * Finally, we call addTask multiple times to demonstrate the event-driven behavior.
 * When you run this code, you'll see log messages indicating that tasks have been added, demonstrating how EventEmitter can be used to handle custom events in a Node.js application.
 * 
 * 
 */

// newListener and removeListener events
taskEvents.on('newListener', (event, listener) => {
    console.log(`A new listener was added for event: ${event}`);
});
taskEvents.on('removeListener', (event, listener) => {
    console.log(`A listener was removed for event: ${event}`);
});
function sampleListener() {
    console.log('Sample listener executed.');
}
taskEvents.on('sampleEvent', sampleListener);
taskEvents.removeListener('sampleEvent', sampleListener);
taskEvents.emit('sampleEvent'); // This will not trigger the listener as it has been removed


