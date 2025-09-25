function fibonacci(n){
    if(n<=1) return n;
    return fibonacci(n-1)+fibonacci(n-2);
}

console.time('fib');
console.log(fibonacci(40));
console.timeEnd('fib');

// Output:
// fib: 165.123ms
// 102334155
// fib: 165.456ms
// (time will vary based on machine performance)

/**
 * This code calculates the 40th Fibonacci number using a simple recursive function.
 * It also measures the time taken to compute this value using console.time and console.timeEnd.
 * The Fibonacci function is not optimized and has exponential time complexity, which is why it takes a noticeable amount of time to compute the result for n=40.
 * For larger values of n, consider using memoization or an iterative approach to improve performance.
 */

// * For larger values of n, consider using memoization or an iterative approach to improve performance.
// Example of an iterative approach:
function fibonacciIterative(n) {
    if (n <= 1) return n;
    let a = 0, b = 1, temp;
    for (let i = 2; i <= n; i++) {
        temp = a + b;
        a = b;
        b = temp;
    }   
    return b;
}

console.time('fibIterative');
console.log(fibonacciIterative(40));
console.timeEnd('fibIterative');

// Output:
// fibIterative: 0.123ms
// 102334155
// fibIterative: 0.145ms
// (time will vary based on machine performance)
// The iterative approach is significantly faster for larger values of n.
// Example of memoization:
function fibonacciMemoized(n, memo = {}) {
    if (n in memo) return memo[n];
    if (n <= 1) return n;
    memo[n] = fibonacciMemoized(n - 1, memo) + fibonacciMemoized(n - 2, memo);
    return memo[n];
}
console.time('fibMemoized');
console.log(fibonacciMemoized(40));
console.timeEnd('fibMemoized');
// Output:
// fibMemoized: 0.456ms
// 102334155    
// this memoizaiton approach is also significantly faster for larger values of n.
// fibMemoized: 0.478ms
// (time will vary based on machine performance)
// logic is same as fibonacci function but it uses memoization to store previously computed values to avoid redundant calculations.

setTimeout(() => console.log('Hello after 1s'), 1000);

// Output after 1 second:
// Hello after 1s
// This code uses setTimeout to schedule a message to be logged after a 1-second delay.
// setTimeout is a macrotask and will be executed after the current call stack is empty and all microtasks are completed.
// This is useful for deferring execution of code without blocking the main thread.
// Note: The actual delay may be longer than specified due to the event loop and other tasks being processed.
// The minimum delay is 1ms in Node.js, but it can be longer depending on system load and other factors.
// More on event loop, microtasks, and macrotasks in Node.js:
// https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/