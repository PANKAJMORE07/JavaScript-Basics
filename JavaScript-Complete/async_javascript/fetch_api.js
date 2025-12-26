// API - Application Programming Interface
// an API is usually an HTTP endpoint that lets your code talk to a server.
// HTTP endpoint: An endpoint is just a URL (address) on a server where you send an HTTP request to get or send data.
// An HTTP endpoint or API is like a doorway (communication channel) between:
// Client (browser, mobile app, frontend) → makes request
// Server (backend, database) → sends response
// HTTP (communication protocol).

// 🔹 Types of Web APIs :
// Web API: Any API accessible over the web (HTTP/HTTPS).

// 1. REST API → Most common (uses URLs + HTTP methods).
// -GET /users → fetch data
// -POST /users → create user
// -PUT /users/1 → update user
// -DELETE /users/1 → delete user

// 2. GraphQL API → Flexible, a query language that allow client to ask exactly what they need.
// - combines multiple requests into one and minimize over-fetching/under fetching of data
// - more flexible that rest

// 3. Browser API → built-in APIs like fetch, localStorage, setTimeout, Geolocation API, DOM API etc

// 4. Streaming API → APIs for real time data delivery, often used with WebSockets or Server-Sent Events(SSE)
// - A Streaming API keeps the connection open and sends new data as soon as it’s available.

// 5. SOAP API
// - Uses XML (not JSON) to send requests & responses.
// - Very strict and standardized (unlike REST, which is more flexible).

// 6. Custom APIs
// A Custom API is just an API built specifically for your own app/project.
// It’s usually a REST API, GraphQL API, or gRPC API designed for your app’s needs.

// How API works?
// 1. Client sends a request: Usually HTTP request (GET, POST, PUT, DELETE), Sent to a specific endpoint (URL)
// 2. Server receives request: Server code looks at what’s being asked (endpoint + method(GET, POST..)).
// 3. Server processes the request: Queries database, applies logic.
// 4. Server sends back a response: Contains a status code (success/error) + data (JSON, XML, text).

// Benifits of APIs
// 1. Scalable: share only nessary data
// 2. Secure: access without exposing sensitive info
// 3. Reusable: use the API for different apps


// JSON
// {
//     data: {
//         data1: []
//     }
// }

// JSON (JavaScript Object Notation) is a lightweight data-interchange format that is 
// easy for humans to read and write and easy for machines to parse and generate. 
// It is commonly used to exchange data between a client and a server in web applications.

const jsonData = {
    name: "Nikhil",
    age: 30,
    isDeveloper: true,
    skills: ["JavaScript", "Ionic", "Angular"],
    address: {
      city: "Delhi",
      country: "India"
    }
};

// fetch() api
// CRUD - Create Read Update Delete

