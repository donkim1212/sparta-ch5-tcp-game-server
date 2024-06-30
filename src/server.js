import net from "net";
import { config } from "./config/config.js";
import { onConnection } from "./events/connection.event.js";
import { initServer } from "./init/index.init.js";

const PORT = config.server.port;
const HOST = config.server.host;

const server = net.createServer(onConnection);

initServer()
  .then(() => {
    server.listen(PORT, HOST, () => {
      console.log(`Server running on ${HOST}:${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
