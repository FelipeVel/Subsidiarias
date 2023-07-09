const express = require('express');
const router = express.Router();
const controller = require('../controllers/rol.controller');

//Definición de schemas
/**
 * @openapi
 * components:
 *   schemas:
 *     Rol:
 *       type: object
 *       properties:
 *         Id_Rol:
 *           type: number
 *           example: 1
 *         Nombre:
 *           type: string
 *           example: Administrador
 */

// Endpoints
/**
 * @openapi
 * /rol/:
 *   get:
 *     tags:
 *       - Roles
 *     summary: Obtener todos los roles
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: "#/components/schemas/Rol"
 *       500:
 *          description: FAILED
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          status:
 *                              type: string
 *                              example: Error al obtener roles
 */
router.get('/', controller.getRoles);

module.exports = router;
