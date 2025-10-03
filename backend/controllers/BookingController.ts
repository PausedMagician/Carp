import { AppDataSource } from '@/AppDataSource';
import { Booking } from '@/entities/Booking';
import { Employee } from '@/entities/Employee';
import { Vehicle } from '@/entities/Vehicle';
import { Request, Response } from 'express';

const bookingRepository = AppDataSource.getRepository(Booking);

export const createBooking = async (req: Request, res: Response) => {
    const booking = bookingRepository.create(req.body);
    await bookingRepository.insert(booking); // only persist booking as employee and vehicle should exists
    res.status(201).json(booking);
};


export const getBookings = async (req: Request, res: Response) => {
    res.json(await bookingRepository.find({relations: {
        vehicle: true,
        employee: true
    }}));
};


export const getBooking = async (req: Request, res: Response) => {
    res.json(await bookingRepository.findOne({where: {id: parseInt(req.params.id)}, relations: {
        vehicle: true,
        employee: true
    }}));
};


export const updateBooking = async (req: Request, res: Response) => {
    const booking = bookingRepository.create(req.body);
    await bookingRepository.save(booking);
    res.status(200).json(booking);
};

export const deleteBooking = (req: Request, res: Response) => {
    bookingRepository.delete(req.body);
    res.status(200).json();
};