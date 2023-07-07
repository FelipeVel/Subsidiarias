const utilities = require('../utilities');
const controller = {};

controller.getSubsidiarias = async (req, res) => {
  const subsidiarias = await utilities.executeQuery('SELECT * FROM Subsidiarias');
  if (subsidiarias.error) {
    res.json({ status: 'Error al obtener subsidiarias' });
    return;
  } else if (subsidiarias.length == 0) {
    res.json({ status: 'Subsidiaria no encontrado' });
    return;
  }
  res.json(subsidiarias);
};

controller.getSubsidiaria = async (req, res) => {
  const { id } = req.params;
  const subsidiaria = await utilities.executeQuery(
    `SELECT * FROM Subsidiarias WHERE Id_Subsidiaria = ${id}`
  );
  if (subsidiaria.error) {
    res.json({ status: 'Error al obtener subsidiaria' });
    return;
  } else if (subsidiaria.length == 0) {
    res.json({ status: 'Subsidiaria no encontrado' });
    return;
  }
  res.json(subsidiaria[0]);
};

controller.createSubsidiaria = async (req, res) => {
  const adminPermissions = utilities.verifyAdminToken(
    req.headers.authorization?.split(' ')[1] || ''
  );
  if (adminPermissions.error) {
    res.json({ status: 'Error al verificar token', error: adminPermissions.error });
    return;
  }
  const { nombre, direccion, telefono } = req.body;
  const subsidiaria = await utilities.executeQuery(
    `INSERT INTO Subsidiarias (Nombre, Direccion, Telefono) VALUES ('${nombre}', '${direccion}', '${telefono}')`
  );
  if (subsidiaria.error) {
    res.json({ status: 'Error al crear subsidiaria' });
    return;
  }
  res.json({ status: 'Subsidiaria creado' });
};

controller.deleteSubsidiaria = async (req, res) => {
  const adminPermissions = utilities.verifyAdminToken(
    req.headers.authorization?.split(' ')[1] || ''
  );
  if (adminPermissions.error) {
    res.json({ status: 'Error al verificar token', error: adminPermissions.error });
    return;
  }
  const { id } = req.params;
  const subsidiaria = await utilities.executeQuery(
    `DELETE FROM Subsidiarias WHERE Id_Subsidiaria = ${id}`
  );
  if (subsidiaria.error) {
    res.json({ status: 'Error al eliminar subsidiaria' });
    return;
  }
  res.json({ status: 'Subsidiaria eliminado' });
};

controller.updateSubsidiaria = async (req, res) => {
  const adminPermissions = utilities.verifyAdminToken(
    req.headers.authorization?.split(' ')[1] || ''
  );
  if (adminPermissions.error) {
    res.json({ status: 'Error al verificar token', error: adminPermissions.error });
    return;
  }
  const { id } = req.params;
  const { nombre, direccion, telefono } = req.body;
  let query = `UPDATE Subsidiarias SET `;
  if (nombre) query += `Nombre = '${nombre}', `;
  if (direccion) query += `Direccion = '${direccion}', `;
  if (telefono) query += `Telefono = '${telefono}', `;
  query = query.slice(0, -2);
  query += ` WHERE Id_Subsidiaria = ${id}`;
  const subsidiaria = await utilities.executeQuery(query);
  if (subsidiaria.error) {
    res.json({ status: 'Error al actualizar subsidiaria' });
    return;
  }
  res.json({ status: 'Subsidiaria actualizado' });
};

module.exports = controller;
