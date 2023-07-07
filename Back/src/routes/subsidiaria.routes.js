const express = require('express');
const router = express.Router();
const subsidiariaController = require('../controllers/subsidiaria.controller');

router.get('/', subsidiariaController.getSubsidiarias);
router.get('/:id', subsidiariaController.getSubsidiaria);
router.post('/', subsidiariaController.createSubsidiaria);
router.delete('/:id', subsidiariaController.deleteSubsidiaria);
router.put('/:id', subsidiariaController.updateSubsidiaria);

module.exports = router;
