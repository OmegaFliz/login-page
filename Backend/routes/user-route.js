const express = require("express");
const Router = express.Router();
const Controller = require('../controller/user-controller')

Router.post("/signup", Controller.signUp);
Router.post("/signin", Controller.signIn);
Router.post("/:id/postdata", Controller.postData)
Router.get("/:id", Controller.getPostData)
Router.get("/:id/:post_id", Controller.getOnePost)
Router.delete("/:id/:post_id", Controller.deletePost)
Router.patch("/:post_id/update", Controller.updatePost)

module.exports = Router;
