// Promise:
//An object representing the eventual completion or failure of an asynchronous operation.
// * Introduced to solve callback limitations / callback hell
// * Provides cleaner chaining of asynchronous operations
// * Has three states: pending, fulfilled, rejected
// * Allows .then() and .catch() for handling results and errors

function fetchUserDataPromise(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId) {
        const user = {
          id: userId,
          name: "Ram",
          email: "ram@example.com",
        };

        resolve(user);
      } else {
        reject(new Error("Invalid User ID"));
        // callback(new Error('Invalid User ID'), null);
      }
    }, 1000);
  });
}

// usage
fetchUserDataPromise(123)
  .then((result) => {
    // resolve
    console.log("result: ", result);
    // fetchUserDataPromise(12)
  })
  .catch((err) => {
    // reject
    console.log("Catch error: ", err);
  })
  .finally(() => {
    // optional
    console.log("task finished");
  });

// Promise.all()
Promise.all([
  fetchUserDataPromise(1),
  fetchUserDataPromise(2),
  fetchUserDataPromise(3),
])
  .then((results) => {
    console.log("results: ", results);
  })
  .catch((error) => {
    console.log("error: ", error);
  });

fetchUserDataPromise(1)
  .then((result) => {
    fetchUserDataPromise(2)
      .then((result1) => {
        fetchUserDataPromise(3)
          .then((result2) => {})
          .catch((e2) => {});
      })
      .catch((e1) => {});
  })
  .catch((e) => {});


// Apna College

// A Promise is like a status tracker for your async task (API call, timer, file read, etc) wheater it is pending, fail or success.
//📦 A Promise has 3 states:
// 1. Pending → The request is still in progress.
// 2. Resolved / Fulfilled → The request finished successfully, and you got the data.
// 3. Rejected → The request failed, and you got an error.

// 
// let promise = new Promise((resolve, reject)=>{
//     console.log("i am a promise")
//     // resolve("success") // Resolved / Fulfilled the promise
//     reject("some error occured") //Rejected the promise -> give proper error
// })

// console.log(promise)

// we do not need to create promise it is retuned by API

const api = (dataID, getNextData) =>{
    return new Promise((resolve, regect) => {
        setTimeout(()=>{

        console.log("data",dataID)
        resolve("success");

        if(getNextData) getNextData();

    }, 2000);
    })
}

// let promise = api(123)   // store promise returen by api
// console.log(promise) // pending, resolve after 2s

// setTimeout(() => console.log(promise), 2000) //after getting data promise resolved and give success msg


// how to use the promise wich return by actual api
// .then() : use when we want to do something after promise is fullfilled
// .catch() : use when we want to do something after promise gets regected or some err occured

const getPromise = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
        console.log("i am promise1");
        // resolve()
        resolve("success")
        //reject("err")
        }, 2000)
    })
}

let promise1 = getPromise();

//store into Micro-task queue, and executes after promise resolved i.e after 2s
promise1.then((res) => {
    console.log("promise1 fullfilled", res);
})

//store into Micro-task queue, and executes after promise rejected i.e after 2s
promise1.catch((err) => {
    console.log("rejected")
})



const getData = (dataID) =>{
    return new Promise((resolve, regect) => {
        setTimeout(()=>{
        console.log("data",dataID)
        resolve()
    }, 2000);
    })
}

//callback hell

// getData(1, ()=>getData(2));

// getData(1, ()=>{
//     console.log("getting data 2.....");
//     getData(2, ()=>{
//         console.log("getting data 3.....");
//         getData(3)
//     });
// });

//Promise Chaining : it is better than callback code but still it is a confussing code -> to avoid this we use async-await
console.log("fetching data1....")
getData(1)
.then(()=>{
    console.log("fetching data2....")
    getData(2)
    .then(() => {
        console.log("fetching data3....")
        getData(3)
    })
    
})
.catch((err) => console.log(err))

// better way of writting promise chaining
console.log("fetching data1....")
getData(1)
.then(()=>{
    return getData(2) // return promise on that promise .then
})
.then(() => {
    return getData(3)
})

// Promise.all() -> fetch all at the same time ie after 2s
Promise.all([
    getData(1),
    getData(2),
    getData(3)
])
.then((res) => console.log("promise fullfilled", res))
.catch((err) => console.log("error", err))


// working with real api using promises

const promise = fetch("https://jsonplaceholder.typicode.com/todos/1");
console.log(promise); // Promise { <pending> } → request is still ongoing

promise
  .then(res => res.json()) // returns promise because it also take time
  .then(data => console.log("Data received:", data))  // ✅ resolved
  .catch(err => console.log("Error:", err));         // ❌ rejected

// Step 1️⃣ fetch()
// fetch starts the API request.
// It immediately returns a Promise in the pending state.
// When the request succeeds → it resolves with a Response object.
// i.e. this Response is sent by api and then JavaScript wraps it → Promise.resolve(res). 

// Step 2️⃣ First .then(res => res.json())
// first then receive that api response from promise → Promise.resolve(res).
// Calling res.json() also returns a Promise, because converting the response body into JSON takes time.
// So the first .then returns a new Promise that resolves when JSON parsing is done
// and then it automatically gets returned as resolve(res.json() as data) that we get in next then

// Step 3️⃣ Second .then(data => …)
// Once res.json() finishes, it gives you the real JavaScript object (parsed JSON).
// That’s why the second .then receives the data.


// fetch itself doesn’t support callbacks — it always returns a Promise.