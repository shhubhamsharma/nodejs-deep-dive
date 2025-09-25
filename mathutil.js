
function add(a,b){
    return a+b;
}

function subtract(a,b){
    return a-b;
}

function multiply(a,b){
    return a*b;
}
function divide(a,b){
    if(b===0) throw new Error("Division by zero");
    return a/b;
}
// export functions
/**
 * module.exports can export multiple functions as an object
 * or export a single function or value directly
 * 
 */
module.exports={add,subtract,multiply,divide};

/**
 * This module provides basic mathematical operations: addition, subtraction, multiplication, and division.
 * Each function takes two numerical arguments and returns the result of the operation.
 * The divide function includes error handling to prevent division by zero.
 * 
 */