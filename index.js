const server = require("./config/express");
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server up on port ${port} (${process.env.NODE_ENV})`);
});

module.exports = server;
