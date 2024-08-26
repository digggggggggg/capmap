import express, { Request, Response } from 'express';
import { createCustomer, getCustomers } from '../api/customers';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
	try {
		//TODO: Implement various checks and validations
		const data = await getCustomers(req.query);
		res.json(data);
	}
	catch (error) {
		console.error(error);
		res.status(500).send({ error });
	}
});

router.post('/', async (req: Request, res: Response) => {
	try {
		//TODO: Implement various checks and validations
		const data = await createCustomer(req.body);

		if (!data.id) {
			throw new Error("Customer not created");
		};

		res.json(data);
	}
	catch (error) {
		console.error(error);
		res.status(500).send({ error });
	}
});

export default router;