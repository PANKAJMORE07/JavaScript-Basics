// objects - collection of key-value pairs

const student = {
    name: 'Abc',
    age: 25,
    grade: 'A'
};

console.log(student.name); // Abc

// object methods & this keyword

// object methods - Functions defined inside objects.They can operate on the object’s properties.
const person = {
    firstName: 'Krishna',
    lastName: 'Kumar',
    fullName() {
        // return `${person.firstName} ${person.lastName}`;
        return `${this.firstName} ${this.lastName}`;
    }
};
console.log(person.fullName()); // Krishna Kumar

// this keyword - refers to the object that is calling the method. in above example this = person
// this = the object calling the function → here person


/* 
What is this?

It’s a reference to the object that the function 
is currently attached to or being called from.
Its value depends on how a function is called, not where it's written.

Why is this Important?

It allows functions to be flexible and reusable across different objects.
It helps in accessing properties or methods of the object 
that is calling the function.
*/

// Arrow functions don’t have their own this. Instead, they inherit this from the surrounding (lexical) scope.
const person1 = {
    firstName: 'Krishna',
    lastName: 'Kumar',
    fullName: () => {
        return `${this.firstName} ${this.lastName}`; // 'this' refers to the outer scope, not the person1 object
    }
};
console.log(person1.fullName()); // undefined undefined

// Step by step:
// Arrow function fullName doesn’t get its own this → it looks outside, i.e., the global object i.e {}.
// it will likely print "undefined undefined" unless you are in some special scope (like Node or strict mode).

// 🔹 What is Lexical Scope?
// Lexical scope means that a function remembers the variables from the place where it was defined, not where it is called.
// In other words, scope is determined by the position of the function in the code.

const a = 10; // outer variable

function outer() {
  const b = 20;

  function inner() {
    console.log(a); // can access outer variable
    console.log(b); // can access outer variable
  }

  inner();
}

outer();


console.log(this); // empty object -> {}


// Here, the function is called normally (not as a method of an object).
// In non-strict mode, JS defaults this to the global object → window in browsers.
function sayHi() {
  console.log(this);
}
sayHi(); // Window (browser)