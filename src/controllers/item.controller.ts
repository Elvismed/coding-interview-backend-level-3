import * as itemService from "../services/item.service";
import { Request, Response } from "express";

export const ping = (_req: Request, res: Response): void => {
  res.status(200).send({ ok: true });
};

export const createItem = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newItem = await itemService.createItem(req.body);
    if (newItem && "errors" in newItem) {
      res.status(400).json(newItem);
    } else {
      res.status(201).json(newItem);
    }
  } catch (error: any) {
    res.status(400).send(error);
  }
};

export const getItems = async (req: Request, res: Response): Promise<void> => {
  try {
    const items = await itemService.getItems();
    res.status(200).json(items);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const getItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const item = await itemService.getItem(req.params.id);
    res.status(200).json(item);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const updateItem = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const updatedItem = await itemService.updateItem(req.params.id, req.body);
    if (updatedItem && "errors" in updatedItem) {
      res.status(400).json(updatedItem);
    } else {
      res.status(200).json(updatedItem);
    }
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const deleteItem = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const deletedItem = await itemService.deleteItem(req.params.id);
    res.status(200).json(deletedItem);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};
