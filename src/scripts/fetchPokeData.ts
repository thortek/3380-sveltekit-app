
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
            const firstFiveMovesData = await fetchPokemonMoves(pokemon, data.moves);

            const reducedPokemon = {
                name: pokemon.name,
                base_experience: data.base_experience,
                id: data.id,
                height: data.height,
                weight: data.weight,
                types: data.types.map((type: { type: { name: string } }) => type.type.name),
                moves: firstFiveMovesData,
            }
            return reducedPokemon;
        })
    );
   
    return pokemonData
}

async function fetchPokemonMoves(pokemon: any, moves: any) {
    console.log(`Fetching ${moves.length} moves for ${pokemon.name}`);
    console.log(moves[0].move.name, moves[0].move.url);
    const firstFiveMoves = moves.slice(0, 5);
    const moveData = await Promise.all(
        firstFiveMoves.map(async (move: { move: { name: string, url: string } }) => {
            const response = await fetch(move.move.url);
            const data = await response.json();
            const reducedMove = {
                name: move.move.name,
                accuracy: data.accuracy,
                power: data.power,
            }
            return reducedMove;
        })
    );
    return moveData;
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

