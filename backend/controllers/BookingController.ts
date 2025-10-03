import { AppDataSource } from '@/AppDataSource';
import { Booking } from '@/entities/Booking';
import { Employee } from '@/entities/Employee';
import { Vehicle } from '@/entities/Vehicle';
import { Request, Response } from 'express';

const bookingRepository = AppDataSource.getRepository(Booking);

/**
 * @swagger
 * components:
 *   schemas:
 *     Booking:
 *       type: object
 *       required:
 *         - purpose
 *         - booking_status
 *         - destination
 *         - start_date
 *         - end_date
 *       properties:
 *         id:
 *           type: integer
 *           description: Auto-generated ID
 *         purpose:
 *           type: string
 *           description: Purpose of the booking
 *         booking_status:
 *           type: string
 *           description: Status of the booking
 *         destination:
 *           type: string
 *           description: Destination of the booking
 *         start_date:
 *           type: string
 *           format: date-time
 *           description: Start date of the booking
 *         end_date:
 *           type: string
 *           format: date-time
 *           description: End date of the booking
 *         employee:
 *           type: object
 *           description: Employee associated with the booking
 *         vehicle:
 *           type: object
 *           description: Vehicle associated with the booking
 *         logEntries:
 *           type: array
 *           items:
 *             type: object
 *           description: Log entries associated with the booking
 */

/**
 * @swagger
 * /bookings:
 *   post:
 *     operationId: createBooking
 *     summary: Create a new booking
 *     tags: [Bookings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Booking'
 *     responses:
 *       201:
 *         description: Booking created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 */
export const createBooking = async (req: Request, res: Response) => {
    const booking = bookingRepository.create(req.body);
    await bookingRepository.insert(booking); // only persist booking as employee and vehicle should exists
    res.status(201).json(booking);
};

/**
 * @swagger
 * /bookings:
 *   get:
 *     operationId: getAllBookings
 *     summary: Get all bookings
 *     tags: [Bookings]
 *     responses:
 *       200:
 *         description: List of all bookings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Booking'
 */
export const getBookings = async (req: Request, res: Response) => {
    res.json(await bookingRepository.find({relations: {
        vehicle: true,
        employee: true
    }}));
};

/**
 * @swagger
 * /bookings/{id}:
 *   get:
 *     operationId: getBookingById
 *     summary: Get booking by ID
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the booking to get
 *     responses:
 *       200:
 *         description: Booking details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 */
export const getBooking = async (req: Request, res: Response) => {
    res.json(await bookingRepository.findOne({where: {id: parseInt(req.params.id)}, relations: {
        vehicle: true,
        employee: true
    }}));
};

/**
 * @swagger
 * /bookings:
 *   put:
 *     operationId: updateBooking
 *     summary: Update an existing booking
 *     tags: [Bookings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Booking'
 *     responses:
 *       200:
 *         description: Booking updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 */
export const updateBooking = async (req: Request, res: Response) => {
    const booking = bookingRepository.create(req.body);
    await bookingRepository.save(booking);
    res.status(200).json(booking);
};

/**
 * @swagger
 * /bookings:
 *   delete:
 *     operationId: deleteBooking
 *     summary: Delete a booking
 *     tags: [Bookings]
 *     parameters:
 *       - in: body
 *         name: booking
 *         required: true
 *         description: Booking object to be deleted
 *         schema:
 *           $ref: '#/components/schemas/Booking'
 *     responses:
 *       200:
 *         description: Booking deleted successfully
 */
export const deleteBooking = (req: Request, res: Response) => {
    bookingRepository.delete(req.body);
    res.status(200).json();
};