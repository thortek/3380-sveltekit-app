<script lang="ts">
	import { CodeBlock } from '@skeletonlabs/skeleton';

	function filteredArray(arr: any, elem: any) {
		let newArr: any = [];
		// Removes any nested array that contains the element
		for (let i = 0; i < arr.length; i++) {
			if (!arr[i].includes(elem)) {
				newArr.push(arr[i]);
			}
		}

		return newArr;
	}

    function filterTheArray() {
        const result = filteredArray(
            [
                [10, 8, 3],
                [14, 6, 23],
                [3, 18, 6],
            ],
            14
        );
        return result
    }
</script>

<h1>Loops</h1>

<CodeBlock
	class="m-4"
	language="ts"
	code={`function filteredArray(arr: any, elem: any) {
  let newArr: any = [];
  // Only change code below this line
  for (let i = 0; i < arr.length; i++) {
  if (!arr[i].includes(elem)) {
    newArr.push(arr[i])
  }
}
  // Only change code above this line
  return newArr;

`}
></CodeBlock>

<div class="flex m-4">
    <input class="input w-32" type="text" id="input" />
    <button class="btn variant-filled-primary" id="submit" on:click={filterTheArray}>Change the Element</button>
</div>
