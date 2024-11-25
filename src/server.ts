import express, { Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { connectDB } from "./config/database";
import { errorHandler } from "./middlewares/errorMiddleware";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger";
import routes from "./routes";
import http from "http";
import { Server as SocketIOServer } from "socket.io";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());

app.use(bodyParser.json());

// Créer le serveur HTTP et l'intégrer à Socket.io
const server = http.createServer(app);
const io = new SocketIOServer(server);

connectDB();

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/", routes);

io.on("connection", (socket) => {
  console.log("A user connected");

  // Événement pour la mise à jour d'un produit
  socket.on("update_product", (updatedProduct) => {
    console.log("Product updated:", updatedProduct);

    // Émettre un événement à tous les clients pour mettre à jour la liste des produits
    io.emit("product_updated", updatedProduct);
  });

  // Lorsque la connexion est fermée
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

app.use((err: any, req: Request, res: Response) => {
  console.error(err.stack);
  res.status(500).send({ message: "Something went wrong!" });
});

app.use(errorHandler);

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
