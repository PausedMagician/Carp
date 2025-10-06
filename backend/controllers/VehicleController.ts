import { AppDataSource } from '@/AppDataSource';
import { Booking } from '@/entities/Booking';
import { Vehicle } from '@/entities/Vehicle';
import { VehicleRegistration } from '@/entities/VehicleRegistration';
import { VehicleSpec } from '@/entities/VehicleSpec';
import { VehicleTransmission } from '@/entities/VehicleTransmission';
import { Request, Response } from 'express';

const vehicleRepository = AppDataSource.getRepository(Vehicle);
const vehicleRegistrationRepository = AppDataSource.getRepository(VehicleRegistration);
const vehicleSpecRepository = AppDataSource.getRepository(VehicleSpec);
const VehicleTransmissionRepository = AppDataSource.getRepository(VehicleTransmission);
const bookingRepository = AppDataSource.getRepository(Booking);

/**
 * @swagger
 * components:
 *   schemas:
 *     Vehicle:
 *       type: object
 *       required:
 *         - make
 *         - model
 *         - variant
 *         - color
 *         - type
 *         - year
 *       properties:
 *         id:
 *           type: integer
 *           description: Auto-generated ID
 *         make:
 *           type: string
 *           description: Vehicle manufacturer
 *         model:
 *           type: string
 *           description: Vehicle model
 *         variant:
 *           type: string
 *           description: Vehicle variant
 *         color:
 *           type: string
 *           description: Vehicle color
 *         type:
 *           type: string
 *           description: Vehicle type
 *         year:
 *           type: integer
 *           description: Manufacturing year
 *         registration:
 *           $ref: '#/components/schemas/VehicleRegistration'
 *         spec:
 *           $ref: '#/components/schemas/VehicleSpec'
 *     VehicleRegistration:
 *       type: object
 *       required:
 *         - license
 *         - serial
 *       properties:
 *         id:
 *           type: integer
 *           description: Auto-generated ID
 *         license:
 *           type: string
 *           description: License plate of the vehicle
 *         serial:
 *           type: string
 *           description: Serial number of the vehicle
 *     VehicleSpec:
 *       type: object
 *       required:
 *         - horse_power
 *         - top_speed
 *         - mileage
 *         - trailer_hitch
 *         - fuel_type
 *         - tyres
 *         - transmission
 *       properties:
 *         id:
 *           type: integer
 *           description: Auto-generated ID
 *         horse_power:
 *           type: number
 *           format: float
 *           description: Horse power
 *         top_speed:
 *           type: number
 *           format: float
 *           description: Top speed of the vehicle
 *         mileage:
 *           type: number
 *           format: float
 *           description: The mileage in km/l
 *         trailer_hitch:
 *           type: boolean
 *           description: If the vehicle has a trailer hitch
 *         fuel_type:
 *           type: string
 *           description: Petrol, Diesel, Electric...
 *         tyres:
 *           type: string
 *           description: Summer, Winter, All-Season...
 *         transmission:
 *           $ref: '#/components/schemas/VehicleTransmission'
 *           description: The transmission type of the vehicle
 *     VehicleTransmission:
 *       type: object
 *       required:
 *         - type
 *         - drive
 *       properties:
 *         id:
 *           type: integer
 *           description: Auto-generated ID
 *         type:
 *           type: string
 *           description: Type as in automatic, manual or semi-automatic
 *         drive:
 *           type: string
 *           description: 4WD, FWD, RWD
 */

/**
 * @swagger
 * /vehicles:
 *   post:
 *     operationId: createVehicle
 *     summary: Create a new vehicle
 *     tags: [Vehicles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vehicle'
 *     responses:
 *       201:
 *         description: Vehicle created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vehicle'
 */
export const createVehicle = async (req: Request, res: Response) => {
    let obj: Vehicle | Vehicle[] = vehicleRepository.create(req.body);
    // Check if object is an array
    if (Array.isArray(obj)) {
        obj = obj[0];
    }
    await vehicleRegistrationRepository.insert(obj.registration);
    await VehicleTransmissionRepository.insert(obj.spec.transmission);
    await vehicleSpecRepository.insert(obj.spec);
    await vehicleRepository.insert(obj);
    res.status(201).json(obj);
};

