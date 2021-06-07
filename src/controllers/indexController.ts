import { Request, Response } from "express";
import pool from '../database/database'

class IndexController {
  constructor() {}

  public async lista(req: Request, res: Response): Promise<void> {
    const result = await pool.then(async(connection)=>{
      return await connection.query('SELECT * FROM rol')
    });

    res.json(result);
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
