import { AppDataSource } from '@/AppDataSource';
import { Company } from '@/entities/Company';
import { Request, Response } from 'express';

const companyRepository = AppDataSource.getRepository(Company);

export const createCompany = async (req: Request, res: Response) => {
    const company = companyRepository.create(req.body);
    await companyRepository.insert(company);
    res.status(201).json(company);
};

export const getCompanys = async (req: Request, res: Response) => {
    res.json(await companyRepository.find());
};

export const getCompany = (req: Request, res: Response) => {
    res.json(companyRepository.findOneBy({id: parseInt(req.params.id)}));
};

export const updateCompany = async (req: Request, res: Response) => {
    const company = companyRepository.create(req.body);
    await companyRepository.save(company);
    res.status(200).json(company);
};

export const deleteCompany = (req: Request, res: Response) => {
    companyRepository.delete(req.body);
    res.status(200).json();
};