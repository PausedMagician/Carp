import { AppDataSource } from '@/AppDataSource';
import { Company } from '@/entities/Company';
import { Request, Response } from 'express';

const companyRepository = AppDataSource.getRepository(Company);

/**
 * @swagger
 * components:
 *   schemas:
 *     Company:
 *       type: object
 *       required:
 *         - name
 *         - address
 *       properties:
 *         id:
 *           type: integer
 *           description: Auto-generated ID
 *         name:
 *           type: string
 *           description: Company name
 *         address:
 *           type: string
 *           description: Company address
 */

/**
 * @swagger
 * /companies:
 *   post:
 *     operationId: createCompany
 *     summary: Create a new company
 *     tags: [Companies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Company'
 *     responses:
 *       201:
 *         description: Company created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Company'
 */
export const createCompany = async (req: Request, res: Response) => {
    const company = companyRepository.create(req.body);
    await companyRepository.insert(company);
    res.status(201).json(company);
};

/**
 * @swagger
 * /companies:
 *   get: 
 *     operationId: getAllCompanies
 *     summary: Get all companies
 *     tags: [Companies]
 *     responses:
 *       200:
 *         description: List of all companies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Company'
 */
export const getCompanys = async (req: Request, res: Response) => {
    res.json(await companyRepository.find());
};

/**
 * @swagger
 * /companies/{id}:
 *   get:
 *     operationId: getCompanyById
 *     summary: Get company by ID
 *     tags: [Companies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Company ID
 *     responses:
 *       200:
 *         description: Company details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Company'
 */
export const getCompany = async (req: Request, res: Response) => {
    res.json(await companyRepository.findOneBy({id: parseInt(req.params.id)}));
};

/**
 * @swagger
 * /companies:
 *   put:
 *     operationId: updateCompany
 *     summary: Update a company
 *     tags: [Companies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Company'
 *     responses:
 *       200:
 *         description: Company updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Company'
 */
export const updateCompany = async (req: Request, res: Response) => {
    const company = companyRepository.create(req.body);
    await companyRepository.save(company);
    res.status(200).json(company);
};

/**
 * @swagger
 * /companies:
 *   delete:
 *     operationId: deleteCompany
 *     summary: Delete a company
 *     tags: [Companies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Company'
 *     responses:
 *       200:
 *         description: Company deleted successfully
 */
export const deleteCompany = (req: Request, res: Response) => {
    companyRepository.delete(req.body);
    res.status(200).json();
};