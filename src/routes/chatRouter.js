import { Router } from "express";
import {
  getAllController,
  getByIdController,
  createController,
  updateController,
  deleteController,
} from "../controllers/MessagesController.js";

const router = Router();

router.get("/messages", getAllController);
router.post("/createmsg", createController);
router.get('/', (req, res) => {
  res.render('chat');
});

export default router;
