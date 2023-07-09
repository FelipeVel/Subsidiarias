const utilities = require('../utilities');
const controller = {};

controller.getEmpleados = async (req, res) => {
  const subsidiarias = await utilities.executeQuery('SELECT * FROM Subsidiarias');
  if (subsidiarias.error) {
    res.status(500).json({ status: 'Error al obtener subsidiarias' });
    return;
  }
  const roles = await utilities.executeQuery('SELECT * FROM Roles');
  if (roles.error) {
    res.status(500).json({ status: 'Error al obtener roles' });
    return;
  }
  const empleados = await utilities.executeQuery('SELECT * FROM Empleados');
  if (empleados.error) {
    res.status(500).json({ status: 'Error al obtener empleados' });
    return;
  } else if (empleados.length == 0) {
    res.status(404).json({ status: 'Empleado no encontrado' });
    return;
  }
  empleados.map((empleado) => {
    empleado.Subsidiaria = subsidiarias.find(
      (subsidiaria) => subsidiaria.Id_Subsidiaria === empleado.Id_Subsidiaria
    );
    delete empleado.Id_Subsidiaria;
    empleado.Rol = roles.find((rol) => rol.Id_Rol === empleado.Rol);
    delete empleado.Contrasena;
  });
  res.status(200).json(empleados);
};

controller.getEmpleado = async (req, res) => {
  const { id } = req.params;
  const empleado = await utilities.executeQuery(
    `SELECT * FROM Empleados WHERE Id_Empleado = ${id}`
  );
  if (empleado.error) {
    res.status(500).json({ status: 'Error al obtener empleado' });
    return;
  } else if (empleado.length == 0) {
    res.status(404).json({ status: 'Empleado no encontrado' });
    return;
  }
  const subsidiaria = await utilities.executeQuery(
    `SELECT * FROM Subsidiarias WHERE Id_Subsidiaria = ${empleado[0].Id_Subsidiaria}`
  );
  if (subsidiaria.error) {
    res.status(500).json({ status: 'Error al obtener subsidiaria' });
    return;
  }
  empleado[0].Subsidiaria = subsidiaria[0];
  delete empleado[0].Id_Subsidiaria;
  const rol = await utilities.executeQuery(`SELECT * FROM Roles WHERE Id_Rol = ${empleado[0].Rol}`);
  empleado[0].Rol = rol[0];
  delete empleado[0].Contrasena;
  res.json(empleado[0]);
};

controller.createEmpleado = async (req, res) => {
  const { nombre, apellido, usuario, contrasena, rol, subsidiaria } = req.body;
  if (!nombre || !apellido || !usuario || !contrasena || !rol || !subsidiaria) {
    res.status(400).json({ status: 'Faltan datos' });
    return;
  }
  const adminPermissions = utilities.verifyAdminToken(
    req.headers.authorization?.split(' ')[1] || ''
  );
  if (adminPermissions.error) {
    console.log('Error: ', adminPermissions.error);
    res
      .status(adminPermissions.error.status)
      .json({ status: 'Error al verificar token', error: adminPermissions.error });
    return;
  }
  const usuarioExistente = await utilities.executeQuery(
    `SELECT * FROM Empleados WHERE Usuario = '${usuario}'`
  );
  if (usuarioExistente.error) {
    console.log('Error: ', usuarioExistente.error);
    res.status(500).json({ status: 'Error al registrar empleado' });
    return;
  } else if (usuarioExistente.length > 0) {
    console.log('Usuario existente:', usuarioExistente);

    res.status(409).json({ status: 'El usuario ya existe' });
    return;
  }
  const empleado = await utilities.executeQuery(
    `INSERT INTO Empleados (Nombre, Apellido, Usuario, Id_Subsidiaria, Contrasena, Rol) VALUES ('${nombre}', '${apellido}', '${usuario}', ${subsidiaria}, '${contrasena}', ${rol})`
  );
  if (empleado.error) {
    console.log('Error: ', empleado.error);
    res.status(500).json({ status: 'Error al registrar empleado' });
    return;
  }
  res.status(201).json({ status: 'Empleado registrado' });
};

controller.deleteEmpleado = async (req, res) => {
  const adminPermissions = utilities.verifyAdminToken(
    req.headers.authorization?.split(' ')[1] || ''
  );
  if (adminPermissions.error) {
    res
      .status(adminPermissions.error.status)
      .json({ status: 'Error al verificar token', error: adminPermissions.error });
    return;
  }
  const { id } = req.params;
  const empleado = await utilities.executeQuery(`DELETE FROM Empleados WHERE Id_Empleado = ${id}`);
  if (empleado.error) {
    res.status(500).json({ status: 'Error al eliminar empleado' });
    return;
  } else if (empleado.rowsAffected[0] === 0) {
    res.status(404).json({ status: 'Empleado no encontrado' });
    return;
  }
  res.json({ status: 'Empleado eliminado' });
};

controller.updateEmpleado = async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, usuario, contrasena, rol, idSubsidiaria } = req.body;
  if (!nombre && !apellido && !usuario && !contrasena && !rol && !idSubsidiaria) {
    res.status(400).json({ status: 'Faltan datos' });
    return;
  }
  const adminPermissions = utilities.verifyAdminToken(
    req.headers.authorization?.split(' ')[1] || ''
  );
  if (adminPermissions.error) {
    res
      .status(adminPermissions.error.status)
      .json({ status: 'Error al verificar token', error: adminPermissions.error });
    return;
  }
  let query = `UPDATE Empleados SET `;
  if (nombre) query += `Nombre = '${nombre}', `;
  if (apellido) query += `Apellido = '${apellido}', `;
  if (rol) query += `Rol = '${rol}', `;
  if (idSubsidiaria) query += `Id_Subsidiaria = ${idSubsidiaria}, `;
  if (usuario) query += `Usuario = '${usuario}', `;
  if (contrasena) query += `Contrasena = '${contrasena}', `;
  query = query.slice(0, -2);
  query += ` WHERE Id_Empleado = ${id}`;
  const empleado = await utilities.executeQuery(query);
  if (empleado.error) {
    res.status(500).json({ status: 'Error al actualizar empleado' });
    return;
  } else if (empleado.rowsAffected[0] === 0) {
    res.status(404).json({ status: 'Empleado no encontrado' });
    return;
  }
  res.json({ status: 'Empleado actualizado' });
};

module.exports = controller;
