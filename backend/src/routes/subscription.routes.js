import { Router } from "express";

import {subscribe,unSubscribe} from '../controllers/subscriptions.controller.js'
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/subscribe/:channel").post(verifyJWT,subscribe)
router.route("/unSubscribe/:channel").delete(verifyJWT,unSubscribe)

export default router

