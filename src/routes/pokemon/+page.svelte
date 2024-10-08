<script lang="ts">
import pokemonData from '../../../data/pokemon.json';

console.log(pokemonData);
</script>

<main>
  <h1>Pokemon</h1>
    <ul>
        {#each pokemonData as pokemon, i}
        <li>
            <a href={`pokemon/${i}`}>{pokemon.name}</a>
        </li>
        <img src={pokemon.image} alt={pokemon.name} />
        {/each}
    </ul>
</main>