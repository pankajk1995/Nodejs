const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
    if (req.url == "/home") {
        res.end("Welcome to home page!");
    } else if (req.url == "/about") {
        res.end("This is About Page");
    } else if (req.url == "/service") {
        res.end("This is service page");
    } else if (req.url == "/product") {
        fs.readFile("./db.json", "utf8", (err, data) => {
            if (err) {
                res.end("err");
            } else {
                const productdata = JSON.parse(data);
                res.end(JSON.stringify(productdata.product));
            }
        });
    } else if (req.url == "/user") {
        fs.readFile("./db.json", "utf8", (err, data) => {
            if (err) {
                res.end("err");
            } else {
                const userdata = JSON.parse(data);
                res.end(JSON.stringify(userdata.user));
            }
        });
    } else {
        res.end("Page Not Found 404");
    }
});

server.listen(8080, () => {
    console.log("server is running on port 8080");
});
