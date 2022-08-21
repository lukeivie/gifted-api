import "express-async-errors";
import { ErrorHandler } from "src/exceptions";
import { WishlistController } from "@controllers";
import express, { NextFunction, Request, Response } from "express";
import { checkJwt } from "@middleware/AuthMiddleware";

const app = express();
const router = express.Router();

// Wishlistt
router.get("/wishlists", WishlistController.index);
router.get("/wishlists/:id", WishlistController.get);

app.use(checkJwt);
router.put("/wishlists/:id", WishlistController.update);
router.post("/wishlists", WishlistController.create);
router.delete("/wishlists/:id", WishlistController.remove);

// router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
//   // 1. Log the error or send it to a 3rd party error monitoring software
//   logger.logError(err);

//   next(err);
// });

// router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
//   // 2. Send an email to yourself, or a message somewhere
//   messenger.sendErrorMessage(err);

//   next(err);
// });

router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log({ err });

  // 3. Lastly, handle the error
  ErrorHandler.handleError(err, res);
});

export default router;
