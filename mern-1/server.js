const http = require("http")

// Hyper Text Transfer Protocol

// The callback function is run whenever the server receives a request
const server = http.createServer((req, res) => {
    // Handle incoming requests

    console.log(req.url)

    if(req.url === "/abc/def") {
        res.write("Not implemented")
        return res.end()
    }

    // Set the content type header
    res.setHeader("Content-Type", "text/html")

    res.write('<html><head><title>Node.js HTTP Server</title></head><body>');

    res.write('<h1>Hello, World!</h1>');
    res.write('</body></html>');

    // End the response
    res.end()
})

server.listen(8080, "localhost", () => {
    console.log("Server has started listening to requests")
})