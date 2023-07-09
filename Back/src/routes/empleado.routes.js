const express = require('express');
const router = express.Router();
const empleadoController = require('../controllers/empleado.controller');

//Definición de schemas
/**
 * @openapi
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Empleado:
 *       type: object
 *       properties:
 *         Id_Empleado:
 *           type: number
 *           example: 1
 *         Nombre:
 *           type: string
 *           example: Empleado 1
 *         Apellido:
 *           type: string
 *           example: Apellido 1
 *         Usuario:
 *           type: string
 *           example: Usuario 1
 *         Rol:
 *           type: object
 *           properties:
 *             Id_Rol:
 *               type: number
 *               example: 1
 *             Nombre:
 *               type: string
 *               example: Administrador
 *         Subsidiaria:
 *           type: object
 *           properties:
 *             Id_Subsidiaria:
 *               type: number
 *               example: 1
 *             Nombre:
 *               type: string
 *               example: Subsidiaria 1
 *             Direccion:
 *               type: string
 *               example: Direccion 1
 *             Telefono:
 *               type: string
 *               example: Telefono 1
 *     EmpleadoIn:
 *       type: object
 *       properties:
 *         nombre:
 *           type: string
 *           example: Empleado 1
 *         apellido:
 *           type: string
 *           example: Apellido 1
 *         usuario:
 *           type: string
 *           example: Usuario 1
 *         rol:
 *           type: string
 *           example: 2
 *         subsidiaria:
 *           type: string
 *           example: 1
 */

// Endpoints
/**
 * @openapi
 * /empleado/:
 *   get:
 *     tags:
 *       - Empleados
 *     summary: Obtener todos los empleados
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: "#/components/schemas/Empleado"
 *       500:
 *          description: FAILED
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          status:
 *                              type: string
 *                              example: Error al obtener empleados
 *       404:
 *          description: NOT FOUND
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          status:
 *                              type: string
 *                              example: Empleado no encontrado
 */
router.get('/', empleadoController.getEmpleados);

/**
 * @openapi
 * /empleado/{id}:
 *   get:
 *     tags:
 *       - Empleados
 *     summary: Obtener empleado por id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Id del empleado a consultar
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Empleado"
 *       500:
 *          description: FAILED
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          status:
 *                              type: string
 *                              example: Error al obtener empleado
 *       404:
 *          description: NOT FOUND
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          status:
 *                              type: string
 *                              example: Empleado no encontrado
 */
router.get('/:id', empleadoController.getEmpleado);

/**
 * @openapi
 * /empleado/:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Registrar empleado nuevo
 *     tags:
 *       - Empleados
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EmpleadoIn'
 *     responses:
 *       201:
 *         description: REGISTERED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Empleado registrado
 *       400:
 *         description: BAD REQUEST
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Faltan datos
 *       401:
 *         description: UNAUTHORIZED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Error al verificar token
 *                 error:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: JsonWebTokenError
 *                     message:
 *                       type: string
 *                       example: invalid token
 *                     status:
 *                       type: number
 *                       example: 401
 *       403:
 *         description: FORBIDDEN
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Error al verificar token
 *                 error:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: Forbidden
 *                     message:
 *                       type: string
 *                       example: No tiene permisos para realizar esta accion
 *                     status:
 *                       type: number
 *                       example: 403
 *       409:
 *         description: CONFLICT
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: El usuario ya existe
 *       500:
 *         description: ERROR
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Error al obtener usuario
 */
router.post('/', empleadoController.createEmpleado);

/**
 * @openapi
 * /empleado/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Eliminar empleado
 *     tags:
 *       - Empleados
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Id del empleado a eliminar
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Empleado eliminado
 *       401:
 *         description: UNAUTHORIZED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Error al verificar token
 *                 error:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: JsonWebTokenError
 *                     message:
 *                       type: string
 *                       example: invalid token
 *                     status:
 *                       type: number
 *                       example: 401
 *       403:
 *         description: FORBIDDEN
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Error al verificar token
 *                 error:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: Forbidden
 *                     message:
 *                       type: string
 *                       example: No tiene permisos para realizar esta accion
 *                     status:
 *                       type: number
 *                       example: 403
 *       404:
 *         description: NOT FOUND
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Empleado no encontrado
 *       500:
 *         description: ERROR
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Error al eliminar empleado
 */
router.delete('/:id', empleadoController.deleteEmpleado);

/**
 * @openapi
 * /empleado/{id}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Actualizar empleado
 *     tags:
 *       - Empleados
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Id del empleado a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EmpleadoIn'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Empleado actualizado
 *       400:
 *         description: BAD REQUEST
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Faltan datos
 *       401:
 *         description: UNAUTHORIZED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Error al verificar token
 *                 error:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: JsonWebTokenError
 *                     message:
 *                       type: string
 *                       example: invalid token
 *                     status:
 *                       type: number
 *                       example: 401
 *       403:
 *         description: FORBIDDEN
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Error al verificar token
 *                 error:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: Forbidden
 *                     message:
 *                       type: string
 *                       example: No tiene permisos para realizar esta accion
 *                     status:
 *                       type: number
 *                       example: 403
 *       404:
 *         description: NOT FOUND
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Empleado no encontrado
 *       500:
 *         description: ERROR
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Error al actualizar empleado
 */
router.put('/:id', empleadoController.updateEmpleado);

module.exports = router;
