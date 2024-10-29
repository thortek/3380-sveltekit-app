<script lang="ts">
import pokemonData from '../../../data/pokemon.json';

//console.log(pokemonData);

</script>

<main class="flex flex-col">
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