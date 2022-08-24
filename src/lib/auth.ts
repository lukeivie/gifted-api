import { auth, requiredScopes } from "express-oauth2-jwt-bearer";
import * as dotenv from "dotenv";

dotenv.config();

const audience = process.env.AUTH0_AUDIENCE!;
const issuerBaseURL = process.env.ISSUER_BASE_URL!;

const checkJwt = auth({
  audience,
  issuerBaseURL,
});

const checkScopes = (scopes: string) => requiredScopes(scopes);

export { checkJwt, checkScopes, auth };
