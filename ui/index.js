// For express
// const {startServer} = require("../ui-server/lib/index")

// For NestJS
const {startServer} = require("../ui-server--nest/lib/main");

// Comment out one of the imports based on which server is to be ran
module.exports.default = startServer;
startServer();