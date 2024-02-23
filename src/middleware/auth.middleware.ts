import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import db from "../util/db.util";

export async function patientAuthMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.cookies.auth) {
      return res.json({ msg: "unauthenticated" });
    }

    const token = req.cookies.pt;
    const vt: any = jwt.verify(token, process.env.P_SECRET!);

    const patient = await db.patient.findFirst({ where: { id: vt.pid, createdAt: vt.pcat } });

    if (!patient) {
      return res.json({ msg: "unauthenticated" });
    }

    const user = { name: patient.first_name, email: patient.email };

    // @ts-ignore
    req.user = user;

    next();
  } catch (error) {
    return res.json({ msg: "unauthenticated" });
  }
}
