const httpProxy = require("http-proxy");
const proxy = httpProxy.createProxyServer();

let currentServerIndex = 0;

const roundRobin = (servers, req, res) => {
  const totalServers = servers.length;

  // Round-robin logic
  const target = servers[currentServerIndex];
  currentServerIndex = (currentServerIndex + 1) % totalServers;

  proxy.web(req, res, { target: `http://localhost:${target.port}` }, (err) => {
    console.error("Proxy error:", err);
    res.writeHead(502);
    res.end("Bad Gateway");
  });
};

module.exports = roundRobin;
