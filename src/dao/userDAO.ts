import pool from "../database/database";

class UserDAO {
  public async lista() {
    const result = await pool.then(async (connection) => {
      return await connection.query(
        "SELECT idUsuario,email,idRol FROM usuario"
      );
    });

    return result;
  }

  public async listaMedico() {
    const result = await pool.then(async (connection) => {
      return await connection.query(
        "Select u.idUsuario, email, nombre, apellido_paterno, apellido_materno FROM usuario u INNER JOIN medico m on m.idUsuario = u.idUsuario"
      );
    });
    return result;
  }

  public async listaPaciente(){
    const result=await pool.then(async (connection) =>{
      return await connection.query("Select u.idUsuario, email, nombre, apellido_paterno, apellido_materno FROM usuario u INNER JOIN paciente p on p.idUsuario = u.idUsuario ");
    });
    return result;
  }

  public async verifyUser(usuario: string) {
    const result = await pool.then(async (connection) => {
      return await connection.query(
        "SELECT idUsuario FROM usuario WHERE email = ?",
        [usuario]
      );
    });
    return result;
  }
  public async verifyRol(idRol: number) {
    const result = await pool.then(async (connection) => {
      return await connection.query("SELECT * FROM rol WHERE idRol = ?", [
        idRol,
      ]);
    });
    return result;
  }

  public async insert(usuario: any) {
    const result = await pool.then(async (connection) => {
      return await connection.query("INSERT INTO usuario set ?", [usuario]);
    });
    return result;
  }
}
export const dao = new UserDAO();
