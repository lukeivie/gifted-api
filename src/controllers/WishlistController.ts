import { HttpCode } from "@types";
import { Wishlist } from "@models";
import { Request, Response } from "express";

async function index(req: Request, res: Response) {
  const wishlists = await Wishlist.getAll(req.params.userId);

  res.status(HttpCode.OK).json(wishlists);
}

async function create(req: Request, res: Response) {
  const wishlist = await Wishlist.create({ ...req.body, user: { connect: { id: req.params.userId } } });
  // console.log({ wishlist });

  res.status(HttpCode.OK).json({ data: wishlist });
}

async function update(req: Request, res: Response) {
  const wishlist = await Wishlist.update(req.params.id, req.body);
  res.status(HttpCode.OK).json({ data: wishlist });
}

async function get(req: Request, res: Response) {
  const wishlist = await Wishlist.get(req.params.id);

  if (wishlist) {
    res.status(HttpCode.OK).json({ data: wishlist });
  } else {
    res.status(404).json({ error: "Wishlist not found" });
  }
}

async function remove(req: Request, res: Response) {
  const wishlist = await Wishlist.remove(req.params.id);

  res.status(HttpCode.OK).json({ data: wishlist });
}

export default { index, create, get, update, remove };
