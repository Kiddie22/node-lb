/**
 * Configuration Parameters
 * LOAD_BALANCER_PORT: Port on which the load balancer will listen
 * NUMBER_OF_SERVERS: Number of backend servers to create
 */
const LOAD_BALANCER_PORT = 3000;

const servers = [
  {
    port: 3001,
    weight: 2,
  },
  {
    port: 3002,
    weight: 1,
  },
  {
    port: 3003,
    weight: 1,
  },
  {
    port: 3004,
    weight: 3,
  },
];

module.exports = { LOAD_BALANCER_PORT, servers };
