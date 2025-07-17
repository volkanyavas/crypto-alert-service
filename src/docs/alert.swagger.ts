/**
 * @swagger
 * tags:
 *   name: Alerts
 *   description: Manage price alerts
 */

/**
 * @swagger
 * /api/alerts:
 *   post:
 *     summary: Create a new price alert
 *     tags: [Alerts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Alert information
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [symbol, targetPrice, direction]
 *             properties:
 *               symbol:
 *                 type: string
 *                 example: BTC
 *               targetPrice:
 *                 type: number
 *                 example: 60000
 *               direction:
 *                 type: string
 *                 enum: [ABOVE, BELOW]
 *     responses:
 *       201:
 *         description: Alert created
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/alerts:
 *   get:
 *     summary: List user alerts
 *     tags: [Alerts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of alerts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
export {};
