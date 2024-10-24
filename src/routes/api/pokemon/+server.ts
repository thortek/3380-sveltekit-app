import type { RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ( { request }) => {
    const body = await request.json();

    const hpData = await fetch('https://hp-api.onrender.com/api/characters/staff', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});

    const hpDataJson = await hpData.json();
    //console.log(hpDataJson);

		return new Response(
			JSON.stringify({
        hpDataJson
			}),
			{
				status: 200,
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);
}