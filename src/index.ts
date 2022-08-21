import cors from "cors";
import helmet from "helmet";
import routes from "@routes";
import express from "express";
import "express-async-errors";
import * as dotenv from "dotenv";
import { errorHandler } from "@middleware/ErrorMiddleware";
import { notFoundHandler } from "@middleware/NotFoundMiddleware";

dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT as string, 10);

app.use(helmet());
app.use(cors());
app.use(express.json());

// app.use(checkJwt);
app.use("/api", routes);

app.use(errorHandler);
app.use(notFoundHandler);

app.listen(PORT, () => {
  console.log(`🎁 Gifted API running on http://localhost:${PORT}`);
});
