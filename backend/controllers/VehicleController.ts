import { AppDataSource } from '@/AppDataSource';
import { Vehicle } from '@/entities/Vehicle';
import { Request, Response } from 'express';

const vehicleRepository = AppDataSource.getRepository(Vehicle);

export const createVehicle = async (req: Request, res: Response) => {
    const obj = vehicleRepository.create(req.body);
    await vehicleRepository.insert(obj);
    res.status(201).json(obj);
};

export const getVehicles = async (req: Request, res: Response) => {
    res.json(await vehicleRepository.find());
};

export const getVehicle = (req: Request, res: Response) => {
    res.json(vehicleRepository.findOneBy({id: parseInt(req.params.id)}));
};

export const updateVehicle = async (req: Request, res: Response) => {
    const obj = vehicleRepository.create(req.body);
    await vehicleRepository.save(obj);
    res.status(200).json(obj);
};

export const deleteVehicle = (req: Request, res: Response) => {
    vehicleRepository.delete(req.body);
    res.status(200).json();
};