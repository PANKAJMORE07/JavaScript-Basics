// async/await -> keywords
// async keyword used to create an async function
// An async function always returns a Promise (even if you don’t explicitly return one).
// Inside an async function, await makes execution wait until the Promise resolves.
// await keyword pauses the execution of its surrounding and it is used only in async function
// async and await make handling promises easier and provide a synchronous-looking syntax.
// * Syntactic sugar over Promises
// * Makes asynchronous code look and behave more like synchronous code
// * Uses try/catch for error handling
// * Allows sequential async operations with clean syntax

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

async function asyncTaskOperation() {
  try {
    const result1 = await fetchUserDataPromise(1);
    console.log(result1);

    const result2 = await fetchUserDataPromise(2);
    console.log(result2);

    const result3 = await fetchUserDataPromise(3);
    console.log(result3);

    // const result4 = await Promise.all([]);

    return true;  // JavaScript wraps it → Promise.resolve(true).
  } catch (error) {
    console.log(error);
    throw new Error('error fetching user');
  }
}

// asyncTaskOperation();
asyncTaskOperation()
  .then((result) => {
    console.log('result: ', result);
  })
  .catch((e) => {
    console.log('error: ', e);
  });


// await used to waite unitil the promise resolved, once it resolved it returns the responce sent by promise 
// async await promise
async function getData() {
  let promise = new Promise((resolve) => {
    setTimeout(() => resolve("Data received"), 1000);
  });
  let result = await promise;
  console.log(result);
}
getData(); // Output: Data received (after 1 second)



const api = async (dataID) =>{
    return new Promise((resolve, regect) => {
        setTimeout(()=>{
        console.log("data",dataID)
        resolve()
    }, 2000);
    })
}

// awiat only works in async functions
async function getData(){
    await api(1);
    await api(2);
    await api(3);
}

getData();