import { AppDataSource } from '@/AppDataSource';
import { Vehicle } from '@/entities/Vehicle';
import { VehicleRegistration } from '@/entities/VehicleRegistration';
import { VehicleSpec } from '@/entities/VehicleSpec';
import { VehicleTransmission } from '@/entities/VehicleTransmission';
import { Request, Response } from 'express';

const vehicleRepository = AppDataSource.getRepository(Vehicle);
const vehicleRegistrationRepository = AppDataSource.getRepository(VehicleRegistration);
const vehicleSpecRepository = AppDataSource.getRepository(VehicleSpec);
const VehicleTransmissionRepository = AppDataSource.getRepository(VehicleTransmission);

export const createVehicle = async (req: Request, res: Response) => {
    const obj = vehicleRepository.create(req.body);
    //@ts-expect-error
    await vehicleRegistrationRepository.insert(obj.registration);
    //@ts-expect-error
    await vehicleSpecRepository.insert(obj.spec);
    //@ts-expect-error
    await VehicleTransmissionRepository.insert(obj.spec.transmission)
    await vehicleRepository.insert(obj);
    res.status(201).json(obj);
};

export const getVehicles = async (req: Request, res: Response) => {
    res.json(await vehicleRepository.find({relations: {
        registration: true,
        spec: true
    } }));
};

export const getVehicle = (req: Request, res: Response) => {
    res.json(vehicleRepository.findOne({where: {id: parseInt(req.params.id)}, relations: {
        registration: true,
        spec: true
    }}));
};

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

export const deleteVehicle = (req: Request, res: Response) => {
    vehicleRepository.delete(req.body);
    res.status(200).json();
};