import { Request, Response } from 'express';

export const createMaintenance = (req: Request, res: Response) => {
    // create
    res.send('Created');
};

export const getMaintenances = (req: Request, res: Response) => {
    // read
    res.send('Read many');
};

export const getMaintenance = (req: Request, res: Response) => {
    // read
    res.send('Read one');
};

export const updateMaintenance = (req: Request, res: Response) => {
    // update
    res.send('Update');
};

export const deleteMaintenance = (req: Request, res: Response) => {
    // delete
    res.send('Delete');
};