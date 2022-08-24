import "./process";
import cors from "cors";
import helmet from "helmet";
import routes from "@routes";
import express from "express";
import * as dotenv from "dotenv";
import { auth } from "@lib/auth";

dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT as string, 10);

app.use(auth());
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(routes);

app.listen(PORT, () => {
  console.log(`🎁 Gifted API running on http://localhost:${PORT}`);
});
