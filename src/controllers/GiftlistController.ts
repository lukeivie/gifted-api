import { notFound, success } from "@views";
import { HttpCode } from "@types";
import { Giftlist } from "@models";
import { Request, Response } from "express";

async function index(req: Request, res: Response) {
  const giftlists = await Giftlist.getAll(req.params.userId);

  res.status(HttpCode.OK).json(giftlists);
}

async function create(req: Request, res: Response) {
  const giftlist = await Giftlist.create({ ...req.body, user: { connect: { id: req.params.userId } } });

  res.status(HttpCode.OK).json(success(giftlist));
}

async function update(req: Request, res: Response) {
  const giftlist = await Giftlist.update(req.params.id, req.body);

  res.status(HttpCode.OK).json(success(giftlist));
}

async function get(req: Request, res: Response) {
  const giftlist = await Giftlist.get(req.params.giftlistId);

  if (!giftlist) {
    res.status(HttpCode.NOT_FOUND).json(notFound("Giftlist"));
  }

  res.status(HttpCode.OK).json(success(giftlist));
}

async function remove(req: Request, res: Response) {
  const giftlist = await Giftlist.remove(req.params.id);

  res.status(HttpCode.OK).json(success(giftlist));
}

export default { index, create, get, update, remove };
