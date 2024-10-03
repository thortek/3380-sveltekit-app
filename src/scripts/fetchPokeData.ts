
import { promises as fsPromises } from 'fs';
import 'dotenv/config'

const pokeUrl = `https://pokeapi.co/api/v2/pokemon/?offset=725&limit=25`;

//console.log('Hello from fetchPokeData.ts', process.env);

let initialPokeArray = [];


// Fetch data from the pokeUrl using async/await
async function fetchPokeData() {
	try {
		const response = await fetch(pokeUrl);
		const data = await response.json();
        initialPokeArray = data.results;
        const allPokeData = await fetchAllPokemonData(initialPokeArray);
		fsPromises.writeFile('data/pokemon.json', JSON.stringify(allPokeData, null, 2));
	} catch (error) {
		console.error('Error:', error);
	}
}

async function fetchAllPokemonData(pokemonArray: { name: string, url: string }[]) {
    const pokemonData = await Promise.all(
        pokemonArray.map(async (pokemon) => {
            const response = await fetch(pokemon.url);
            const data = await response.json();
            
            //console.log(data);
            await fetchPokemonMoves(data.moves[0].move.url);

            const reducedPokemon = {
                name: pokemon.name,
                base_experience: data.base_experience,
                id: data.id,
                height: data.height,
                weight: data.weight,
                types: data.types.map((type: { type: { name: string } }) => type.type.name),
            }
            return reducedPokemon;
        })
    );
   
    return pokemonData
}

async function fetchPokemonMoves(moveUrl: any) {
    console.log(moveUrl);
/*     const testObject = {
        name: move.name,
        accuracy: move.accuracy,
        power: move.power,
    }
    console.log(testObject); */
     const response = await fetch(moveUrl);
    const data = await response.json();
    console.log(data.name);
}


async function main() {
    const startTime = new Date()
    console.log('Fetching Pokemon data...');
    // Fetch data using Promises
    //fetchPokeDataByPromise();
    await fetchPokeData();
    console.log(`initialPokeArray length is: ${initialPokeArray.length}`);
    const endTime = new Date()
    const elapsedTime = endTime.getTime() - startTime.getTime()
    const elapsedTimeInSeconds = elapsedTime / 1000
    const elapsedTimeInMinutes = elapsedTimeInSeconds / 60
    console.log(`Elapsed time: ${elapsedTime} ms (${elapsedTimeInSeconds} seconds or ${elapsedTimeInMinutes} minutes)`)
}

await main();

export { };

