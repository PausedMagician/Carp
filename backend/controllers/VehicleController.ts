import { AppDataSource } from '@/AppDataSource';
import { Vehicle } from '@/entities/Vehicle';
import { Request, Response } from 'express';

const vehicleRepository = AppDataSource.getRepository(Vehicle);

export const createEmployee = async (req: Request, res: Response) => {
    const obj = vehicleRepository.create(req.body);
    await vehicleRepository.insert(obj);
    res.status(201).json(obj);
};

export const getEmployees = async (req: Request, res: Response) => {
    res.json(await vehicleRepository.find());
};

export const getEmployee = (req: Request, res: Response) => {
    res.json(vehicleRepository.findOneBy({id: parseInt(req.params.id)}));
};

export const updateEmployee = async (req: Request, res: Response) => {
    const obj = vehicleRepository.create(req.body);
    await vehicleRepository.save(obj);
    res.status(200).json(obj);
};

export const deleteEmployee = (req: Request, res: Response) => {
    vehicleRepository.delete(req.body);
    res.status(200).json();
};