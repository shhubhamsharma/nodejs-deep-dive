const { Worker } = require('worker_threads');

function runWorker(num) {
    return new Promise((resolve, reject) => {
        const worker = new Worker('./worker.js');
        worker.postMessage(num);
        worker.on('message', resolve);
        worker.on('error', reject);
    });
}

(async () => {
    console.log('Starting worker...');
    const result = await runWorker(40);
    console.log('Fibonacci result:', result);
})();

/**
 * This code demonstrates how to use worker threads in Node.js to offload CPU-intensive tasks, such as calculating Fibonacci numbers, to separate threads.
 * The main thread creates a worker that runs the code in 'worker.js', sends a number to it, and waits for the result.
 * The worker listens for messages, computes the Fibonacci number using a recursive function, and sends the result back to the main thread.
 * This approach helps to keep the main event loop responsive by preventing blocking operations.
 * Note: Ensure that 'worker.js' is in the same directory as this file for the code to work correctly.
 * more about worker threads: https://nodejs.org/api/worker_threads.html
 * more about fibonacci: https://en.wikipedia.org/wiki/Fibonacci_number
 * more about recursion: https://en.wikipedia.org/wiki/Recursion_(computer_science)
 * more about event loop: https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/
 * more about performance optimization: https://nodejs.org/en/docs/guides/dont-block-the-event-loop/
 * more about CPU-intensive tasks: https://nodejs.org/en/docs/guides/understanding-blocking-vs-non-blocking/
 */
// Example usage:
// In the parent thread, you would create a Worker and send a number to it like this:
// const { Worker } = require('worker_threads');
// const worker = new Worker('./worker.js');
// worker.postMessage(40);

/**
 * | Term              | Description                                                   |
| ----------------- | ------------------------------------------------------------- |
| `Worker`          | Represents a new thread that runs a JavaScript file           |
| `parentPort`      | Communication channel between worker and main thread          |
| `postMessage`     | Sends data to the other thread asynchronously                 |
| `'message'` event | Triggered when the worker (or main thread) receives a message |

Advantages of Worker Threads

Offloads CPU-heavy tasks from main thread

Keeps I/O operations non-blocking

Enables parallel execution
 */