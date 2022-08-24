import "express-async-errors";
import { checkJwt } from "@lib/auth";
import { errorHandler } from "@exceptions";
import { WishlistController } from "@controllers";
import express, { NextFunction, Request, Response } from "express";

const router = express.Router();
const apiRouter = express.Router();
const usersRouter = express.Router({ mergeParams: true });

// main
router.use("/api", apiRouter);

// scoped by user
apiRouter.use("/users/:userId", usersRouter);

// wishlists
// usersRouter.get("/", UserController.index);
usersRouter.get("/wishlists", WishlistController.index);
usersRouter.get("/wishlists/:wishlistId", WishlistController.get);
usersRouter.put("/wishlists/:wishlistId", WishlistController.update);
usersRouter.post("/wishlists", WishlistController.create);
usersRouter.delete("/wishlists/:wishlistId", WishlistController.remove);

router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  errorHandler.handleError(err, res);
});

export default router;
