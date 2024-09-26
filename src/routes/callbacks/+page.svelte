<script lang="ts">
    import { CodeBlock } from '@skeletonlabs/skeleton';

function fetchData(callback: any) {
    // Simulate an asynchronous API call or request using setTimeout
    setTimeout(() => {
        // Call the callback function and pass the data
        callback('bar', 'Data from the API');
    }, 2000)
}

// Now let's call the fetchData function and pass a callback function
fetchData((error: any, data: any) => {
    if (error) {
        console.error(error)
    } else {
        console.log(data);
    }
});

// Fetch data from the pokeUrl using Promises
function fetchPokeDataByPromise() {
    fetch('https://pokeapi.co/api/v2/pokemon/ditto')
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

</script>

<h1>Callback Examples</h1>

<!-- Show the code examples using the CodeBlock component -->

<CodeBlock
	class="m-4"
	language="ts"
	code={`function fetchData(callback: any) {
    // Simulate an asynchronous API call or request using setTimeout
    setTimeout(() => {
        // Call the callback function and pass the data
        callback('bar', 'Data from the API');
    }, 2000)
}`}
></CodeBlock>
