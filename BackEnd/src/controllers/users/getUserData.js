const getDB = require("../../database/db");


const getUserData = async (req, res) => {
  let connect;
  const userId = req.userInfo.id;
  try {
    connect = await getDB();

    const [database] = await connect.query(
      `
              USE gym;
            `
    );

    const [data] = await connect.query(
      `
                SELECT *
                FROM users
                WHERE id=?   
            `,[userId]
    );

    if (!data) return res.status(401).json({message: "No se encontró información del usuario."});
    
    connect.release();

    res.status(200).json({
      status: "OK",
      data: data,
    });
  } catch (error) {
    console.error(error);
  }finally{
    if(connect){
        connect.release();
    }
}
};

module.exports = getUserData;
