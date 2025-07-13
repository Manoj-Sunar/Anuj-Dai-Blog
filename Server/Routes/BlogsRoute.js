
import express from "express";

import { authMiddleware } from "../Middleware/AuthMiddleware.js";

import { BlogLikeDetailForAll, BlogLikeDetails, BlogsCreate, CommentDeleteByIdOnlyValidUser, getAllBlogs, getAllComments, LikesBlogs, UserCanCommentToBlog } from "../Controller/BlogsController.js";


export const BlogRoutes=express.Router();

BlogRoutes.post("/create-blog",authMiddleware,BlogsCreate);

BlogRoutes.get("/get/all-blogs",getAllBlogs);

BlogRoutes.put("/blog-like/:blogId",authMiddleware,LikesBlogs);

BlogRoutes.get("/blog-like-details/:blogId",authMiddleware,BlogLikeDetails);

BlogRoutes.get("/blog-like-details-all/:blogId",BlogLikeDetailForAll);

BlogRoutes.put("/blog-comment/:blogId",authMiddleware,UserCanCommentToBlog);

BlogRoutes.get("/get-blog-comment/:blogId",getAllComments);
BlogRoutes.delete("/delete-comment/:blogId/:commentId",authMiddleware,CommentDeleteByIdOnlyValidUser);