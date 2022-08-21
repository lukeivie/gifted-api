import { Request, Response } from "express";
import { Wishlist } from "@models";
// import { ApiError } from "@errors";

async function index(req: Request, res: Response) {
  const wishlists = await Wishlist.getAll();

  res.status(200).json(wishlists);
}

async function create(req: Request, res: Response) {
  const wishlist = await Wishlist.create(req.body);

  res.status(200).json({ data: wishlist });
}

async function update(req: Request, res: Response) {
  const wishlist = await Wishlist.update(req.params.id, req.body);

  res.status(200).json({ data: wishlist });
}

async function get(req: Request, res: Response) {
  const wishlist = await Wishlist.getById(req.params.id);

  if (wishlist) {
    res.status(200).json({ data: wishlist });
  } else {
    res.status(404).json({ error: "Wishlist not found" });
  }
}

async function remove(req: Request, res: Response) {
  const wishlist = await Wishlist.remove(req.params.id);

  res.status(200).json({ data: wishlist });
}

export default { index, create, get, update, remove };
