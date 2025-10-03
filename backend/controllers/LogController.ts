import { AppDataSource } from '@/AppDataSource';
import { LogEntry } from '@/entities/LogEntry';
import { Request, Response } from 'express';

const logRepository = AppDataSource.getRepository(LogEntry);

/**
 * @swagger
 * components:
 *   schemas:
 *     Log:
 *       type: object
 *       required:
 *         - from_location
 *         - to_location
 *         - start_date
 *         - end_date
 *         - start_odometer
 *         - end_odometer
 *       properties:
 *         id:
 *           type: integer
 *           description: Auto-generated ID
 *         from_location:
 *           type: string
 *           description: Starting location
 *         to_location:
 *           type: string
 *           description: Destination location
 *         start_date:
 *           type: string
 *           format: date-time
 *           description: Start date and time
 *         end_date:
 *           type: string
 *           format: date-time
 *           description: End date and time
 *         start_odometer:
 *           type: number
 *           format: float
 *           description: Odometer reading at start
 *         end_odometer:
 *           type: number
 *           format: float
 *           description: Odometer reading at end
 *         employee:
 *          $ref: '#/components/schemas/Employee'
 *         booking:
 *           $ref: '#/components/schemas/Booking'
 */

/**
 * @swagger
 * /companies:
 *   post:
 *     operationId: createLog
 *     summary: Create a new log
 *     tags: [Logs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Log'
 *     responses:
 *       201:
 *         description: Log created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Log'
 */
export const createLog = async (req: Request, res: Response) => {
    const log = logRepository.create(req.body);
    await logRepository.insert(log);
    res.status(201).json(log);
};

/**
 * @swagger
 * /companies:
 *   get: 
 *     operationId: getAllLogs
 *     summary: Get all companies
 *     tags: [Logs]
 *     responses:
 *       200:
 *         description: List of all companies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Log'
 */
export const getLogs = async (req: Request, res: Response) => {
    res.json(await logRepository.find());
};

/**
 * @swagger
 * /companies/{id}:
 *   get:
 *     operationId: getLogById
 *     summary: Get log by ID
 *     tags: [Logs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Log ID
 *     responses:
 *       200:
 *         description: Log details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Log'
 */
export const getLog = async (req: Request, res: Response) => {
    res.json(await logRepository.findOneBy({id: parseInt(req.params.id)}));
};

/**
 * @swagger
 * /companies:
 *   put:
 *     operationId: updateLog
 *     summary: Update a log
 *     tags: [Logs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Log'
 *     responses:
 *       200:
 *         description: Log updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Log'
 */
export const updateLog = async (req: Request, res: Response) => {
    const log = logRepository.create(req.body);
    await logRepository.save(log);
    res.status(200).json(log);
};

/**
 * @swagger
 * /companies:
 *   delete:
 *     operationId: deleteLog
 *     summary: Delete a log
 *     tags: [Logs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Log'
 *     responses:
 *       200:
 *         description: Log deleted successfully
 */
export const deleteLog = (req: Request, res: Response) => {
    logRepository.delete(req.body);
    res.status(200).json();
};