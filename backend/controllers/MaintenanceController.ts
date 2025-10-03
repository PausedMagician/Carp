import { AppDataSource } from '@/AppDataSource';
import { Maintenance } from '@/entities/Maintenance';
import { Request, Response } from 'express';

const maintenanceRepository = AppDataSource.getRepository(Maintenance);

export const createMaintenance = async (req: Request, res: Response) => {
    const maintenance = maintenanceRepository.create(req.body);
    await maintenanceRepository.insert(maintenance); // only persist maintenance as employee and vehicle should exists
    res.status(201).json(maintenance);
};


export const getMaintenances = async (req: Request, res: Response) => {
    res.json(await maintenanceRepository.find({relations: {
        vehicle: true,
        reportee: true
    }}));
};


export const getMaintenance = async (req: Request, res: Response) => {
    res.json(await maintenanceRepository.findOne({where: {id: parseInt(req.params.id)}, relations: {
        vehicle: true,
        reportee: true
    }}));
};


export const updateMaintenance = async (req: Request, res: Response) => {
    const maintenance = maintenanceRepository.create(req.body);
    await maintenanceRepository.save(maintenance);
    res.status(200).json(maintenance);
};

export const deleteMaintenance = (req: Request, res: Response) => {
    maintenanceRepository.delete(req.body);
    res.status(200).json();
};