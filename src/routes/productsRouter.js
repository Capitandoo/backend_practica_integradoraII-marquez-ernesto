import { Router } from "express";
import {
  getAllController,
  getByIdController,
  createController,
  updateController,
  deleteController,
  } from '../controllers/ProductController.js';

const router = Router();

router.get('/', getAllController);
router.get('/:id', getByIdController);
router.post('/', createController);
router.put('/:id', updateController);
router.delete('/:id', deleteController);

export default router;
