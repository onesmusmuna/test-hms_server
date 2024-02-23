import { Request, Response } from "express";

export function getPatient(req: Request, res: Response) {
  // @ts-ignore
  const { name, email } = req.user;
  const load = { name, email };
  //   const load = { fname: "ones", email: "ones@mail.com" };

  return res.render("patient.ejs", { ld: load });
}
