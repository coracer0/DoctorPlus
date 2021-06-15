import { NextFunction, Request, Response } from "express";
import { dao } from "../dao/authDAO";

export const checkRol = (rols: Array<number>) => {
  return async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { idUser } = res.locals.jwtPayLoad;

        const isUser = await dao.getUserById(idUser);

      for (const user of isUser) {
          if (rols.includes(user.idRol)) {
              next();              
          }else{
            res.status(404).json({ message: "No autorizado" });
          }
      }
    } catch (error) {
      res.status(404).json({ message: "No autorizado" });
    }
  };

  // (req:Request, res:Response, next:NextFunction)=>{
};
