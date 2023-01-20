import cors from "cors";
import express from "express";
import helmet from "helmet";
import routes from "./routes/routes";

export class ExpressHandler {
  private app = express();
  constructor() {
    // Express configuration
    this.app.use(express.json()); // Parse incoming JSON requests
    this.app.use(helmet()); // Set some security headers
    this.app.use(cors()); // Required for swagger
    this.app.use(express.urlencoded({ extended: true })); // Parse requests of content-type - application/x-www-form-urlencoded

    // Application routes
    this.app.use("/api/v1", routes); // Setup default route and endpoints
  }

  getApp() {
    return this.app;
  }
}
