const httpProxy = require("http-proxy");
const proxy = httpProxy.createProxyServer();

const leastConnections = (servers, req, res) => {
  // Find server with least connections
  const target = servers.reduce((min, server) => {
    server.connections = server.connections || 0;
    return server.connections < min.connections ? server : min;
  }, servers[0]);

  // Increment the connection count for the selected server
  target.connections++;

  console.log(target);

  proxy.web(req, res, { target: `http://localhost:${target.port}` }, (err) => {
    console.error("Proxy error:", err);
    target.connections--; // Make sure we decrement the connection count even if there's an error
    res.writeHead(502);
    res.end("Bad Gateway");
  });

  // Handle proxy response
  proxy.once("proxyRes", () => {
    res.on("finish", () => {
      target.connections--;
      console.log(
        `Connection to server (port: ${target.port}) finished. Now has ${target.connections} active connections`
      );
    });
  });
};

module.exports = leastConnections;
