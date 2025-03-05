const fs = require('fs');
const http = require('http');
const url = require('url');
const replacePlaceholders = require('./modules/replacePlaceholders');
const slugify = require('slugify');

/////////////////////////////
// SERVER
// We can use synchronous file reading as it is the top level code right now and will
// only be executed once.
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);
const templOverview = fs.readFileSync(`${__dirname}/templates/overview.html`, 'utf-8');
const templProduct = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8');
const templCard = fs.readFileSync(`${__dirname}/templates/card.html`, 'utf-8');

// Creating slugs for our products urls.
const dataWithSlugs = dataObj.map(product => ({
    ...product,
    slug: slugify(product.productName, { lower: true }) 
}));
// console.log(dataWithSlugs);

// Creating a server.
// As soon as we hit the URL page, we will get the response from our server.
const server = http.createServer((req, res) => {
    const { pathname } = url.parse(req.url, true);
    // console.log(pathname);
    
    // Overview page
    if (pathname === '/' || pathname === '/overview') {
        res.writeHead(200, { 'content-type': 'text/html' });

        const cardsHtml = dataWithSlugs.map(product => replacePlaceholders(templCard, product)).join('');
        const output = templOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
        res.end(output);
    }

    // Product page
    else if (pathname.startsWith('/product')) {
        const slug = pathname.split('product/')[1];
        // console.log(slug);
        const product = dataWithSlugs.find(product => product.slug === slug);

        if (product) {
            res.writeHead(200, { 'content-type': 'text/html' });
            const output = replacePlaceholders(templProduct, product);
            res.end(output);
        }
        else {
            res.writeHead(404, { 'content-type': 'text/html' });
            res.end('<h1>Page Not Found</h1>');
        }
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