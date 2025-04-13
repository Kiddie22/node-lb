/**
 * Configuration Parameters
 * LOAD_BALANCER_PORT: Port on which the load balancer will listen
 * NUMBER_OF_SERVERS: Number of backend servers to create
 */
const LOAD_BALANCER_PORT = 3000;

const servers = [
  {
    port: 3001,
    timeout: 500,
  },
  {
    port: 3002,
    timeout: 800,
  },
  {
    port: 3003,
    timeout: 1,
  },
  {
    port: 3004,
    timeout: 1,
  },
];

module.exports = { LOAD_BALANCER_PORT, servers };
