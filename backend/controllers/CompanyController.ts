import { AppDataSource } from '@/AppDataSource';
import { Company } from '@/entities/Company';
import { Request, Response } from 'express';

const companyRepository = AppDataSource.getRepository(Company);

export const createCompany = (req: Request, res: Response) => {
    return companyRepository.save(req.body);
};

export const getCompanys = async (req: Request, res: Response) => {
    res.json(await companyRepository.find());
};

export const getCompany = (req: Request, res: Response) => {
    return companyRepository.findOneBy({id: parseInt(req.params.id)});
};

export const updateCompany = (req: Request, res: Response) => {
    return companyRepository.save(req.body);
};

export const deleteCompany = (req: Request, res: Response) => {
    companyRepository.delete(req.body);
};