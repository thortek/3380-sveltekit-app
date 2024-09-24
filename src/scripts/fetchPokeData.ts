const pokeUrl = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151';

// Fetch data from the pokeUrl using Promises
function fetchPokeDataByPromise() {
    fetch(pokeUrl)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

// Fetch data from the pokeUrl using async/await
async function fetchPokeData() {
	try {
		const response = await fetch(pokeUrl);
		const data = await response.json();
		console.log(data);
	} catch (error) {
		console.error('Error:', error);
	}
}

async function main() {
    const startTime = new Date()
    console.log('Fetching Pokemon data...');
    // Fetch data using Promises
    //fetchPokeDataByPromise();
    await fetchPokeData();
    const endTime = new Date()
    const elapsedTime = endTime.getTime() - startTime.getTime()
    const elapsedTimeInSeconds = elapsedTime / 1000
    const elapsedTimeInMinutes = elapsedTimeInSeconds / 60
    console.log(`Elapsed time: ${elapsedTime} ms (${elapsedTimeInSeconds} seconds or ${elapsedTimeInMinutes} minutes)`)
}

await main();
export { };

