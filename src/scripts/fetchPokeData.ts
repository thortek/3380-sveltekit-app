const pokeUrl = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151';
import { promises as fsPromises } from 'fs';


// Fetch data from the pokeUrl using async/await
async function fetchPokeData() {
	try {
		const response = await fetch(`https://pokeapi./api/v2/pokemon/1`);
		const data = await response.json();
		fsPromises.writeFile('data/pokemon.json', JSON.stringify(data, null, 2));
	} catch (error) {
		console.error('Error:', error);
	}
}

async function fetchAllPokemonData(pokemonArray: { name: string, url: string }[]) {
    const pokemonData = await Promise.all(
        pokemonArray.map(async (pokemon) => {
            const response = await fetch(pokemon.url);
            return response.json();
        })
    );
    //console.log(pokemonData);
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

