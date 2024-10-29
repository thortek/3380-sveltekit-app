import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async () => {

    //console.log(process.env.MOCKAROO_API_KEY);

    // currently broken code!  Need to fix this! Let's meet on Thursday to fix this!
 	const mockJSON = await fetch(`https://api.mockaroo.com/api/generate.json?key=${process.env.MOCKAROO_API_KEY}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		}
	});

	const mockJSONdata = await mockJSON.json();
	console.log(mockJSON);

	return new Response(
		JSON.stringify(mockJSONdata),
		{
			status: 200,
			headers: {
				'Content-Type': 'application/json'
			}
		}
	);
};