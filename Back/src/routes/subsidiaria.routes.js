const express = require('express');
const router = express.Router();
const subsidiariaController = require('../controllers/subsidiaria.controller');

//Definición de schemas
/**
 * @openapi
 * components:
 *   schemas:
 *     Subsidiaria:
 *       type: object
 *       properties:
 *         Id_Subsidiaria:
 *           type: number
 *           example: 1
 *         Nombre:
 *           type: string
 *           example: Subsidiaria 1
 *         Direccion:
 *           type: string
 *           example: Dirección 1
 *         Telefono:
 *           type: string
 *           example: Telefono 1
 *     SubsidiariaIn:
 *       type: object
 *       properties:
 *         nombre:
 *           type: string
 *           example: Subsidiaria Test
 *         direccion:
 *           type: string
 *           example: Direccion Test
 *         telefono:
 *           type: string
 *           example: 123456789
 */

// Endpoints
/**
 * @openapi
 * /subsidiaria/:
 *   get:
 *     tags:
 *       - Subsidiarias
 *     summary: Obtener todas las subsidiarias
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: "#/components/schemas/Subsidiaria"
 *       500:
 *          description: FAILED
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          status:
 *                              type: string
 *                              example: Error al obtener subsidiarias
 *       404:
 *          description: NOT FOUND
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          status:
 *                              type: string
 *                              example: Subsidiarias no encontradas
 */
router.get('/', subsidiariaController.getSubsidiarias);

/**
 * @openapi
 * /subsidiaria/{id}:
 *   get:
 *     tags:
 *       - Subsidiarias
 *     summary: Obtener subsidiaria por id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Id de la subsidiaria a consultar
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Subsidiaria"
 *       500:
 *          description: FAILED
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          status:
 *                              type: string
 *                              example: Error al obtener subsidiaria
 *       404:
 *          description: NOT FOUND
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          status:
 *                              type: string
 *                              example: Subsidiaria no encontrada
 */
router.get('/:id', subsidiariaController.getSubsidiaria);

/**
 * @openapi
 * /subsidiaria/:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Registrar subsidiaria nueva
 *     tags:
 *       - Subsidiarias
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SubsidiariaIn'
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
 *                   example: Subsidiaria registrada
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
 *       500:
 *         description: ERROR
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Error al crear subsidiaria
 */
router.post('/', subsidiariaController.createSubsidiaria);

/**
 * @openapi
 * /subsidiaria/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Eliminar empleado
 *     tags:
 *       - Subsidiarias
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Id de la subsidiaria a eliminar
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
 *                   example: Subsidiaria eliminada
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
 *                   example: Subsidiaria no encontrada
 *       500:
 *         description: ERROR
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Error al eliminar subsidiaria
 *                 error:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: RequestError
 *                     message:
 *                       type: string
 *                       example: The DELETE statement conflicted with the REFERENCE constraint...
 */
router.delete('/:id', subsidiariaController.deleteSubsidiaria);

/**
 * @openapi
 * /subsidiaria/{id}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Actualizar subsidiaria
 *     tags:
 *       - Subsidiarias
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Id de la subsidiaria a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SubsidiariaIn'
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
 *                   example: Subsidiaria actualizada
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
 *                   example: Subsidiaria no encontrada
 *       500:
 *         description: ERROR
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Error al actualizar subsidiaria
 */
router.put('/:id', subsidiariaController.updateSubsidiaria);

module.exports = router;
