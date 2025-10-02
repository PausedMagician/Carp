import { AppDataSource } from '@/AppDataSource';
import { Employee } from '@/entities/Employee';
import { PersonalDetails } from '@/entities/PersonalDetails';
import { Request, Response } from 'express';

const employeeRepository = AppDataSource.getRepository(Employee);
const personalDetailsRepository = AppDataSource.getRepository(PersonalDetails);

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
    await employeeRepository.save(obj);
    res.status(200).json(obj);
};

export const deleteEmployee = (req: Request, res: Response) => {
    employeeRepository.delete(req.body);
    res.status(200).json();
};