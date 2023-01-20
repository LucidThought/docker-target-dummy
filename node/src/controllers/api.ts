import { Response, Request } from "express";
import fs from "fs";

export class ApiController {
  constructor() {}

  listener = async (req: Request, res: Response) => {
    console.log("LISTENER");
    console.log(req.query);
    console.log(req.body);
    console.log(req.headers);
    res.status(200).send();
  };

  pephio = async (req: Request, res: Response) => {
    console.log("PEP/HIO");
    console.log(req.query);
    console.log(req.body);
    console.log(req.headers);
    res.status(200).send();
  };

  success = async (req: Request, res: Response) => {
    console.log(req.body);
    res.status(200).send({ success: 1 });
  };

  /**
   * A PONG for your PING
   */
  ping = async (req: Request, res: Response) => {
    res.json({ message: "pong" });
  };

  /**
   * Default catch all for improper requests
   */
  notFound = async (req: Request, res: Response) => {
    console.log(
      "[" + req.ip + "]" + " Invalid request path: " + req.originalUrl
    );
    console.log("QUERY: ", req.query);
    console.log("HEADERS: ", req.headers);
    console.log("BODY: ", req.body);
    res.status(200).json({ error: "Unable to find the requested resource!" });
  };
}
