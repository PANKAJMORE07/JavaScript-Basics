// function declaration 

// function - reusable blocks of code
// parameters - values receved in function
// arguements - values pass at the time of function calling

function functionName(parameters) { 
    // block of code
}

function greet() {
    console.log('Hello world');
}

greet();

// parameter function
function greetings(message) {
    console.log(message);
}

greetings('Hi');


// Function expressions
const greet1 = function() {
    console.log('Hello!');
}
const greet2 = function(username) {
    console.log('Hello!', username);
}

// console.log(greet1);
greet1();
greet2('Ram');
greet2('Shyam');

// arrow functions - Simplified syntax for functions
// const add = (a, b) => {
//     return (a + b);
// };
const add = (a, b) => a + b;

console.log(add(5, 2)); // 7

// default parameters in functions
const greet3 = function(username = 'Krishna') {
    console.log('Hello!', username);
}

greet3();
greet3('Ram2');


// higher-order functions & callbacks
//🔹Higher-Order Function: A function that takes another function as an argument OR returns a function.
//🔹 Callback Function: A function passed as an argument to another function, to be “called back” later.
// a function that accepts another function as an arguement - higher-order function
// let array1 = [1, 2];

function processArray(arr, callback) {
    for(let i = 0; i < arr.length; i++) {
        callback(arr[i]);
    }
}

let array1 = [1, 2];
processArray(array1, function(num) {
    console.log(num * 2); // 2, 4
});

function multiplyNumbers(num) {
    console.log(10 * num); 
}

processArray(array1, multiplyNumbers); // 10, 20
// ✅ You can think of a function name as a reference to the function object in JavaScript.
// 🔹 multiplyNumbers: Refers to the function itself (the definition)-> multiplyNumbers is passed by reference
// 🔹 multiplyNumbers(): Calls the function immediately and passes its result.


// scope, closure
// scope - Accessibility of variables (global, local & block)
// closure - Function that remembers its outer variables

// 🔹 What is a Closure?
// A closure happens when:
// A function is defined inside another function,
// The inner function remembers variables from the outer function,
// Even after the outer function has finished running.


// let a = 5; // global
function outer() {
    let count = 0; // local
    // a = 10;
    return function inner() {
        count++;
        console.log(`Count: ${count}`);
        // let x = 3; // block
    };
}

let counter = outer(); // `counter` is assigned the inner() function with a closure over `count`
counter(); // Logs "Count: 1"
counter(); // Logs "Count: 2"
counter(); // Logs "Count: 3"

let counter2 = outer(); // assign with initials values i.e count = 0
counter2(); // Logs "Count: 1"
counter2(); // Logs "Count: 2"


// Why are closures useful: Data privacy (hide variables) and Remember state (like counters, event handlers).
function bankAccount() {
  let balance = 100; // private

  return {
    deposit(amount) { balance += amount; },
    getBalance() { return balance; }
  };
}

let account = bankAccount();
account.deposit(50);
console.log(account.getBalance()); // 150 ✅ balance is hidden

account.deposit(50);
console.log(account.getBalance()); // 200 ✅ balance is hidden




// IIFE (Immediately Invoked Function Expression):
// Executes without calling it
(function() {
    console.log('IIFE');
})();


// call by value vs call by reference

// 🔹 Call by Value:
// - A copy of the value is passed.
// - Changes affect only the copy, not the original.
// - Works with primitive values (numbers, strings, booleans, etc.).

let a = 10;
function change(a) {
  a = 20;        // only changes the copy
  console.log(a); //20
}
change(a);
console.log(a);  // 10 (original unchanged)


// 🔹 Call by Reference
// - A reference (link to the same memory location) is passed.
// - Changes affect the original, because both point to the same data.
// - Works with objects, arrays and functions.

let arr = [1, 2, 3];

function change(nums) {
  nums.push(4);  // modifies the same array
}
change(arr);
console.log(arr); // [1, 2, 3, 4] (original changed)


//🔹 What is Currying?
// Currying is the process of breaking a function with multiple arguments into a series of functions that each take one argument at a time.
// Each function returns another function until all arguments are collected.

function add(a) {
  return function(b) {
    return a + b;
  }
}
console.log(add(2)(3)); // 5
// add(2) → returns a function that takes b
// Then (3) → final result

//With Arrow Functions (shorter)
const addNums = a => b => {
  return  a + b
}
console.log(addNums(5)(3)); //8

// Reusing functions with preset arguments
const multiply = a => b => a * b;

const double = multiply(2);   // preset first argument
const triple = multiply(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15


// return statement

// 1️⃣ Block body { … }
// Use curly braces {} when you have multiple statements.
// Important: You must use return if you want the function to return a value or something.
// If you forget return, the function returns undefined.
const add = (a, b) => {
  const sum = a + b;
  return sum; // must explicitly return
};
console.log(add(2, 3)); // 5


// 2️⃣ Parentheses ( … )
// Sometimes people wrap expressions in parentheses to use the comma operator.
// All expressions inside are evaluated left to right, and the last expression is returned automatically.

const multiplyAndAdd = (a, b) => (
  a * b,      // evaluated but ignored
  a + b       // returned
);
console.log(multiplyAndAdd(2, 3)); // 5

// 3️⃣ Concise body (single expression) expr
// No braces needed.
// The expression is automatically returned.
// Best for simple one-liners.

const multiply1 = (a, b) => a * b;
console.log(multiply1(2, 3)); // 6