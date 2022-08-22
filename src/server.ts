import { PrismaClient } from "@prisma/client";
import cors from "cors";
import helmet from "helmet";
import routes from "@routes";
import express from "express";
import "express-async-errors";
import * as dotenv from "dotenv";
import session from "express-session";
import { errorHandler } from "@middleware/ErrorMiddleware";
import { notFoundHandler } from "@middleware/NotFoundMiddleware";
import { auth, requiredScopes } from "express-oauth2-jwt-bearer";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { handleSession } from "@middleware/SessionMiddleware";

dotenv.config();

declare module "express-session" {
  export interface SessionData {
    user: { [key: string]: any };
  }
}

const app = express();
const PORT = parseInt(process.env.PORT as string, 10);
const audience = process.env.AUTH0_AUDIENCE!;
const issuerBaseURL = process.env.ISSUER_BASE_URL!;

const checkJwt = auth({
  audience,
  issuerBaseURL,
});

const checkScopes = (scopes: string) => requiredScopes(scopes);

app.use(auth());
app.use(
  session({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
    secret: "a santa at nasa",
    resave: false,
    saveUninitialized: true,
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 2 * 60 * 1000,
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(handleSession);

app.use("/api", checkJwt, checkScopes("read:wishlists"), routes);

app.use(errorHandler);
app.use(notFoundHandler);

app.listen(PORT, () => {
  console.log(`🎁 Gifted API running on http://localhost:${PORT}`);
});
