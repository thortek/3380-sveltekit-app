import type { RequestHandler } from '@sveltejs/kit';

const fields = [
	{
		name: 'id',
		type: 'Row Number'
	},
	{
		name: 'logo',
		type: 'Dummy Image URL',
		maxHeight: 200,
		maxWidth: 200,
	},
	{
		name: 'make',
		type: 'Car Make',
	},
	{
		name: 'model',
		type: 'Car Model',
	},
	{
		name: 'year',
		type: 'Car Model Year',
	},
	{
		name: 'color',
		type: 'Color',
	},
	{
		name: 'vin',
		type: 'Car VIN',
	}
];

export const POST: RequestHandler = async () => {
	const apiKey = process.env.MOCKAROO_API_KEY as string;

	const mockJSON = await fetch(
		`https://api.mockaroo.com/api/generate.json?key=${apiKey}&fields=${encodeURIComponent(
			JSON.stringify(fields)
		)}&count=20`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}
		}
	);

	const mockJSONdata = await mockJSON.json();

	return new Response(JSON.stringify(mockJSONdata), {
		status: 200,
		headers: {
			'Content-Type': 'application/json'
		}
	});
};
