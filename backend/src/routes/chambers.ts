import express, { Request, Response } from 'express';
import { findChambersNearCustomer, findChambersNearby, getChambers } from '../api/chambers';
import { validateCoordinates } from '../lib/geo';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
	try {
		//TODO: Implement various search criteria / and validate input
		const data = await getChambers(req.query);
		res.json(data);
	}
	catch (error) {
		console.error(error);
		res.status(500).send({ error });
	}
});



/**
* Find chambers near a given set of coordinates
 * Note: I know this was not requested but makes more sense to me
 * I implemented the method above as a more generic way to find available chambers
 * It could serve our staff as well as the general public, which aren't our customers yet
  * 
 * @param {express.Request<{ query: { longitude: string, latitude: string } }>} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
router.get('/nearby', async (req: Request, res: Response) => {
	try {

		const coordinates = validateCoordinates(req.query);
		if (!coordinates) {
			res.status(400).send({ error: "Invalid coordinates" });
			return;
		}

		const data = await findChambersNearby(coordinates);
		res.json(data);
	}
	catch (error) {
		console.error(error);
		res.status(500).send({ error });
	}
});


/**
 * Find chambers near a customer, given a customer ID
 * Note: I know this was requested but seems strange to me
 * I implemented the method above as a more generic way to find available chambers
 * It could serve our staff as well as the general public, which aren't our customers yet
 * 
 * @param {express.Request<{ query: { customer_id: string } }>} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
router.get('/nearme', async (req: Request, res: Response) => {
	try {
		const customer_id = parseInt(req.query.customer_id as string);
		if (!customer_id) {
			res.status(400).send({ error: "Missing customer_id" });
			return;
		}
		const data = await findChambersNearCustomer(customer_id);
		res.json(data);
	}
	catch (error) {
		console.error(error);
		res.status(500).send({ error });
	}
});

export default router;