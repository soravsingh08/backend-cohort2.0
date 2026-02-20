const express = require("express")
const postRouter =express.Router()
const postController = require("../controllers/post.controller")
const multer =  require("multer")
const upload = multer({storage:multer.memoryStorage()})


/**
 * POST /api/posts [protected]
 * - req.body ={caption,image-file}
 */

postRouter.post("/",upload.single("image"), postController.createPostController)

/**
 * GET /api/posts/ [protected]
 */
postRouter.get("/",postController.getPostController)

/**
 * GET /api/posts/details/:postid
 * - return an detail avout specific post with the id. 
 * also check weather the post belong to the user that the request come from
 */

postRouter.get("/details/:postId",postController.getPostDetailsController)

module.exports = postRouter