<script lang="ts">
import pokemonData from '../../../data/pokemon.json';

//console.log(pokemonData);

const getPokemon = async () => {
  const response = await fetch('/api/pokemon', {
    method: 'POST',
    body: JSON.stringify({ pokemonID: 750 })
  })
  const data = await response.json();
  console.log(data);
}
</script>

<main class="flex flex-col">
  <div class="m-8">
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" on:click={getPokemon}>
      Make API Call
  </div>
    <ul>
      <div class="flex flex-wrap">
        {#each pokemonData as pokemon, i}
        <li>
            <a href={`pokemon/${i}`}>{pokemon.name}</a>
        </li>
        <img src={pokemon.image} alt={pokemon.name} width="120" />
        {/each}
        </div>
    </ul>
  
</main>