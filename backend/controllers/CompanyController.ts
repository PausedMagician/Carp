import { Request, Response } from 'express';

export const createCompany = (req: Request, res: Response) => {
    // create
    res.send('Created');
};

export const getCompanys = (req: Request, res: Response) => {
    // read
    res.send('Read many');
};

export const getCompany = (req: Request, res: Response) => {
    // read
    res.send('Read one');
};

export const updateCompany = (req: Request, res: Response) => {
    // update
    res.send('Update');
};

export const deleteCompany = (req: Request, res: Response) => {
    // delete
    res.send('Delete');
};