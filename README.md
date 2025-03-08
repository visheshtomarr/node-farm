# Node Farm

Node Farm is a simple Node.js project that serves a farm products catalog using a basic HTTP server. It reads product data from a JSON file, generates dynamic HTML pages, and allows users to navigate between an overview page and individual product pages.

## Features

- Serves a dynamic product catalog using Node.js.
- Generates HTML content dynamically from JSON data.
- Uses URL slugs for product pages.
- Provides an API endpoint to fetch product data in JSON format.

## Installation

To set up the project locally:

1.  Clone the repository or copy the project files.
2.  Navigate to the project directory and install dependencies:
    ```
    npm install
    ```

## Usage

To start the server, run:

```
npm start
```

This will start a local server at `http://127.0.0.1:8000`.

### Available Routes

- `/` or `/overview` - Displays the product catalog.
- `/product/{slug}` - Displays details of a specific product.
- `/api` - Returns product data in JSON format.

## Dependencies

- [Node.js](https://nodejs.org/)
- [slugify](https://www.npmjs.com/package/slugify) - Used to generate URL-friendly slugs.
- [nodemon](https://www.npmjs.com/package/nodemon) (for development) - Automatically restarts the server on file changes.

## Credits

- **Jonas Schmedtmann**: The original design and concept of this project are based on @[jonasschmedtmann](https://github.com/jonasschmedtmann)'s work. You can find more about him on [Twitter](https://twitter.com/jonasschmedtman).

## License

This project is licensed under the MIT License. Feel free to use it for learning purposes or in your portfolio. However, do not use it to teach or claim it as your own.
