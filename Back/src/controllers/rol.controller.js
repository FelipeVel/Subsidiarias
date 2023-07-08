const utilities = require('../utilities');
const controller = {};

controller.getRoles = async (req, res) => {
  const roles = await utilities.executeQuery('SELECT * FROM Roles');
  if (roles.error) {
    res.status(500).json({ status: 'Error al obtener roles' });
    return;
  }
  res.json(roles);
};

module.exports = controller;
