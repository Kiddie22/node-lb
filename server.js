const http = require("http");
const { createServer } = require("./servers");
const { loadConfig } = require("./utils/loadConfig");
const roundRobin = require("./strategies/round-robin");
const leastConnections = require("./strategies/least-connections");
const weightedRoundRobin = require("./strategies/weighted-round-robin");

/**
 * Uncomment the strategy you want to test
 */
// const STRATEGY = "round-robin";
// const STRATEGY = "weighted-round-robin";
const STRATEGY = "least-connections";

// Load the configuration
const config = loadConfig(STRATEGY);
const { LOAD_BALANCER_PORT, servers: serverConfig } = config;

console.log("LOAD BALANCER TEST");
console.log("STRATEGY: ", STRATEGY);

// Create the servers
const servers = serverConfig.map((server) => ({
  ...server,
  connections: 0,
}));

servers.forEach((server) => createServer(server, STRATEGY));

// Create the load balancer
const server = http.createServer((req, res) => {
  if (STRATEGY === "round-robin") {
    roundRobin(servers, req, res);
  } else if (STRATEGY === "weighted-round-robin") {
    weightedRoundRobin(servers, req, res);
  } else if (STRATEGY === "least-connections") {
    leastConnections(servers, req, res);
  } else {
    res.writeHead(500);
    res.end("Unknown strategy");
  }
});

server.listen(LOAD_BALANCER_PORT, () => {
  console.log(
    `Load balancer running at http://localhost:${LOAD_BALANCER_PORT}/`
  );
});
