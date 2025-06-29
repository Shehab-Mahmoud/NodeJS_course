
// ----------------imports ---------------
const http = require('http');
const routes = require('./routes')

// ---------------- creating the server on port 3000 -----------------------
const server = http.createServer(routes);
console.log("ff")
server.listen(3000);
// ----------------------------------------------------------------------

