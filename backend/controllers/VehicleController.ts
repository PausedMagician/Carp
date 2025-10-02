import { Request, Response } from 'express';

export const createVehicle = (req: Request, res: Response) => {
    // create
    res.send('Created');
};

export const getVehicles = (req: Request, res: Response) => {
    // read
    res.send('Read many');
};

export const getVehicle = (req: Request, res: Response) => {
    // read
    res.send('Read one');
};

export const updateVehicle = (req: Request, res: Response) => {
    // update
    res.send('Update');
};

export const deleteVehicle = (req: Request, res: Response) => {
    // delete
    res.send('Delete');
};