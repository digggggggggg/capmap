import pg from 'pg';
const { Pool } = pg;

// Create a single shared instance of Pool
export const pool = new Pool({
	user: process.env.DB_USER,
	host: process.env.DB_HOSTNAME,
	database: process.env.DB_NAME,
	password: process.env.DB_PASSWORD,
	port: 5432
});

// If there's an error, log it and kill everything - in real world alert admins and attempt to restart pool
pool.on('error', (err) => {
	console.error('Unexpected error on idle client', err);
	process.exit(-1);
});

/**
 * Executes a SQL query with parameters to avoid SQL injection.
 * 
 * @param sql The SQL query with placeholders.
 * @param params The parameters to substitute in the placeholders.
 */
export async function query(sql: string, params?: any[]): Promise<any> {
	try {
		const { rows } = await pool.query(sql, params);  // Execute the query with the parameter array
		return rows;  // Return the result rows
	} catch (err: any) {
		console.error('Error executing query:', err.stack);
		throw err;
	}
}