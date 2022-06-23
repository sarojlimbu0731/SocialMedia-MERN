import express from "express";
import { createPost, getPost, getTimeLinePost, likePost, postDelete, updatePost } from "../Controllers/PostController.js";

const router = express.Router();

router.post("/", createPost)

router.get('/:id',getPost)

router.put("/:id", updatePost)

router.delete('/:id',postDelete)

router.put('/:id/like',likePost)

router.get('/:id/timeline', getTimeLinePost)

export default router;