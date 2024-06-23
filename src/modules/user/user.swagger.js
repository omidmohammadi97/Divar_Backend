/**
 * @swagger
 * tags:
 *   name: User
 *   description: User Modules and Routes
 */
/**
 * @swagger
 *  components:
 *      schemas:
 *        get info 
 */


/**
 * @swagger
 * /user/getInfo:
 *   get:
 *     summary: get user information
 *     tags: [User]
 *     
 *     responses:
 *       200:
 *         description: get user profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example:  get user info successfully
 *       400:
 *         description: user not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: user not found
 */

