import { Router } from "express";

import { getHome } from "./controller/home.controller";

const router = Router();

router.route("/").get(getHome);

export default router;
