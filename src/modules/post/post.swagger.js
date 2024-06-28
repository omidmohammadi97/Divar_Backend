/**
 * @swagger
 * tags:
 *   name: Post
 *   description: Post Modules and Routes
 */
/**
 * @swagger
 *  components:
 *      schemas:
 *        get info 
 */


/**
 * @swagger
 * /post/getInfo:
 *   get:
 *     summary: get user information
 *     tags: [Post]
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

