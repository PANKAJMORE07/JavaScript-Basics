// Asynchronous JavaScript refers to the ability of JavaScript to perform tasks without blocking the execution of 
// other code. This feature is crucial for improving the performance and responsiveness of applications, 
// especially when dealing with tasks like fetching data from a server, reading files, or executing timers.

// Sync vs Async

console.log('sync operation 1');
console.log('sync operation 2');
console.log('sync operation 3');


console.log('async operation 1');

//setTimeout(callback, time) -> async function
setTimeout(() => {
    console.log('async operation 2');
}, 2000); // 1000ms = 1s
console.log('async operation 3');

// async operation 1
// async operation 3
// async operation 2


// function sum(a, b){
//     console.log(a + b);
// }
// setTimeout(sum(1, 2), 2000) // setTimeout(undefined, 2000), but it expects an callback, therefore after log 3 give an error

function sum(a, b){
    console.log(a + b);
}
setTimeout(() => sum(1, 2), 2000)


// 👉 JavaScript is single-threaded and synchronous by default.
// That means code runs line by line, one after another.

// 👉 But JS also has asynchronous features (thanks to the browser / Node.js environment), like:
// setTimeout, Promises, async/await, fetch -> having async behaviour
// These use the event loop to handle tasks in the background, so they don’t block the main thread.


// 🔄 Event Loop in Simple Words
// JavaScript runs in a single thread → it can do only one thing at a time.
// But we still want async tasks (like timers, API calls, promises).

// 👉 The Event Loop is the "traffic controller" that decides:
// What runs now (main code / call stack)
// What waits in a queue (async callbacks, promises, timers)
// When async tasks should be moved into execution

// 🧩 How it Works (Step by Step)

// 1. Call Stack (main thread)
// Where your code runs line by line.

// 2. Web APIs / Node APIs
// Async stuff (setTimeout, fetch) is handed over to browser/Node APIs.

// 3. Task Queues
// Macro-task queue: for things like setTimeout, setInterval, events.
// Micro-task queue: for Promises (.then, async/await).

// 4. Event Loop
// Keeps checking: “Is the call stack empty?”
// If yes → it takes tasks from queues in order:
// First from micro-task queue (Promises)
// Then from macro-task queue (Timers, I/O)

//example
console.log("Start");

setTimeout(() => console.log("setTimeout"), 0);

Promise.resolve().then(() => console.log("Promise"));

console.log("End");

// Start
// End
// Promise   ✅ (micro-task runs before)
// setTimeout ✅ (macro-task runs later)
