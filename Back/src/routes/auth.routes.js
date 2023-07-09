const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

//Definición de schemas
/**
 * @openapi
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       properties:
 *         Usuario:
 *           type: string
 *           example: Usuario 1
 *         Contrasena:
 *           type: string
 *           example: Contrasena 1
 */

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Obtener credenciales del API
 *     tags:
 *       - Login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MS...
 *       401:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Usuario no encontrado
 *       500:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Error al obtener usuario
 */
router.post('/login', authController.login);

module.exports = router;
