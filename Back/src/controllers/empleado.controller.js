const utilities = require('../utilities');
const controller = {};

controller.getEmpleados = async (req, res) => {
  const empleados = await utilities.executeQuery('SELECT * FROM Empleados');
  if (empleados.error) {
    res.json({ status: 'Error al obtener empleados' });
    return;
  } else if (empleados.length == 0) {
    res.json({ status: 'Empleado no encontrado' });
    return;
  }
  res.json(empleados);
};

controller.getEmpleado = async (req, res) => {
  const { id } = req.params;
  const empleado = await utilities.executeQuery(
    `SELECT * FROM Empleados WHERE Id_Empleado = ${id}`
  );
  if (empleado.error) {
    res.json({ status: 'Error al obtener empleado' });
    return;
  } else if (empleado.length == 0) {
    res.json({ status: 'Empleado no encontrado' });
    return;
  }
  res.json(empleado[0]);
};

controller.createEmpleado = async (req, res) => {
  const adminPermissions = utilities.verifyAdminToken(
    req.headers.authorization?.split(' ')[1] || ''
  );
  if (adminPermissions.error) {
    res.json({ status: 'Error al verificar token', error: adminPermissions.error });
    return;
  }
  const { nombre, apellido, fechaNacimiento, usuario, contrasena, rol, subsidiaria } = req.body;
  const empleado = await utilities.executeTransaction([
    `INSERT INTO Empleados (Nombre, Apellido, Fecha_Nacimiento, Id_Subsidiaria) VALUES ('${nombre}', '${apellido}', '${fechaNacimiento}', ${subsidiaria})`,
    `INSERT INTO Usuarios (Nombre_Usuario, Contrasena, Rol, Empleado) VALUES ('${usuario}', '${contrasena}', '${rol}', (SELECT MAX(Id_Empleado) FROM Empleados))`,
  ]);
  if (empleado.error) {
    res.json({ status: 'Error al registrar empleado' });
    return;
  }
  res.json({ status: 'Empleado registrado' });
};

controller.deleteEmpleado = async (req, res) => {
  const adminPermissions = utilities.verifyAdminToken(
    req.headers.authorization?.split(' ')[1] || ''
  );
  if (adminPermissions.error) {
    res.json({ status: 'Error al verificar token', error: adminPermissions.error });
    return;
  }
  const { id } = req.params;
  const datosUsuario = await utilities.executeQuery(
    `SELECT * FROM Usuarios WHERE Empleado = ${id}`
  );
  if (datosUsuario.error) {
    res.json({ status: 'Error al obtener usuario' });
    return;
  } else if (datosUsuario.length === 0) {
    res.json({ status: 'Usuario no encontrado' });
    return;
  }
  const empleado = await utilities.executeTransaction([
    `DELETE FROM Usuarios WHERE Id_Usuario = ${datosUsuario[0].Id_Usuario}`,
    `DELETE FROM Empleados WHERE Id_Empleado = ${id}`,
  ]);
  if (empleado.error) {
    res.json({ status: 'Error al eliminar empleado' });
    return;
  }
  res.json({ status: 'Empleado eliminado' });
};

controller.updateEmpleado = async (req, res) => {
  console.log('Token: ', req.headers.authorization?.split(' ')[1]);
  const adminPermissions = utilities.verifyAdminToken(
    req.headers.authorization?.split(' ')[1] || ''
  );
  if (adminPermissions.error) {
    console.log('Obj: ', adminPermissions);
    res.json({ status: 'Error al verificar token', error: adminPermissions.error });
    return;
  }
  const { id } = req.params;
  const { nombre, apellido, fechaNacimiento, rol, idSubsidiaria } = req.body;
  let query = `UPDATE Empleados SET `;
  if (nombre) query += `Nombre = '${nombre}', `;
  if (apellido) query += `Apellido = '${apellido}', `;
  if (fechaNacimiento) query += `FechaNacimiento = '${fechaNacimiento}', `;
  if (rol) query += `Rol = '${rol}', `;
  if (idSubsidiaria) query += `Id_Subsidiaria = ${idSubsidiaria}, `;
  query = query.slice(0, -2);
  query += ` WHERE Id_Empleado = ${id}`;
  const empleado = await utilities.executeQuery(query);
  if (empleado.error) {
    res.json({ status: 'Error al actualizar empleado' });
    return;
  }
  res.json({ status: 'Empleado actualizado' });
};

module.exports = controller;
