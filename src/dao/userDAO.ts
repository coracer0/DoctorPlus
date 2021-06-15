import pool from "../database/database";

class UserDAO {
  public async lista() {
    const result = await pool.then(async (connection) => {
      return await connection.query("SELECT iduser,user,idRol FROM user");
    });

    return result;
  }
  public async verifyUser(user: string){
      const result = await pool.then(async (connection) =>{
        return await connection.query('SELECT idUser FROM user WHERE user = ?',[user]);
      });
      return result;
  }
  public async verifyRol(idRol: number){
      const result = await pool.then(async (connection) =>{
        return await connection.query('SELECT * FROM rol WHERE idRol = ?',[idRol]);
      });
      return result;
  }

  public async insert(user:any){
    const result =await pool.then(async (connection)=> {
      return await connection.query('INSERT INTO user set ?',[user])
    });
    return result;
  }

}
export const dao = new UserDAO();
