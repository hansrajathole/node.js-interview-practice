const os = require('os');
const cluster = require('node:cluster');
const express = require('express');

const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
}else {
    let port = 3000
    const app = express();

    app.get('/', (req, res) => {
        res.send(`Hello from worker ${process.pid}`);
    });
    app.listen(port, () => {
        console.log(`Worker ${process.pid} started on port ${port}`);
    });

}