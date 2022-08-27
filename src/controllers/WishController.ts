import { notFound, success } from "@views";
import { HttpCode } from "@types";
import { Wish } from "@models";
import { Request, Response } from "express";

async function index(req: Request, res: Response) {
  const wishes = await Wish.getAll(req.params.wishlistId);

  res.status(HttpCode.OK).json(wishes);
}

async function create(req: Request, res: Response) {
  const wishlist = await Wish.create({ ...req.body, wishlist: { connect: { id: req.params.wishlistId } } });

  res.status(HttpCode.OK).json(success(wishlist));
}

// async function update(req: Request, res: Response) {
//   const wishlist = await Wish.update(req.params.id, req.body);

//   res.status(HttpCode.OK).json(success(wishlist));
// }

// async function get(req: Request, res: Response) {
//   const wishlist = await Wish.get(req.params.id);

//   if (!wishlist) {
//     res.status(HttpCode.NOT_FOUND).json(notFound("Wish"));
//   }

//   res.status(HttpCode.OK).json(success(wishlist));
// }

// async function remove(req: Request, res: Response) {
//   const wishlist = await Wish.remove(req.params.id);

//   res.status(HttpCode.OK).json(success(wishlist));
// }

export default { index, create };
