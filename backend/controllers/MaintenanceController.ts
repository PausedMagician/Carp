import { AppDataSource } from '@/AppDataSource';
import { Maintenance } from '@/entities/Maintenance';
import { Request, Response } from 'express';

const maintenanceRepository = AppDataSource.getRepository(Maintenance);

/**
 * @swagger
 * components:
 *   schemas:
 *     Maintenance:
 *       type: object
 *       required:
 *         - reason
 *         - status
 *         - log
 *         - planned_at
 *         - planned_for
 *       properties:
 *         id:
 *           type: integer
 *           description: Auto-generated ID
 *         reason:
 *           type: string
 *           description: Reason for maintenance
 *         status:
 *           type: string
 *           description: Status of the maintenance
 *         log:
 *           type: string
 *           description: Log details of the maintenance
 *         planned_at:
 *           type: string
 *           format: date-time
 *           description: Planned date for the maintenance
 *         planned_for:
 *           type: string
 *           format: date-time
 *           description: Date for which the maintenance is planned
 *         done_at:
 *           type: string
 *           format: date-time
 *           description: Date when the maintenance was completed
 *         vehicle:
 *           ref: '#/components/schemas/Vehicle'
 *         reportee:
 *           ref: '#/components/schemas/Employee'
 */

/**
 * @swagger
 * /maintenances:
 *   post:
 *     operationId: createMaintenance
 *     summary: Create a new maintenance record
 *     tags: [Maintenance]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Maintenance'
 *     responses:
 *       201:
 *         description: Maintenance created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Maintenance'
 */
export const createMaintenance = async (req: Request, res: Response) => {
    const maintenance = maintenanceRepository.create(req.body);
    await maintenanceRepository.insert(maintenance); // only persist maintenance as employee and vehicle should exists
    res.status(201).json(maintenance);
};

/**
 * @swagger
 * /maintenances:
 *   get:
 *     operationId: getMaintenances
 *     summary: Get all maintenance records
 *     tags: [Maintenance]
 *     responses:
 *       200:
 *         description: A list of maintenance records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Maintenance'
 */
export const getMaintenances = async (req: Request, res: Response) => {
    res.json(await maintenanceRepository.find({relations: {
        vehicle: true,
        reportee: true
    }}));
};

/**
 * @swagger
 * /maintenances/{id}:
 *   get:
 *     operationId: getMaintenanceById
 *     summary: Get maintenance record by ID
 *     tags: [Maintenance]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Maintenance ID
 *     responses:
 *       200:
 *         description: Maintenance details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Maintenance'
 */
export const getMaintenance = async (req: Request, res: Response) => {
    res.json(await maintenanceRepository.findOne({where: {id: parseInt(req.params.id)}, relations: {
        vehicle: true,
        reportee: true
    }}));
};

/**
 * @swagger
 * /maintenances:
 *   put:
 *     operationId: updateMaintenance
 *     summary: Update a maintenance record
 *     tags: [Maintenance]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Maintenance'
 *     responses:
 *       200:
 *         description: Maintenance updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Maintenance'
 */
export const updateMaintenance = async (req: Request, res: Response) => {
    const maintenance = maintenanceRepository.create(req.body);
    await maintenanceRepository.save(maintenance);
    res.status(200).json(maintenance);
};

/**
 * @swagger
 * /maintenances:
 *   delete:
 *     operationId: deleteMaintenance
 *     summary: Delete a maintenance record
 *     tags: [Maintenance]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Maintenance'
 *     responses:
 *       200:
 *         description: Maintenance deleted successfully
 */
export const deleteMaintenance = (req: Request, res: Response) => {
    maintenanceRepository.delete(req.body);
    res.status(200).json();
};