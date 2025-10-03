const routes = require("../routes/userRoutes");

function app(req, res) {

   if (req.url.startsWith("/users/")) {
    const id = req.url.split("/")[2]; // extract id from URL
    return routes(req, res, id);
  }
    if (req.url.startsWith("/users")) {
    return routes(req, res);
  }

  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("Route Not Found");
}

module.exports = app;
