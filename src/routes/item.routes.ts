import { Router } from "express";
import * as itemController from "../controllers/item.controller";

const router = Router();

router.get("/ping", itemController.ping);
router.post("/items", itemController.createItem);
router.get("/items", itemController.getItems);
router.get("/items/:id", itemController.getItem);
router.put("/items/:id", itemController.updateItem);
router.delete("/items/:id", itemController.deleteItem);
export default router;
