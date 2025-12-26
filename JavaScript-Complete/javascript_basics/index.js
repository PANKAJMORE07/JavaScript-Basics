console.log('hello world');

var x;

function add() {
    var x = 9;
    if(x < 10) {
        console.log(x); // 9
        var x = 20;
        console.log(x); // 20
    }
}

// hoisting
function add1() {
    var x; // hoisting
    x = 9; // x = 9
    if(x < 10) {
        // var x; // hoisting
        console.log(x); // 9
        x = 20; // 20
        console.log(x); // x = 20
    }
}

function add2() {
    let x = 9; // x = 9
    if(x < 10) {
        console.log(x); // 9
        //x = 20; // 20
        x = "hi"
        console.log(x); // x = hi
    }
}

add();
add1();
add2();

// var has function scope not block scope
if(true){
    var v = 10;
}
console.log(v) // 10

// let has block scope
// if(true){
//     let l = 10;
// }
// console.log(l) // ReferenceError error


// const has fix value
// const c = 20;
// c = 10 // error: Assignment to constant variable.
// console.log(c) 


/*

Variables In JS:

1. var:
- Introduced: early javascript version
- Scope: Function scope (not block-scope) eg. written above
    - function scope: boundaries are whole function.
    - block scope: boundaries are curly braces { } (loops, if statements, etc.).
- Re-declaration: allowed in the same scope
- Hoisting: Hoisted to top of its scope but initialized as undefined
- Use case: outdated, avoid using modern js

2. let:
- Introduced: ES6(2015)
- Scope: Block-scoped
- Re-declaration: not allowed
- Hoisting: Hoisted but not initialized (throws the ReferenceError if accesed before declaration)
- Use case: use when variables values needs to change

3. const:
- Introduced: ES6(2015)
- Scope: Block-scoped
- Re-declaration: not allowed
- Re-assignment: not allowed
- Hoisting: Hoisted but not initialized (throws the ReferenceError if accesed before declaration)
- Use case: for fix values or constants values


🚀 Hoisting = JavaScript’s way of moving declarations to the top of their scope before the code runs.
So you can use variables or functions before you actually write them.

1. Function hoisting:

sayHello(); // works, even before it's written

function sayHello() {
  console.log("Hello!");
}

✅ Works because the function is hoisted to the top.


2. Var hoisting:

console.log(x); // undefined (not error)
var x = 10;

this code converted like:

var x; // declaration moved (hoisted) to the top (declaration goes just one line above where it is used first)
console.log(x); // undefined (not error)
var = 10;

✅ var is hoisted but only the declaration (var x;), not the value.

Note:

Hoisting always happens (JS moves declarations to the top). even in case of let and const but

Let/Const (not hoisted the same way)
console.log(y); // ❌ Error
let y = 20;
let and const are hoisted, but JavaScript protects you from using them too early.

Hoisting is neither fully good nor bad — it’s just how JavaScript works.

✅ Good (can help sometimes):
You can call functions before they are written.

❌ Bad (causes confusion/bugs):
With var, you might think a variable doesn’t exist, but it actually does (as undefined).

💡 Modern JS fix:
Use let and const → they don’t allow using variables before declaration (they throw error).
This makes code clearer and safer.


*/