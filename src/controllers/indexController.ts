import { Request, Response } from "express";

class IndexController {
  constructor() {}

  lista(req: Request, res: Response): void {
    res.json({ message: "GET INDEX" });
  }

  insertar(req: Request, res: Response): void {
    res.json({ message: "INSERT DATA" });
  }
  actualizar(req: Request, res: Response): void {
    res.json({ message: "UPDATE DATA" });
  }
  eliminar(req: Request, res: Response): void {
    res.json({ message: "DELETE DATA" });
  }
}
export const indexController = new IndexController();
