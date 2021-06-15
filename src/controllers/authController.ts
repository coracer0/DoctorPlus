import { Request,Response } from "express";
import jwt from 'jsonwebtoken';
import secretKey from '../config/jwtKeys';
import { dao } from "../dao/authDAO";
import {utils} from '../utils/utils';

class AuthController{

    public async login(req:Request, res:Response){
        const{user,password} = req.body;
        

        if(user == null || password == null ){
            return res.status(400).json({message: "Usuario y Contraseña incorrecta"});
        }

        const users = await dao.getUser(user);

        if (users.length <=0){
            return res.status(400).json({message:'El usuario no existe'});
        }

        for (const user of users) {
            if(await utils.checkPassword(password,user.password)){
                const token = jwt.sign({idUser: user.idUser, user,idRol: user.idRol},secretKey.jwtSecret,{expiresIn: '1h'});
                return res.json({message:'OK',token,idUser: user.idUser,user,idRol: user.idRol});
            }else{
                return res.status(400).json({message:"La contraseña es incorrecta"});
            }
        }

    }
}
export const authController =new AuthController();
