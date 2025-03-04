const fs = require('fs');
const http = require('http');
const url = require('url');

/////////////////////////////
// SERVER
// We can use synchronous file reading as it is the top level code right now and will
// only be executed once.
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

// Creating a server.
// As soon as we hit the URL page, we will get the response from our server.
const server = http.createServer((req, res) => {
    const pathName = req.url;
    
    if (pathName === '/' || pathName === '/overview') {
        res.end('This is the OVERVIEW');
    }
    else if (pathName === '/product') {
        res.end('This is the PRODUCT');
    }
    else if (pathName === '/api') {
        res.writeHead(200, { 'content-type': 'application/json' });
        // Here we are passing the 'data' instead of 'dataObj' as the sent response 
        // argument should either be string, or an instance of Buffer of Uint8Array.
        res.end(data);
    }
    else {
        res.writeHead(404, {
            // A header is just a piece of information about the response we 
            // are sending from the server.
            'Content-type': 'text/html',
            'my-own-header': 'Hello',
        });
        // The "Content-type" specified that the content will be some HTML code.
        // So, we need to send HTML in our response.
        res.end('<h1>Page Not Found</h1>');
    }
});

// Now, from we will listen to the server.
// As we will run our index.js file in our node environment, it will start listening 
// to requests.
server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to requests on port: 8000');
});