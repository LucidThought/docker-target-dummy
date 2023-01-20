import { createServer as createSecureServer, Server as HttpsServer } from 'https';
import { createServer, Server as HttpServer } from 'http';
import { getSslInfo, certificatesExists } from './util/sslHandler';
import { ExpressHandler } from './express';

if (!process.env.NODE_ENV) {
  console.log("NODE_ENV is required, has not been set");
  process.exit(1);
}

const port: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;
let usingTLS : boolean = false;
let server = new ExpressHandler();

/**
 * Start HTTP/HTTPS server
 */
let httpServer: HttpServer | HttpsServer;
getSslInfo().then(sslInfo => {
  const key = sslInfo[0];
  const cert = sslInfo[1];
  const chain =  sslInfo[2];
  if (process.env.TLS_ENABLED === 'true') {
    if (!certificatesExists(sslInfo)) {
      console.error("TLS Certificates configuration could not be read");
      process.exit(1);
    }
    httpServer = createSecureServer({key: key, cert: cert+'\n'+chain}, server.getApp());
    usingTLS = true;
  } else {
    console.warn("Connection is not secure");
    httpServer = createServer(server.getApp());
  }

  httpServer.listen(port, '0.0.0.0', () => {
    console.log(
      "App is running at %s://127.0.0.1:%d in %s mode",
      usingTLS ? "https" : "http",
      port,
      process.env.NODE_ENV
    );
  })
});
