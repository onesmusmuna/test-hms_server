import { Request, Response } from "express";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

import db from "../util/db.util";
import cr from "../util/cr.util";

export function getPatientRegister(req: Request, res: Response) {
  return res.render("auth/register.ejs");
}

export function getPatientLogin(req: Request, res: Response) {
  return res.render("auth/login.ejs");
}

export async function postPatientRegister(req: Request, res: Response) {
  const { email, plain, fname, lname } = req.body;

  try {
    const userExist = await db.patient.findFirst({ where: { email } });

    if (userExist) {
      return res.json(cr.str("bad", "user exist"));
    }

    const password = await argon2.hash(plain);

    const patient = await db.patient.create({
      data: {
        email,
        first_name: fname,
        last_name: lname,
        password,
      },
    });

    const ptoken = jwt.sign({ pid: patient.id, pcat: patient.createdAt }, process.env.P_SECRET!);

    return res
      .cookie("pt", ptoken)
      .json(cr.str("ok", `Patient ${patient.first_name} registered successfully`));
  } catch (error) {
    return res.json(cr.str("fail", "Failed to register patient"));
  }
}

export async function patientLogin(req: Request, res: Response) {
  const { email, plain } = req.body;

  try {
    const patient = await db.patient.findFirst({ where: { email } });

    if (!patient) {
      return res.json(cr.str("bad", "wrong credentials"));
    }

    const vp = await argon2.verify(patient.password, plain);

    if (!vp) {
      return res.json(cr.str("bad", "wrong credentials"));
    }

    const ptoken = jwt.sign({ pid: patient.id, pcat: patient.createdAt }, process.env.P_SECRET!);

    return res.cookie("pt", ptoken).json(cr.str("ok", `Welcome back ${patient.first_name}`));
  } catch (error) {}
}

export function logout(req: Request, res: Response) {}
