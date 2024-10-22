<script lang="ts">
	
export let data: any
export let form: any

console.log(data)

</script>

<h1>MongoDB connection page</h1>


<form method="POST" action="?/addNameToDB">
    <input class="input" type="text" name="userName" placeholder="Enter your name" />
    <select 
    <button class="btn variant-filled-primary" type="submit">Submit</button>
</form>
{#if form}
    <h1>{form.body.message}</h1>
{/if}

{#each data.body.results as result}
    <h1>{result.userName}</h1>
{/each}