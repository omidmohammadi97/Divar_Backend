/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Auth Modules and Routes
 */
/**
 * @swagger
 *  components:
 *      schemas:
 *        SendOTP :
 *             type: object
 *             required :
 *                  - mobilbe:
 *             properties:
 *                 mobile:
 *                       type: string
 */


/**
 * @swagger
 * /auth/sendOtp:
 *   post:
 *     summary: Send OTP to the provided phone number
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mobile: 
 *                 type: string
 *                 example: '1234567890'
 *     responses:
 *       200:
 *         description: OTP sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: OTP sent successfully
 *       400:
 *         description: Invalid phone number
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid phone number
 */

/**
 * @swagger
 * /auth/checkOtp:
 *   post:
 *     summary: Verify the provided OTP
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mobile:
 *                 type: string
 *                 example: '1234567890'
 *               code:
 *                 type: string
 *                 example: '123456'
 *     responses:
 *       200:
 *         description: OTP verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: OTP verified successfully
 *       400:
 *         description: Invalid OTP
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid OTP
 */