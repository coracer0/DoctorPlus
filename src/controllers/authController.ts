import { Request,Response } from "express";
import jwt from 'jsonwebtoken';
import secretKey from '../config/jwtKeys';
import { dao } from "../dao/authDAO";
import {utils} from '../utils/utils';

class AuthController{

    public async login(req:Request, res:Response){
        const{email,password} = req.body;
        

        if(email == null || password == null ){
            return res.status(400).json({message: "Usuario y Contraseña incorrecta"});
        }

        const usuarios = await dao.getUser(email);

        

        if (usuarios.length <=0){
            return res.status(400).json({message:'El usuario no existe'});
        }

        for (const usuario of usuarios) {
            if(await utils.checkPassword(password, usuario.password)){
                const token = jwt.sign({idUsuario: usuario.idUsuario, email,idRol: usuario.idRol, rol: usuario.rol},secretKey.jwtSecret,{expiresIn: '1h'});
                return res.json({message:'OK',token,idUser: usuario.idUser,email,idRol: usuario.idRol, rol: usuario.rol});
            }else{
                return res.status(400).json({message:"La contraseña es incorrecta"});
            }
        }

    }
}
export const authController =new AuthController();
