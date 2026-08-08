const http = require("http");
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "books.json");

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");

  if (req.url === "/books" && req.method === "GET") {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end(JSON.stringify({
          message: "Error reading books file"
        }));
        return;
      }

      res.writeHead(200);
      res.end(data);
    });
  }

  else if (req.url === "/books" && req.method === "POST") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      let newBook;

      try {
        newBook = JSON.parse(body);
      } catch (error) {
        res.writeHead(400);
        res.end(JSON.stringify({
          message: "Invalid JSON"
        }));
        return;
      }

      fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
          res.writeHead(500);
          res.end(JSON.stringify({
            message: "Error reading books file"
          }));
          return;
        }

        let books;

        try {
          books = JSON.parse(data);
        } catch (error) {
          res.writeHead(500);
          res.end(JSON.stringify({
            message: "Invalid books file"
          }));
          return;
        }

        const newId = books.length > 0
          ? books[books.length - 1].id + 1
          : 1;

        newBook.id = newId;

        books.push(newBook);

        fs.writeFile(filePath, JSON.stringify(books, null, 2), (err) => {
          if (err) {
            res.writeHead(500);
            res.end(JSON.stringify({
              message: "Error saving book"
            }));
            return;
          }

          res.writeHead(201);
          res.end(JSON.stringify(newBook));
        });
      });
    });
  }

  else if (req.url.startsWith("/books/") && req.method === "DELETE") {
    const id = Number(req.url.split("/")[2]);

    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end(JSON.stringify({
          message: "Error reading books file"
        }));
        return;
      }

      let books;

      try {
        books = JSON.parse(data);
      } catch (error) {
        res.writeHead(500);
        res.end(JSON.stringify({
          message: "Invalid books file"
        }));
        return;
      }

      const bookIndex = books.findIndex((book) => book.id === id);

      if (bookIndex === -1) {
        res.writeHead(404);
        res.end(JSON.stringify({
          message: "Book not found"
        }));
        return;
      }

      const deletedBook = books[bookIndex];

      books.splice(bookIndex, 1);

      fs.writeFile(filePath, JSON.stringify(books, null, 2), (err) => {
        if (err) {
          res.writeHead(500);
          res.end(JSON.stringify({
            message: "Error saving books file"
          }));
          return;
        }

        res.writeHead(200);
        res.end(JSON.stringify({
          message: "Book deleted successfully",
          book: deletedBook
        }));
      });
    });
  }

  else {
    res.writeHead(404);
    res.end(JSON.stringify({
      message: "Route not found"
    }));
  }
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});