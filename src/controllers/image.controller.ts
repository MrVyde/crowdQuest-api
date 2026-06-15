import {getAllImages, getImageById,} from "../services/image.service";
import { Request, Response } from "express";


export const getAllImagesController = async (req: Request,res: Response) => {
  try {
    const images = await getAllImages();
    res.json(images);
  } catch (err) {
    console.error("getAllImages error:", err);
    res.status(500).json({ error: "Failed to fetch images" });
  }
};

export const getImageByIdController = async (req: Request,res: Response) => {
  try {
    const { id } = req.params;

    if (!id || typeof id !== "string") {
      return res.status(400).json({ error: "Invalid image id" });
    }
    const image = await getImageById(id);

    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }

    res.json(image);
  } catch (err) {
    console.error("getImageById error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
    
    