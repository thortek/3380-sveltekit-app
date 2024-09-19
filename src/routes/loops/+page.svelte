<script lang="ts">
	import { CodeBlock } from '@skeletonlabs/skeleton';

  let newArr: string
  let inputArray = JSON.stringify([[10, 8, 3],[14, 6, 23],[3, 18, 6]])
  let element = 18

  $: console.log(inputArray, element)

	function filterTheArray() {
		let userArray = JSON.parse(inputArray)
    let tempArr = []
		// Removes any nested array that contains the element
		for (let i = 0; i < userArray.length; i++) {
			if (!userArray[i].includes(element)) {
				tempArr.push(userArray[i])
			}
		}
    newArr = JSON.stringify(tempArr)
    console.log(newArr)
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
    <input bind:value={inputArray} class="input w-96 mr-4" type="text" id="input" placeholder="[[10, 8, 3],[14, 6, 23],[3, 18, 6]]" />
    <input bind:value={element} class="input w-32 mr-4" type="text" id="input" placeholder="23" />
    <button class="btn variant-filled-primary" id="submit" on:click={filterTheArray}>Change the Element</button>
    <input bind:value={newArr} class="input w-96 ml-4" type="text"/>
</div>
