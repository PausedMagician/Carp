import { AppDataSource } from '@/AppDataSource';
import { Vehicle } from '@/entities/Vehicle';
import { Request, Response } from 'express';
import path from 'path';

const vehicleRepository = AppDataSource.getRepository(Vehicle);
import * as fs from 'fs';

/**
 * @swagger
 * /images/vehicles/{id}:
 *   get:
 *     operationId: getVehicleImage
 *     summary: Get vehicle image
 *     tags: [Images, Vehicles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the vehicle
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Vehicle image
 *         content:
 *           image/png:
 *             schema:
 *               type: string
 *               format: arraybuffer
 *       404:
 *         description: Vehicle not found
 */
export const getVehicleImage = async (req: Request, res: Response) => {
    try {
        // Assuming the image name is passed as a query parameter or route parameter
        const vehicleId = Number.parseInt(req.params.id);

        if (!vehicleId) {
            return res.status(400).send('Vehicle ID is required');
        }

        if (await vehicleRepository.countBy({ id: vehicleId }) === 0) {
            return res.status(404).send('Vehicle not found');
        }

        // Construct the absolute path to the image
        const imagePath = path.join(__dirname, '..', 'assets', 'images', 'vehicles', vehicleId.toString() + '.png');

        // If image does not exist
        if (fs.existsSync(imagePath) === false) {
            res.sendFile(path.join(__dirname, '..', 'assets', 'images', 'vehicles', 'placeholder.png'));
        } else {
            res.sendFile(imagePath);
        }

        // Send the image file
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
};