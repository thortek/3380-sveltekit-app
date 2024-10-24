import clientPromise from '$lib/mongodb.client';

export async function load() {
	let results;
	try {
		const client = await clientPromise;
		if (!client) {
			throw new Error('Failed to connect to the database');
		}
		const database = client.db('cs3380db');
		const collection = database.collection('test');
		results = await collection.find().toArray();

		// Convert ObjectId to string
		results = results.map((item: any) => {
			return {
				...item,
				_id: item._id.toString()
			};
		});
	} catch (error) {
		console.error(error);
	}

	return {
		status: 200,
		body: {
			message: 'Hello from the MongoDB server page',
			results
		}
	};
}

export const actions = {
	addNameToDB: async ({ request }) => {
		const formData = await request.formData();
		const name = formData.get('userName');

		const client = await clientPromise;
		if (!client) {
			throw new Error('Failed to connect to the database');
		}
		const database = client.db('cs3380db');
		const collection = database.collection('test');
		collection.insertOne({ userName: name });

		return {
			status: 200,
			body: {
				message: `${name} added to the database`
			}
		};
	}
};
