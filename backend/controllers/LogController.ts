import { Request, Response } from 'express';

export const createLog = (req: Request, res: Response) => {
    // create
    res.send('Created');
};

export const getLogs = (req: Request, res: Response) => {
    // read
    res.send('Read many');
};

export const getLog = (req: Request, res: Response) => {
    // read
    res.send('Read one');
};

export const updateLog = (req: Request, res: Response) => {
    // update
    res.send('Update');
};

export const deleteLog = (req: Request, res: Response) => {
    // delete
    res.send('Delete');
};