// Basic get request
async function fetchUserData() {
    try {
        const response = await fetch('https://api.github.com/users/nykz');

        // console.log(response);
        // response.ok: true if status 200–299, else false, the stutus we need to send from backend in case of custom api
        if(!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse JSON response
        const userData = await response.json(); //Converts a JSON string → JavaScript object
        console.log(userData);
        return userData;
    } catch(e) {
        console.error(e);
    }
}

fetchUserData();

/*
Fetch API Key Concepts

Basic Request Structure

Uses fetch(url, options) method
Returns a Promise
Handles both successful and failed requests


Request Types:
GET (default)
POST
PUT
DELETE
PATCH
HEAD


Request Configuration

Method specification
Headers
Body content
Authentication
Timeout handling


Response Handling:
.json() for JSON data
.text() for plain text
.blob() for binary data
.formData() for form submissions


Error Handling:

Check response.ok
Catch network and parsing errors
Handle different HTTP status codes
*/

async function createUser(userData) {
    try {
        const token = 'usertoken1';
        const response = await fetch('https://api.example.com/users', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}` // why we need to pass if it is stored in localstorage or coocicks from backend??
            },
            body: JSON.stringify(userData), // Converts a JavaScript object → JSON string
            // JSON.parse(userDataString) // Converts a JSON string → JavaScript object
        });

        if(!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse JSON response
        const newUser = await response.json(); // Converts a JSON string → JavaScript object
        console.log(newUser);
        return newUser;
    } catch(e) {
        console.error('Create user error: ', e);
    }
}

// advanced error handling & retry mechanism
async function fetchWithRetry(url, options = {}, retries = 3) {
    const maxRetries = retries;

    const fetchWithTimeout = (url, options, timeout = 5000) => {
        // Promise.race(): Resolves or rejects as soon as the first Promise in the array settles (whether fulfilled or rejected).
        return Promise.race([
            fetch(url, options),
            new Promise((resolve, reject) => {
                setTimeout(() => reject(new Error('Requested timed out')), timeout)
            })
        ]);
    };

    for(let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const response = fetchWithTimeout(url, options);

            if (!response.ok) {
                // Handle different status codes
                switch (response.status) {
                    case 400:
                        throw new Error('Bad Request');
                    case 401:
                        throw new Error('Unauthorized');
                    case 403:
                        throw new Error('Forbidden');
                    case 404:
                        throw new Error('Not Found');
                    case 500:
                        throw new Error('Internal Server Error');
                    default:
                        throw new Error(`HTTP error! status: ${response.status}`);
                }
            }

            return await response.json();
        } catch(error) {
            if(attempt === maxRetries) {
                console.error(`Final attempt failed: ${error.message}`);
                throw error;
            }

            console.warn(`attempt ${attempt} failed: ${error.message}. Retrying...`);

            // exponential backoff
            await new Promise(resolve => 
                setTimeout(
                    resolve, 
                    Math.pow(2, attempt) * 1000
                ) // 2 to the power of attempt
            );
        }
    }
}

// 4. Handling Different Response Types
async function fetchMultipleResourceTypes() {
    try {
        // JSON Request
        const jsonResponse = await fetch('https://api.example.com/data.json');
        const jsonData = await jsonResponse.json();
        console.log('JSON Data:', jsonData);

        // Text Request
        const textResponse = await fetch('https://api.example.com/data.txt');
        const textData = await textResponse.text();
        console.log('Text Data:', textData);

        // Blob (Binary) Request
        const imageResponse = await fetch('https://api.example.com/image.png');
        const imageBlob = await imageResponse.blob();
        
        // Create image URL for display
        const imageUrl = URL.createObjectURL(imageBlob);
        console.log('Image Blob URL:', imageUrl);

        // FormData Request
        const formData = new FormData();
        formData.append('username', 'john_doe');
        formData.append('file', imageBlob, 'profile.png');

        const formResponse = await fetch('https://api.example.com/upload', {
            method: 'POST',
            body: formData
        });
        const uploadResult = await formResponse.json();
        console.log('Upload Result:', uploadResult);
    } catch (error) {
        console.error('Fetch error:', error);
    }
}


/*
AJAX with XMLHttpRequest (Legacy Approach)
AJAX (Asynchronous JavaScript and XML) was traditionally implemented using the XMLHttpRequest 
object to send and receive data from servers asynchronously without refreshing the page.
*/

function makeXHRRequest(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        
        xhr.open('GET', url, true);
        
        xhr.onload = function() {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(JSON.parse(xhr.responseText));
            } else {
                reject({
                    status: xhr.status,
                    statusText: xhr.statusText
                });
            }
        };
        
        xhr.onerror = function() {
            reject({
                status: xhr.status,
                statusText: xhr.statusText
            });
        };
        
        xhr.send();
    });
}

/*
Drawbacks of XMLHttpRequest

1. Verbosity: The code is verbose and harder to read.

2. Lack of Promises: Doesn't support promises natively, making error handling and chaining difficult.

3. Inconsistent APIs: Requires different methods to access headers, response, etc.

4. Modern Features Missing: Doesn't support newer JavaScript features like async/await.
*/


// axios
// import axios from 'axios';

// axios.get('https://jsonplaceholder.typicode.com/posts')
//   .then(response => console.log(response.data))
//   .catch(error => console.error('Error:', error));

/*
Axios: Axios is a Promise-based HTTP client that makes fetching and sending data easier than fetch().

why Axios is often considered better than fetch?

1️⃣ Automatic JSON parsing
fetch: You have to manually do res.json(), then log the parse data.
Axios: Response is already parsed in res.data, we can directly log it.

axios.get("/api")
  .then(res => console.log(res.data));


2️⃣ Better error handling
fetch: Only rejects on network errors. HTTP errors (like 404/500) don’t trigger catch automatically.
Axios: Rejects the Promise automatically on any HTTP error.

axios.get("/wrong-url")
  .catch(err => console.log(err)); // automatically caught


3️⃣ Timeout support 
fetch: 
If the server takes forever to respond, fetch will keep waiting indefinitely.
No built-in timeout, need extra code using AbortController to handle timeout

Axios: 
You just set a timeout in milliseconds in the config.
If the server takes longer → Promise automatically rejects.


axios.get("/api", { timeout: 5000 }) // 5 seconds 
 .catch(err => console.log("Timeout or error:", err));


4️⃣ Supports older browsers & Node.js easily
Fetch may require polyfills in older browsers.
Axios works out of the box in browser + Node.

5️⃣ Interceptors
You can globally modify requests or responses (e.g., add auth tokens).

🔹 What are Axios Interceptors?
Interceptors are functions that run before a request is sent or before a response is processed.
They let you modify or handle requests/responses globally instead of changing every single API call.

axios.interceptors.request.use(config => {
  // Add auth token to headers for every request
  config.headers.Authorization = "Bearer YOUR_TOKEN";
  return config;
});

Now, every axios.get, axios.post, etc., automatically includes the token.
You don’t need to manually add it in every API call.
*/