import { Request, Response } from 'express';

export const createBooking = (req: Request, res: Response) => {
    // create
    res.send('Created');
};

export const getBookings = (req: Request, res: Response) => {
    // read
    res.send('Read many');
};

export const getBooking = (req: Request, res: Response) => {
    // read
    res.send('Read one');
};

export const updateBooking = (req: Request, res: Response) => {
    // update
    res.send('Update');
};

export const deleteBooking = (req: Request, res: Response) => {
    // delete
    res.send('Delete');
};