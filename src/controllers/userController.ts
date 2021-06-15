import { Request, Response } from 'express';
import { dao } from '../dao/userDAO';
import { utils } from '../utils/utils'

class UserController {
    /**
     *  Nombre: lista
     *  Descripcion: lista de users de la base de datos
     *  Resultado: json con informacion de  users registrados.
     */
    public async lista(req: Request, res :Response) {
        const result = await dao.lista();
        res.json(result);
    }

    /**
     *  Nombre: insert
     *  Descripcion: insertar datos de un nuevo user
     *  Resultado: json con mensaje.
     */
    public async insert(req: Request, res: Response) {
        try {
            const { user, password, idRol } = req.body;
        
        // verificar parametros 
        if(user == null || password == null || idRol == null) {
            return res.status(409).json({message: "Los campos son requeridos"});
        }

        // Verificar longitud de caracteres
        
        if(user.length > 150){
            return res.status(500).json({message: "La longitud maxima del user es de 150 caracteres"});
        }

        // Verificar nombre de user
        const verify = await dao.verifyUser(user);
        if(verify.length > 0){
            return res.status(500).json({message: "El usuario ya existe"});
        }

        // Verificar Rol
        const verifyRol = await dao.verifyRol(idRol);
        if(verifyRol.length <= 0){
            return res.status(500).json({message: "El rol no existe o no esta diponible"});
        }

        // Insercion de datos
        const encryptedPassword = await utils.hashPassword(password);

        // Llenar objetos
        const userObject = {
            user,
            password : encryptedPassword,
            idRol
        }

        const result = await dao.insert(userObject);

        if(result.affectedRows > 0){
            return res.json({message: "Datos guardados exitosamente"});
        } else {
            return res.status(409).json({message: result.message});
        }
        res.json(result);
        } catch (ex) {
            res.status(500).json({message: ex.message});
        }
    }
}

export const userController = new UserController();