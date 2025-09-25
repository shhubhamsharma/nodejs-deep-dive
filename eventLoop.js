console.log('Start');

setTimeout(() => console.log('setTimeout'), 0);

setImmediate(() => console.log('setImmediate'));

Promise.resolve().then(() => console.log('Promise 1'))
       .then(() => console.log('Promise 2'));

process.nextTick(() => console.log('nextTick'));

console.log('End');
/**
 * Start
 * End
 * nextTick
 * Promise 1
 * Promise 2
 * setTimeout
 * setImmediate
 *
 * Explanation:
 * 1. Synchronous code runs first: 'Start' and 'End'.
 * 2. process.nextTick() callbacks are executed next, before any other microtasks or macrotasks.
 * 3. Promise callbacks (microtasks) are executed next in the order they were added.
 * 4. setTimeout() and setImmediate() are macrotasks; their order can vary, but typically setTimeout() runs before setImmediate() in this case.
 * What are microtasks and macrotasks?
 * - Microtasks: Tasks that are executed immediately after the currently executing script and before any rendering or I/O. Examples include Promise callbacks and process.nextTick().
 * - Macrotasks: Tasks that are scheduled to run after the current script and all microtasks have completed. Examples include setTimeout(), setInterval(), and setImmediate().
 * more explanation
 * https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/
 */