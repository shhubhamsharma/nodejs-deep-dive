const http = require("http");

/**
 * About http module
 * http module is used to create server and client in nodejs
 * http module is built-in module
 * http module is used to create web server
 * http module is used to create REST API
 * http module is used to handle HTTP requests and responses
 * http module is used to handle routing
 * http module is used to handle cookies
 * http module is used to handle sessions
 * http module is used to handle file uploads
 * http module is used to handle file downloads
 * http module is used to handle form data
 * http module is used to handle JSON data
 *
 */

//Basic Server created

// const server = http.createServer((req,res)=>{
//     res.writeHead(200,{'Content-Type':'text/plain'});
//     res.end('Hello, Node.js HTTP Module');
// });

const server = http.createServer(routes);

//create manual routes
function routes(req, res) {
  if (req?.url === "/" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello, Node.js HTTP Module");
  }
  if (req?.url === "/api" && req.method === "GET") {
    const data = { name: "Shubham" };
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
  }
  if (req?.url === "/submit" && req.method === "POST") {
    const body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ receivedData: body }));
    });
  }
  if (req?.url === "/about" && req.method == "GET") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("About us page");
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Page not found");
  }
}
server.listen(3000, () => {
  console.log("Server started at 3000");
});
