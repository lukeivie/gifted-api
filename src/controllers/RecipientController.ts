import { notFound, success } from "@views";
import { HttpCode } from "@types";
import { Recipient } from "@models";
import { Request, Response } from "express";

async function index(req: Request, res: Response) {
  const recipients = await Recipient.getAll(req.params.userId);

  res.status(HttpCode.OK).json(recipients);
}

async function create(req: Request, res: Response) {
  const recipient = await Recipient.create({ ...req.body, user: { connect: { id: req.params.userId } } });

  res.status(HttpCode.OK).json(success(recipient));
}

async function update(req: Request, res: Response) {
  const recipient = await Recipient.update(req.params.id, req.body);

  res.status(HttpCode.OK).json(success(recipient));
}

async function get(req: Request, res: Response) {
  const recipient = await Recipient.get(req.params.recipientId);

  if (!recipient) {
    res.status(HttpCode.NOT_FOUND).json(notFound("Recipient"));
  }

  res.status(HttpCode.OK).json(success(recipient));
}

async function remove(req: Request, res: Response) {
  const recipient = await Recipient.remove(req.params.id);

  res.status(HttpCode.OK).json(success(recipient));
}

export default { index, create, get, update, remove };
