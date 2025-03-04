const fs = require('fs');
const http = require('http');
const url = require('url');

/////////////////////////////
// SERVER
// We can use synchronous file reading as it is the top level code right now and will
// only be executed once.
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);
const templOverview = fs.readFileSync(`${__dirname}/templates/overview.html`, 'utf-8');
const templProduct = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8');
const templCard = fs.readFileSync(`${__dirname}/templates/card.html`, 'utf-8');

const replacePlaceholders = (template, product) => {
    // Globally replace all the placeholders using "//g".
    let output = template.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%ID%}/g, product.id);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);

    if (!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    return output;
}

// Creating a server.
// As soon as we hit the URL page, we will get the response from our server.
const server = http.createServer((req, res) => {
    const {query, pathname} = url.parse(req.url, true);
    // console.log(query, pathname);
    
    // Overview page
    if (pathname === '/' || pathname === '/overview') {
        res.writeHead(200, { 'content-type': 'text/html' });

        const cardsHtml = dataObj.map(product => replacePlaceholders(templCard, product)).join('');
        const output = templOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
        res.end(output);
    }

    // Product page
    else if (pathname === '/product') {
        res.writeHead(200, { 'content-type': 'text/html' });
        const product = dataObj[query.id];
        const output = replacePlaceholders(templProduct, product);
        res.end(output);
    }

    // API page
    else if (pathname === '/api') {
        res.writeHead(200, { 'content-type': 'application/json' });
        // Here we are passing the 'data' instead of 'dataObj' as the sent response 
        // argument should either be string, or an instance of Buffer of Uint8Array.
        res.end(data);
    }

    // Not found page
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