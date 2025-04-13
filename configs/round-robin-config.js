/**
 * Configuration Parameters
 * LOAD_BALANCER_PORT: Port on which the load balancer will listen
 * NUMBER_OF_SERVERS: Number of backend servers to create
 */
const LOAD_BALANCER_PORT = 3000;

const servers = [
  {
    port: 3001,
  },
  {
    port: 3002,
  },
  {
    port: 3003,
  },
  {
    port: 3004,
  },
];

module.exports = { LOAD_BALANCER_PORT, servers };
