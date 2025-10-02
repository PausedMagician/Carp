import { AppDataSource } from '@/AppDataSource';
import { Employee } from '@/entities/Employee';
import { Request, Response } from 'express';

const employeeRepository = AppDataSource.getRepository(Employee);

export const createEmployee = async (req: Request, res: Response) => {
    const obj = employeeRepository.create(req.body);
    await employeeRepository.insert(obj);
    res.status(201).json(obj);
};

export const getEmployees = async (req: Request, res: Response) => {
    res.json(await employeeRepository.find());
};

export const getEmployee = (req: Request, res: Response) => {
    res.json(employeeRepository.findOneBy({id: parseInt(req.params.id)}));
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