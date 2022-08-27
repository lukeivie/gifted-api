import { notFound, success } from "@views";
import { HttpCode } from "@types";
import { Wishlist } from "@models";
import { Request, Response } from "express";

async function index(req: Request, res: Response) {
  const wishlists = await Wishlist.getAll(req.params.userId, req.query.includeWishes ? true : false);

  res.status(HttpCode.OK).json(wishlists);
}

async function create(req: Request, res: Response) {
  const wishlist = await Wishlist.create({ ...req.body, user: { connect: { id: req.params.userId } } });

  res.status(HttpCode.OK).json(success(wishlist));
}

async function update(req: Request, res: Response) {
  const wishlist = await Wishlist.update(req.params.id, req.body);

  res.status(HttpCode.OK).json(success(wishlist));
}

async function get(req: Request, res: Response) {
  const wishlist = await Wishlist.get(req.params.wishlistId);

  if (!wishlist) {
    res.status(HttpCode.NOT_FOUND).json(notFound("Wishlist"));
  }

  res.status(HttpCode.OK).json(success(wishlist));
}

async function remove(req: Request, res: Response) {
  const wishlist = await Wishlist.remove(req.params.id);

  res.status(HttpCode.OK).json(success(wishlist));
}

export default { index, create, get, update, remove };
