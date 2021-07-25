import pool from "../database/database";

class UserDAO {
  public async lista() {
    const result = await pool.then(async (connection) => {
      return await connection.query("SELECT idUsuario,usuario,idRol FROM usuario");
    });

    return result;
  }
  public async verifyUser(usuario: string){
      const result = await pool.then(async (connection) =>{
        return await connection.query('SELECT idUsuario FROM usuario WHERE usuario = ?',[usuario]);
      });
      return result;
  }
  public async verifyRol(idRol: number){
      const result = await pool.then(async (connection) =>{
        return await connection.query('SELECT * FROM rol WHERE idRol = ?',[idRol]);
      });
      return result;
  }

  public async insert(usuario :any){
    const result =await pool.then(async (connection)=> {
      return await connection.query('INSERT INTO usuario set ?',[usuario])
    });
    return result;
  }

}
export const dao = new UserDAO();
