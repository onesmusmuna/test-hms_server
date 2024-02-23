import { Router } from "express";

import { patientLogin, patientRegister } from "../controller/auth.controller";

const routerPatient = Router();

routerPatient.post("/register", patientRegister);

routerPatient.post("/login", patientLogin);

export default routerPatient;
