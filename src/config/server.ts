import express, { Application, NextFunction, Request, Response } from "express";
import compression from "compression";
import cors from "cors";
import corsConfig from "./cors";
import errorHandler from "./handlers/error-handler";
import routes from "@/app/routes";
import ErrorException from "./handlers/error-exceptions";
import StatusCode from "./handlers/status-code";

class Server {
  public app: Application;
  public port: number;

  constructor() {
    this.app = express();
    this.port = process.env.PORT ? parseInt(process.env.PORT) : 3001;

    // Middlewares
    this.middlewares();

    // Manejador de errores
    this.ExceptionConfig();

    // Rutas de mi aplicación
    this.router();
  }

  middlewares() {
    // http security
    //this.app.use(helmet());

    // compression
    this.app.use(compression());

    // CORS
    this.app.use(cors(corsConfig));

    // Lectura y parseo del body
    this.app.use(express.json());

    // Directorio Público
    //this.app.use(express.static("public"));
  }
  ExceptionConfig() {
    this.app.use(errorHandler);
  }

  router() {
    this.app.use("/api", routes);
    //this.app.use("", swagger);
    this.app.use(() => {
      throw new ErrorException(StatusCode.NotFound, "Page not found");
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`listening on port ${this.port}`);
    });
  }
}

export default new Server();
