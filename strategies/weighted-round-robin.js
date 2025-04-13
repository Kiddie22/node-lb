const httpProxy = require("http-proxy");
const proxy = httpProxy.createProxyServer();

const createWeightedList = (servers) => {
  const weightedServers = [];

  servers.forEach((server) => {
    for (let i = 0; i < server.weight; i++) {
      weightedServers.push(server);
    }
  });

  return weightedServers;
};

let currentServerIndex = 0;

const weightedRoundRobin = (servers, req, res) => {
  const weightedServers = createWeightedList(servers);
  const totalServers = weightedServers.length;

  // Similar Round-robin logic
  const target = weightedServers[currentServerIndex];
  currentServerIndex = (currentServerIndex + 1) % totalServers;

  proxy.web(req, res, { target: `http://localhost:${target.port}` }, (err) => {
    console.error("Proxy error:", err);
    res.writeHead(502);
    res.end("Bad Gateway");
  });
};

module.exports = weightedRoundRobin;
