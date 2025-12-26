// 1️⃣ Callback: A callback is simply a function passed as an argument to another function, to be called later.

// 👉 Useful when you want to do something after an async task finishes.
// Oldest method of handling asynchronous operations
// Can lead to "callback hell" with nested operations
// Limited error handling


// 2️⃣ Callback Hell: When you have lots of async tasks one after another, callbacks get nested inside each other, 
// making the code messy, hard to read, and error-prone.

//example: fetch data1 first then after 2sec data2 and then data3

const getData = (dataID, getNextData) =>{
    //2s
    setTimeout(()=>{
        console.log("data",dataID)

        if(getNextData) getNextData();

    }, 2000);
}

//callback hell

// getData(1, ()=>getData(2));

getData(1, ()=>{
    console.log("getting data 2.....");
    getData(2, ()=>{
        console.log("getting data 3.....");
        getData(3)
    });
});

// to solve this callback hell we used promises but promises also have an problem
// so we used async await for asynchronous tasks

// async/await >> promises >> callback