import "express-async-errors";
import { errorHandler } from "@exceptions";
import { WishlistController, WishController, GiftlistController, RecipientController } from "@controllers";
import express, { NextFunction, Request, Response } from "express";

const router = express.Router();
const apiRouter = express.Router();
const usersRouter = express.Router({ mergeParams: true });
const wishlistsRouter = express.Router({ mergeParams: true });

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
usersRouter.use("/wishlists/:wishlistId", wishlistsRouter);

usersRouter.get("/giftlists", GiftlistController.index);
usersRouter.get("/giftlists/:giftlistId", GiftlistController.get);
usersRouter.put("/giftlists/:giftlistId", GiftlistController.update);
usersRouter.post("/giftlists", GiftlistController.create);
usersRouter.delete("/giftlists/:giftlistId", GiftlistController.remove);
// usersRouter.use("/giftlists/:giftlistId", giftlistsRouter);

usersRouter.get("/recipients", RecipientController.index);
usersRouter.get("/recipients/:recipientId", RecipientController.get);
usersRouter.put("/recipients/:recipientId", RecipientController.update);
usersRouter.post("/recipients", RecipientController.create);
usersRouter.delete("/recipients/:recipientId", RecipientController.remove);

wishlistsRouter.get("/wishes", WishController.index);
wishlistsRouter.post("/wishes", WishController.create);

router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  errorHandler.handleError(err, res);
});

export default router;
