# Advanced Asynchronous Patterns, Processes & Streams
1. Deep Dive into Asynchronous Patterns

Callbacks → Oldest way.
Promises → Cleaner chaining.
Async/Await → Modern, more readable.
Event Loop recap → How Node schedules callbacks.


## Callbacks 
Function gets passed as a parameter, invoked when task finishes.
Problem → callback hell (nested callbacks, hard to read/maintain).

## Why Callbacks in Node.js?

Node.js is non-blocking (async).
Instead of waiting for something slow (like file read, DB query, API request), Node.js continues running other code.
When the slow task finishes, it calls the callback.

## Error-First Callback Pattern

Node.js follows a standard error-first callback convention:
```js
// error-first callback example
function(err, result) {
    if (err) {
        // handle the error
    } else {
        // use the result
    }
}
fs.readFile('file.txt', function(err, data) {
    if (err) {
        console.error('Error reading file:', err);
    } else {
        console.log('File contents:', data.toString());
    }
});
```

## Callback Hell

When you have many nested callbacks, code becomes messy (called callback hell):
```js
fs.readFile("file1.txt", "utf8", function(err, data1) {
    fs.readFile("file2.txt", "utf8", function(err, data2) {
        fs.readFile("file3.txt", "utf8", function(err, data3) {
            console.log(data1, data2, data3);
        });
    });
});

Start → Read User → 
          └── Read Posts → 
                    └── Write Result → Done

```

## Promises
Promises are the objects which guarantees to either resolve or reject result of synchronous operations

## States of a Promise

A Promise has 3 states:
- Pending → The async task is still running.
- Fulfilled (Resolved) → Task finished successfully → returns a value.
- Rejected → Task failed → returns an error.

```js
let myPromise = new Promise((resolve, reject) => {
    let success = true; // change to false to test rejection

    if (success) {
        resolve("Task completed successfully!");
    } else {
        reject("Something went wrong!");
    }
});

myPromise
    .then(result => console.log("Success:", result))
    .catch(error => console.log("Error:", error));

```

## Async/Await 
Async/Await is built on top of Promises,
It makes asynchronous code look and behave like synchronous code, making it easier to read and write,but it’s still async under the hood.

## The async Keyword
Declares a function as asynchronous.
An async function always returns a Promise.
If the function returns a value, JS automatically wraps it inside Promise.resolve(value).
If it throws an error, JS wraps it inside Promise.reject(error).

## The await Keyword
Can only be used inside async functions.
Pauses the execution of the function until the Promise is resolved or rejected.
Makes async code look synchronous.

```js
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
    console.log("Start");
    await delay(2000); // waits 2 seconds
    console.log("End");
}

run();
```

await pauses the function, but doesn’t block the event loop.
The continuation after await is placed in the microtask queue.
Microtasks run before macrotasks, so: Promise.then and await run before setTimeout.


## Worker Threads
Node.js is single-threaded by default. That means your JavaScript code runs on one main thread (event loop).
But CPU-intensive tasks (like image processing, heavy calculations, or compression) can block the event loop, making your server unresponsive.
Worker Threads let you run JavaScript code in multiple threads, offloading heavy work from the main thread.
Each Worker Thread has its own event loop, memory, and V8 instance.

Communication between threads happens via:
Messages (postMessage / on('message'))
SharedArrayBuffer (for shared memory)

## Worker Threads:
CPU-intensive tasks that can run alongside main thread.
Heavy computation where memory sharing is helpful.
Example: image processing, encryption, data transformations.

## Child Processes:
Need process isolation, e.g., sandboxing risky code.
Running external programs or scripts.
Example: spawning Python scripts, separate Node.js apps, CLI tools.