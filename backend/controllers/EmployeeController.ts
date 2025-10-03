import { AppDataSource } from '@/AppDataSource';
import { Employee } from '@/entities/Employee';
import { PersonalDetails } from '@/entities/PersonalDetails';
import { Request, Response } from 'express';

const employeeRepository = AppDataSource.getRepository(Employee);
const personalDetailsRepository = AppDataSource.getRepository(PersonalDetails);

/**
 * @swagger
 * components:
 *   schemas:
 *     Employee:
 *       type: object
 *       required:
 *         - id
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
 *         personal_details:
 *           $ref: '#/components/schemas/PersonalDetails'
 *       example:
 *         id: 1
 *         username: johndoe
 *         password: securepassword
 *         email: johndoe@example.com
 */

export const createEmployee = async (req: Request, res: Response) => {
    const obj = employeeRepository.create(req.body);
    //@ts-expect-error
    await personalDetailsRepository.insert(obj.personal_details);
    await employeeRepository.insert(obj);
    res.status(201).json(obj);
};

export const getEmployees = async (req: Request, res: Response) => {
    res.json(await employeeRepository.find());
};

export const getEmployee = async (req: Request, res: Response) => {
    res.json(await employeeRepository.findOne({where: {id: parseInt(req.params.id)} }));
};

export const updateEmployee = async (req: Request, res: Response) => {
    const obj = employeeRepository.create(req.body);
    //@ts-expect-error
    await personalDetailsRepository.save(obj.personal_details);
    await employeeRepository.save(obj);
    res.status(200).json(obj);
};

export const deleteEmployee = (req: Request, res: Response) => {
    employeeRepository.delete(req.body);
    res.status(200).json();
};