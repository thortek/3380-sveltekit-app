<script lang="ts">
	type Character = {
    id: string,
    name: string,
    alternate_names: [],
    species: string,
    gender: string,
    house: string,
    dateOfBirth: string,
    yearOfBirth: number,
    wizard: true,
    ancestry: string,
    eyeColour: string,
    hairColour: string,
    wand: { wood: string, core: string, length: number },
    patronus: string,
    hogwartsStudent: boolean,
    hogwartsStaff: boolean,
    actor: string,
    alternate_actors: [],
    alive: boolean,
    image: string
	};

	let hpCharacters: Character[] = [];
    let mockarooData: any

	const getHPCharacters = async () => {
		const response = await fetch('/api/harryPotter');
		const data = await response.json();
		console.log(data);
		hpCharacters = data;
	};

    const getMockarooData = async () => {
		const response = await fetch('/api/mockaroo', {
            method: 'POST',
        });
        console.log(response);
		const data = await response.json();
		console.log(data);
		mockarooData = data;
	};
</script>

<h1>API Practice</h1>

<div class="m-8">
	<button
		class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
		on:click={getHPCharacters}
	>
		Make Harry Potter API Call
	</button>

    <button
    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    on:click={getMockarooData}
>
    Make Mockaroo API Call
</button>
</div>
    
    {#if hpCharacters.length > 0}
        <div class="container mx-auto w-full flex flex-wrap">
            {#each hpCharacters as character}
                <figure class="m-4 shadow-x p-2 bg-slate-500 rounded">
                    <img class="rounded-lg" width="300" src={character.image !== "" ? character.image : '/favicon.png'} alt={character.name} />
                    <figcaption class="text-center">{character.name}</figcaption>
                </figure>
            {/each}
        </div>
    {/if}

    {#if mockarooData}
        <div class="container mx-auto w-full flex flex-wrap items-center">
            {#each mockarooData as data}
                <div class="mx-2">
                    <img src={data.logo} alt={data.model}/>
                    <p>{data.make}</p>
                    <p>{data.model}</p>
                    <p>{data.year}</p>
                </div>
            {/each}
        </div>
    {/if}
