import { Router } from "express";
import {
  getAllImagesController,
  getImageByIdController,
} from "../controllers/image.controller";

const router = Router();

router.get("/", getAllImagesController);
router.get("/:id", getImageByIdController);

export default router;