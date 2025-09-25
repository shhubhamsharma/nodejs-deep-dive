const { parentPort } = require('worker_threads');

function fibonacci(n){
    return n <= 1 ? n : fibonacci(n-1)+fibonacci(n-2);
}

parentPort.on('message', (num) => {
    parentPort.postMessage(fibonacci(num));
});

/**
 * This code sets up a worker thread that listens for messages containing a number.
 * When a message is received, it calculates the Fibonacci number for that input using a recursive function
 * and sends the result back to the parent thread.
 * The Fibonacci function is defined to handle the base cases (0 and 1) and recursively compute the value for larger numbers.
 * This approach allows for offloading CPU-intensive calculations to a separate thread, preventing blocking of the main event loop.
 * Note: For large values of n, this recursive approach can be inefficient due to its exponential time complexity.
 * Consider using memoization or an iterative approach for better performance in production scenarios.
 * more about worker threads: https://nodejs.org/api/worker_threads.html
 * more about fibonacci: https://en.wikipedia.org/wiki/Fibonacci_number
 * more about recursion: https://en.wikipedia.org/wiki/Recursion_(computer_science)
 * more about event loop: https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/
 * more about performance optimization: https://nodejs.org/en/docs/guides/dont-block-the-event-loop/
 * more about CPU-intensive tasks: https://nodejs.org/en/docs/guides/understanding-blocking-vs-non-blocking/
 * more about asynchronous programming: https://nodejs.org/en/docs/guides/blocking-vs-non-blocking/
 * more about parallelism: https://nodejs.org/en/docs/guides/parallelism-in-nodejs/
 * more about concurrency: https://nodejs.org/en/docs/guides/concurrency-in-nodejs/
 * more about threading: https://en.wikipedia.org/wiki/Thread_(computing)
 *  more about non-blocking I/O: https://en.wikipedia.org/wiki/Non-blocking_I/O
 * more about event-driven programming: https://en.wikipedia.org/wiki/Event-driven_programming
 * more about single-threaded event loop: https://en.wikipedia.org/wiki/Event_loop#Single-threaded_event_loop
 * more about multi-threading: https://en.wikipedia.org/wiki/Multithreading_(computer_architecture)
 * more about parallel computing: https://en.wikipedia.org/wiki/Parallel_computing
 * more about distributed computing: https://en.wikipedia.org/wiki/Distributed_computing
 * more about high-performance computing: https://en.wikipedia.org/wiki/High-performance_computing
 */

// Example usage:
// In the parent thread, you would create a Worker and send a number to it like this: