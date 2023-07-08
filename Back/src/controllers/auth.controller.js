const utilities = require('../utilities');
const controller = {};

controller.login = async (req, res) => {
  const { usuario, contrasena } = req.body;
  const empleado = await utilities.executeQuery(
    `SELECT * FROM Empleados WHERE Usuario = '${usuario}' AND Contrasena = '${contrasena}'`
  );
  if (empleado.error) {
    res.status(500).json({ status: 'Error al obtener usuario' });
    return;
  } else if (empleado.length == 0) {
    res.status(404).json({ status: 'Usuario no encontrado' });
    return;
  }
  const token = utilities.generateToken({ ...empleado[0], isValid: true });
  res.json({ token, usuario: empleado[0].Nombre_Usuario });
};

module.exports = controller;
