const utilities = require('../utilities');
const controller = {};

controller.login = async (req, res) => {
  const { usuario, contrasena } = req.body;
  const empleado = await utilities.executeQuery(
    `SELECT * FROM Usuarios WHERE Nombre_Usuario = '${usuario}' AND Contrasena = '${contrasena}'`
  );
  if (empleado.error) {
    res.json({ status: 'Error al obtener usuario' });
    return;
  } else if (empleado.length == 0) {
    res.json({ status: 'Usuario no encontrado' });
    return;
  }
  const token = utilities.generateToken({ ...empleado[0], isValid: true });
  res.json({ token });
};

module.exports = controller;
