import { AppDataSource } from '@/AppDataSource';
import { Booking } from '@/entities/Booking';
import { Employee } from '@/entities/Employee';
import { PersonalDetails } from '@/entities/PersonalDetails';
import { Request, Response } from 'express';
import moment from 'moment';
import { LessThanOrEqual, MoreThanOrEqual } from 'typeorm';

const employeeRepository = AppDataSource.getRepository(Employee);
const personalDetailsRepository = AppDataSource.getRepository(PersonalDetails);
const bookingRepository = AppDataSource.getRepository(Booking);

/**
 * @swagger
 * components:
 *   schemas:
 *     Employee:
 *       type: object
 *       required:
 *         - username
 *         - password
 *         - email
 *         - department
 *         - personal_details
 *       properties:
 *         id:
 *           type: integer
 *           description: Auto-generated ID
 *         username:
 *           type: string
 *           description: Employee username
 *         password:
 *           type: string
 *           description: Employee password
 *         email:
 *           type: string
 *           description: Employee email
 *         department:
 *           type: string
 *           description: Employee department
 *         isAdmin:
 *           type: boolean
 *           description: Is the employee an admin
 *         personal_details:
 *           $ref: '#/components/schemas/PersonalDetails'
 *     PersonalDetails:
 *       type: object
 *       required:
 *         - first_name
 *         - last_name
 *         - birthday
 *       properties:
 *         id:
 *           type: integer
 *           description: Auto-generated ID
 *         first_name:
 *           type: string
 *           description: First name of the employee
 *         last_name:
 *           type: string
 *           description: Last name of the employee
 *         birthday:
 *           type: string
 *           format: date
 *           description: Birthday of the employee
 */

/**
 * @swagger
 * /employees:
 *   post:
 *     operationId: createEmployee
 *     summary: Create a new employee
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee'
 *     responses:
 *       201:
 *         description: Employee created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 */
export const createEmployee = async (req: Request, res: Response) => {
    const obj = employeeRepository.create(req.body);
    //@ts-expect-error
    await personalDetailsRepository.insert(obj.personal_details);
    await employeeRepository.insert(obj);
    res.status(201).json(obj);
};

/**
 * @swagger
 * /employees:
 *   get:
 *     operationId: getAllEmployees
 *     summary: Get all employees
 *     tags: [Employees]
 *     responses:
 *       200:
 *         description: List of all employees
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employee'
 */
export const getEmployees = async (req: Request, res: Response) => {
    res.json(await employeeRepository.find({ relations: ['personal_details'] }));
};

/**
 * @swagger
 * /employees/{id}:
 *   get:
 *     operationId: getEmployeeById
 *     summary: Get employee by ID
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Employee ID
 *     responses:
 *       200:
 *         description: Employee data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 */
export const getEmployee = async (req: Request, res: Response) => {
    res.json(await employeeRepository.findOne({
        where: { id: parseInt(req.params.id) },
        relations: ['personal_details']
    }));
};

/**
 * @swagger
 * /employees/{id}/bookings:
 *   get:
 *     operationId: getEmployeeBookingsById
 *     summary: Get employee bookings by ID
 *     tags: [Employees, Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Employee ID
 *     responses:
 *       200:
 *         description: Employee data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Booking'
 */
export const getEmployeeBookings = async (req: Request, res: Response) => {
    res.json(await bookingRepository.findBy({
        employee: { id: parseInt(req.params.id) }
    }))
};

/**
 * @swagger
 * /employees/{id}/bookings/current:
 *   get:
 *     operationId: getEmployeeCurrentBookingsById
 *     summary: Get employee current bookings by employee ID
 *     tags: [Employees, Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Employee ID
 *     responses:
 *       200:
 *         description: Employee data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Booking'
 */
export const getEmployeeCurrentBookings = async (req: Request, res: Response) => {
    res.json(await bookingRepository.findBy({
        employee: { id: parseInt(req.params.id) },
        start_date: LessThanOrEqual(moment().startOf('day').set('hour', 12).toDate()),
        end_date: MoreThanOrEqual(moment().startOf('day').set('hour', 12).toDate())
    }))
};


/**
 * @swagger
 * /employees:
 *   put:
 *     operationId: updateEmployee
 *     summary: Update an existing employee
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee'
 *     responses:
 *       200:
 *         description: Employee updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 */
export const updateEmployee = async (req: Request, res: Response) => {
    const obj = employeeRepository.create(req.body);
    //@ts-expect-error
    await personalDetailsRepository.save(obj.personal_details);
    await employeeRepository.save(obj);
    res.status(200).json(obj);
};

/**
 * @swagger
 * /employees:
 *   delete:
 *     operationId: deleteEmployee
 *     summary: Delete an employee
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee'
 *     responses:
 *       200:
 *         description: Employee deleted successfully
 */
export const deleteEmployee = (req: Request, res: Response) => {
    employeeRepository.delete(req.body);
    res.status(200).json();
};


/**
 * @swagger
 * /employees/login:
 *   post:
 *     operationId: login
 *     summary: Employee login
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       401:
 *         description: Invalid credentials
 */
export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const employee = await employeeRepository.findOne({ where: { username, password } });
    if (employee) {
        res.status(200).json(employee);
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
}