/**
 * @swagger
 * /vehicles:
 *   get:
 *     operationId: getVehicles
 *     summary: Get all vehicles
 *     tags: [Vehicles]
 *     responses:
 *       200:
 *         description: List of all vehicles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Vehicle'
 */
export const getVehicles = async (req: Request, res: Response) => {
    res.json(await vehicleRepository.find({relations: {
        registration: true,
        spec: true,
    } }));
};

/**
 * @swagger
 * /vehicles/{id}:
 *   get:
 *     operationId: getVehicleById
 *     summary: Get vehicle by ID
 *     tags: [Vehicles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Vehicle ID
 *     responses:
 *       200:
 *         description: Vehicle details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vehicle'
 */
export const getVehicle = async (req: Request, res: Response) => {
    res.json(await vehicleRepository.findOne({where: {id: parseInt(req.params.id)}, relations: {
        registration: true,
        spec: true
    }}));
};

/**
 * @swagger
 * /vehicles-available:
 *  get:
 *    operationId: getAvailableVehicles
 *    summary: Get all available vehicles
 *    tags: [Vehicles]
 *    responses:
 *      200:
 *        description: List of all available vehicles
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Vehicle'
 */
export const getAvailableVehicles = async (req: Request, res: Response) => {
    const allVehicles = await vehicleRepository.find();

    const unavailableIds = await bookingRepository.createQueryBuilder("b")
        .select("b.vehicleId")
        .where("b.start_date <= :now AND b.end_date >= :now", { now: new Date() })
        .getRawMany();

    const availableVehicles = allVehicles.filter(vehicle => 
        !unavailableIds.some(booking => booking.vehicleId === vehicle.id)
    );

    res.json(availableVehicles);
}

/**
 * @swagger
 * /vehicles:
 *   put:
 *     operationId: updateVehicle
 *     summary: Update a vehicle
 *     tags: [Vehicles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vehicle'
 *     responses:
 *       200:
 *         description: Vehicle updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vehicle'
 */
export const updateVehicle = async (req: Request, res: Response) => {
    const obj = vehicleRepository.create(req.body);
    //@ts-expect-error
    await vehicleRegistrationRepository.save(obj.registration);
    //@ts-expect-error
    await vehicleSpecRepository.save(obj.spec);
    //@ts-expect-error
    await VehicleTransmissionRepository.save(obj.spec.transmission)
    await vehicleRepository.save(obj);
    res.status(200).json(obj);
};

/**
 * @swagger
 * /vehicles:
 *   delete:
 *     operationId: deleteVehicle
 *     summary: Delete a vehicle
 *     tags: [Vehicles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vehicle'
 *     responses:
 *       200:
 *         description: Vehicle deleted successfully
 */
export const deleteVehicle = async (req: Request, res: Response) => {
    await vehicleRepository.delete(req.body);
    res.status(200).json();
};

/**
 * @swagger
 * /vehicles/available/{id}:
 *   get:
 *     operationId: getAvailableVehicleById
 *     summary: Get available vehicle by ID
 *     tags: [Vehicles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Vehicle ID
 *     responses:
 *       200:
 *         description: Available vehicle details
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/Booking'
 *                 - type: 'null'
 *       404:
 *         description: No vehicle found matching id.
 */
export const getVehicleBookingsById = async (req: Request, res: Response) => {
    const vehicleId = parseInt(req.params.id);
    const vehicle = await vehicleRepository.findOneBy({id: vehicleId});
    if (!vehicle) {
        res.status(404).json();
    } else {
        const bookings = await bookingRepository.createQueryBuilder("b")
            .select("b")
            .where("b.start_date <= :now AND b.end_date >= :now", { now: new Date() })
            .andWhere("b.vehicleId = :vehicleId", { vehicleId })
            .getMany();
        res.json(bookings);
    }
};