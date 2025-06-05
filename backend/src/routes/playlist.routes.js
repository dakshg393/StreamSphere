import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";

import { createPlaylist,getAllPlaylist,getPlaylistDetails,addVideoToPlaylist,removeVideoFromPlaylist,deletePlaylist } from "../controllers/playlist.controller.js";

const router = Router()

router.route("/createPlaylist").post(verifyJWT,createPlaylist)
router.route("/getAllPlaylist").get(verifyJWT,getAllPlaylist)
router.route("/getPlaylistDetails").get(verifyJWT,getPlaylistDetails)
router.route("/addVideoToPlaylist").patch(verifyJWT,addVideoToPlaylist)
router.route("/removeVideoFromPlaylist").patch(verifyJWT,removeVideoFromPlaylist)
router.route("/deletePlaylist").delete(verifyJWT,deletePlaylist)

export default router