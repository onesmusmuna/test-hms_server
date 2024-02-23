import { Router } from "express";

import { getHome } from "./controller/home.controller";
import {
  getPatientLogin,
  getPatientRegister,
  postPatientLogin,
  postPatientRegister,
} from "./controller/auth.controller";
import { getPatient } from "./controller/patient.controller";
import { patientAuthMiddleware } from "./middleware/auth.middleware";

const router = Router();

router.route("/").get(getHome);

router.route("/auth/register").get(getPatientRegister).post(postPatientRegister);
router.route("/auth/login").get(getPatientLogin).post(postPatientLogin);

router.route("/patient").get(patientAuthMiddleware, getPatient);
// router.route("/patient").get(getPatient);

export default router;
