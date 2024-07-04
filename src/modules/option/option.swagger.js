/**
 * @swagger
 * tags:
 *   name: Option
 *   description: Option Modules and Routes
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     CreateOption:
 *       type: object
 *       required: 
 *         - title 
 *         - key 
 *         - type 
 *         - category 
 *       properties:
 *         title:
 *             type: string
 *         key:
 *             type: string
 *         category:
 *             type: string
 *         guid:
 *             type: string
 *         type:
 *             type: string
 *             enum: 
 *                 - number  
 *                 - string  
 *                 - boolean  
 *                 - array  
 *         enum:
 *             type: array
 *             items: 
 *                 type: string
 */
/**
 * @swagger
 * /option/createOption:
 *   post:
 *     summary: Create new option for category
 *     tags: [Option]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateOption'
 *         application/x-www-form-urlencoded:
 *            schema:
 *             $ref: '#/components/schemas/CreateOption'
 *          
 *     responses:
 *       201:
 *         description: Option has been created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Option has been created successfully
 *       400:
 *         description: Some errors have been returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Some errors have been returned
 */
/**
 * @swagger
 * /option/Bycategory/{categoryId}:
 *   get:
 *     summary: Get all Options for a category
 *     tags: [Option]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         schema:
 *           type: string
 *         description: The ID of the category to retrieve options for
 *     responses:
 *       200:
 *         description: All data has been returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: All data has been returned
 *       400:
 *         description: Some errors have been returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Some errors have been returned
 */
/**
 * @swagger
 * /option/{Id}:
 *   get:
 *     summary: Get one option by Id
 *     tags: [Option]
 *     parameters:
 *       - in: path
 *         name: Id
 *         schema:
 *           type: string
 *         description: The ID of the option 
 *     responses:
 *       200:
 *         description: All data has been returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: All data has been returned
 *       400:
 *         description: Some errors have been returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Some errors have been returned
 */
/**
 * @swagger
 * /option/Bycategory-slug/{slug}:
 *   get:
 *     summary: Get one option by slug
 *     tags: [Option]
 *     parameters:
 *       - in: path
 *         name: slug
 *         schema:
 *           type: string
 *         description: The slug of the option 
 *     responses:
 *       200:
 *         description: All data has been returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: All data has been returned
 *       400:
 *         description: Some errors have been returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Some errors have been returned
 */
/**
 * @swagger
 * /option/:
 *   get:
 *     summary: Get All options
 *     tags: [Option]
 *     responses:
 *       200:
 *         description: All data has been returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: All data has been returned
 *       400:
 *         description: Some errors have been returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Some errors have been returned
 */
/**
 * @swagger
 * /option/{Id}:
 *   delete:
 *     summary: delete one option by Id
 *     tags: [Option]
 *     parameters:
 *       - in: path
 *         name: Id
 *         schema:
 *           type: string
 *         description: The ID of the option 
 *     responses:
 *       200:
 *         description: option removed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: option removed
 *       400:
 *         description: Some errors have been returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Some errors have been returned
 */