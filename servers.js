const http = require("http");

const createServer = (serverConfig, STRATEGY) => {
  let { port, timeout } = serverConfig;

  // ignore the timeout for round-robin and weighted-round-robin
  if (STRATEGY === "round-robin" || STRATEGY === "weighted-round-robin") {
    timeout = 0;
  }

  http
    .createServer((req, res) => {
      setTimeout(() => {
        res.writeHead(200, { "Content-Type": "text/plain" });
        console.log("Request handled by server on " + port);
        res.end("Request handled by server on " + port);
      }, timeout);
    })
    .listen(port, () => {
      console.log(`Server running at http://localhost:${port}/`);
    });
};

module.exports = { createServer };
