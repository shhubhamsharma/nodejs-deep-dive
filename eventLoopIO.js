const fs = require('fs').promises;

console.log('Start');

// Async file read
fs.readFile('data.txt', 'utf8').then(data => {
    console.log('File read:', data);
});

// Timer
setTimeout(()=>console.log('Timeout fired'), 0);

// Immediate
setImmediate(()=>console.log('Immediate fired'));

// Next tick
process.nextTick(()=>console.log('Next tick fired'));

console.log('End');
//Add CPU task → observe blocking effect on timers and I/O.
function fibonacci(n){
    return n <= 1 ? n : fibonacci(n-1)+fibonacci(n-2);
}
console.log('Fibonacci(40):', fibonacci(40));

/**
 * This code demonstrates the Node.js event loop by scheduling various asynchronous
 * operations: a file read, a timer, an immediate callback, and a next tick callback.
 * It also includes a CPU-intensive task (calculating the 40th Fibonacci number)
 * to illustrate how such tasks can block the event loop and delay the execution
 * of asynchronous callbacks.
 * The expected output order is:*/

//Start
//End
// NextTick fired
// Timeout fired
// Immediate fired
// File read: <file contents>
/**
 * next tick is called immediately after the current operation completes,before vent loop continues
 * nextTick has higher priority than timers and I/O operations, so it runs before them
 * Timeout and Immediate are both macrotasks, their order can vary based on timing
 * File read is an I/O operation, it will complete after the current call stack and all microtasks are done 
 * 
 */
/**
 * 
┌───────────────────────────────┐
│      Synchronous Code         │
│ ───────────────────────────── │
│ console.log('Start')          │
│ console.log('End')            │
│ console.log('Fibonacci(40)')  │
└─────────────┬─────────────────┘
              │
              ▼
┌───────────────────────────────┐
│  process.nextTick Queue       │
│ ───────────────────────────── │
│ console.log('Next tick fired')│
└─────────────┬─────────────────┘
              │
              ▼
┌───────────────────────────────┐
│  Timers Phase (setTimeout)    │
│ ───────────────────────────── │
│ console.log('Timeout fired')  │
└─────────────┬─────────────────┘
              │
              ▼
┌───────────────────────────────┐
│  Check Phase (setImmediate)   │
│ ───────────────────────────── │
│ console.log('Immediate fired')│
└─────────────┬─────────────────┘
              │
              ▼
┌───────────────────────────────┐
│  Poll Phase (I/O callbacks)   │
│ ───────────────────────────── │
│ console.log('File read: ...') │
└───────────────────────────────┘

 */

/**
 * process.nextTick callbacks are always executed before timers.
 * process.nextTick adds a callback to a special queue that runs 
 * immediately after the current operation completes, before the event 
 * loop continues.
 * This means it has higher priority than any phase of the event loop, 
 * including timers (setTimeout) or I/O callbacks.
 * 
 * **
 * ***
 * nextTick queue runs before entering the next event loop phase.
 * Timers (setTimeout) are handled in the timers phase, which comes after nextTick.
 * Even if a timer expires, nextTick callbacks still run first.
 */