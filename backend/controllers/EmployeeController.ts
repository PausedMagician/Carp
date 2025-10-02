import { Request, Response } from 'express';

export const createEmployee = (req: Request, res: Response) => {
    // create
    res.send('Created');
};

export const getEmployees = (req: Request, res: Response) => {
    // read
    res.send('Read many');
};

export const getEmployee = (req: Request, res: Response) => {
    // read
    res.send('Read one');
};

export const updateEmployee = (req: Request, res: Response) => {
    // update
    res.send('Update');
};

export const deleteEmployee = (req: Request, res: Response) => {
    // delete
    res.send('Delete');
};