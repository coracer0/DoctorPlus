import pool from "../database/database";
class AuthDAO {
  public async getUser(usuario: String) {
    
    const result = await pool.then(async (connection) => {
      return await connection.query("SELECT idUsuario,usuario,password,idRol FROM usuario WHERE usuario = ?", [
        usuario,
      ]);
    });
    return result;
  }
  public async getUserById(idUsuario: number) {
    const result = await pool.then(async (connection) => {
      return await connection.query("SELECT * FROM usuario WHERE idUsuario = ?", [
        idUsuario,
      ]);
    });
    return result;
  }
}
export const dao = new AuthDAO();
