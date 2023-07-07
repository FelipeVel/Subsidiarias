const sql = require('mssql');
const jwt = require('jsonwebtoken');
const jwtDecode = require('jwt-decode');
const utilities = {};
const connectionConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: true,
    enableArithAbort: true,
    trustServerCertificate: true,
  },
};

utilities.executeQuery = async (query, res) => {
  try {
    console.log('Conectando BD');
    await sql.connect(connectionConfig);
    console.log('Ejecutando consulta: ', query);
    const result = await sql.query(query);
    console.log('Resultado', result);
    return result.recordset || [];
  } catch (error) {
    return { error };
  } finally {
    sql.close();
  }
};

utilities.executeTransaction = async (querys, res) => {
  let transaction;
  try {
    console.log('Conectando BD');
    await sql.connect(connectionConfig);
    console.log('Ejecutando transaccion: ', querys);
    transaction = new sql.Transaction();
    await transaction.begin();
    for (const query of querys) {
      console.log('Ejecutando consulta: ', query);
      await transaction.request().query(query);
    }
    await transaction.commit();
    console.log('Transaccion exitosa');
    return { status: 'Transaccion exitosa' };
  } catch (error) {
    transaction?.rollback();
    console.log('Transaccion fallida');
    return { error };
  } finally {
    sql.close();
  }
};

utilities.generateToken = (empleado) => {
  const token = jwt.sign(
    {
      id: empleado.Id_Empleado,
      nombre: empleado.Nombre,
      apellido: empleado.Apellido,
      fechaNacimiento: empleado.Fecha_Nacimiento,
      rol: empleado.Rol,
      subsidiaria: empleado.Id_Subsidiaria,
    },
    process.env.JWT_SECRET
  );
  return token;
};

utilities.verifyAdminToken = (token = undefined) => {
  try {
    const decoded = token ? jwt.verify(token, process.env.JWT_SECRET) : { rol: 0 };
    console.log('Decoded: ', decoded);
    if (decoded.rol !== 1) {
      return { error: 'No tiene permisos para realizar esta accion' };
    }
    return decoded;
  } catch (error) {
    return { error };
  }
};

module.exports = utilities;
