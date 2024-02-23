import { Router } from "express";

import { getHome } from "./controller/home.controller";
import { getPatientLogin, getPatientRegister, postPatientRegister } from "./controller/auth.controller";

const router = Router();

router.route("/").get(getHome);

router.route("/auth/register").get(getPatientRegister).post(postPatientRegister);

router.route("/auth/login").get(getPatientLogin);

export default router;
