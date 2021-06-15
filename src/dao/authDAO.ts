import pool from "../database/database";
class AuthDAO {
  public async getUser(user: String) {
    const result = await pool.then(async (connection) => {
      return await connection.query("SELECT * FROM user WHERE user = ?", [
        user,
      ]);
    });
    return result;
  }
  public async getUserById(idUser: number) {
    const result = await pool.then(async (connection) => {
      return await connection.query("SELECT * FROM user WHERE idUser = ?", [
        idUser,
      ]);
    });
    return result;
  }
}
export const dao = new AuthDAO();
