/**
 * @swagger
 * tags:
 *   name: Category
 *   description: Category Modules and Routes
 */
/**
 * @swagger
 *  components:
 *      schemas:
 *        CreateCategory:
 *          type: object
 *          required: 
 *            - name 
 *            - icon 
 *          properties:
 *            name:
 *              type: string
 *              description: The name of the category
 *            slug:
 *              type: string
 *              description: The slug of the category
 *            icon:
 *              type: string
 *              description: The icon for the category
 *            parent:
 *              type: string
 *              description: The parent category ID
 */
/**
 * @swagger
 * /category/createCategory:
 *   post:
 *     summary: Create new Category
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCategory'
 *     responses:
 *       201:
 *         description: Category has been created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Category has been created successfully
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
 * /category:
 *   get:
 *     summary: Get all Categories
 *     tags: [Category]
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
