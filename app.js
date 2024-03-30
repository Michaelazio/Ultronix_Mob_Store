import express from "express";
 import {apiRouter} from "./routes/api/v1/index.js";

import clientRouter from "./routes/home/index.js";
import compression from "compression";
import { connectToDb } from "./db/index.js";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";


// For locating File Path
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url));

// Express app instance 
const app = express();


app.use(cors())
app.use(express.static(join(__dirname, "client")))
app.use(express.static(join(__dirname, "client", "images")))


app.use((req, res, next) => {
  // Allow requests from any origin
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Allow specified HTTP methods
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  // Allow specified headers
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  // Continue to the next middleware
  next();
});




// For App Level Middleware
app.use(express.json());
app.use(compression());
app.use(express.urlencoded({ extended: false }));
app.use(helmet())





// Optional Middlewares
app.use(morgan(":method :url :status :response-time ms - :res[content-length]"));


// For All Routes

app.use('/api/v1', apiRouter);
app.use("/", clientRouter)

const PORT = process.env.PORT || "http://localhost:3030";





  let server;
  Promise.all([connectToDb()])
    .then(() => {
      server = app.listen(PORT, () => {
        console.log(`The Server is running on ${PORT}`);
      });
    })
    .catch((error) => {
      console.error(error);
      if (server) {
        server.close();
      }
      
      // Restart the server here
      console.log('Restarting the server...');
      server = app.listen(PORT, () => {
        console.log(`The Server has been restarted on ${PORT}`);
      });
    });
  