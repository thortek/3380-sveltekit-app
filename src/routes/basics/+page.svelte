<script lang="ts">
	// var name = 'world';
	let foo: any = 'foo';
	const bar = ['baz', 'qux'];

	foo = {}; // you can reassign foo because it's type is 'any'
	bar.push('quux'); // you can modify the array, just not reassign it

	const dataTypeComment = `TypeScript adds several data types on top of JavaScript's data types:
  - boolean
        - number
        - string
        - array
        - tuple
        - enum
        - any
        - void
        - null and undefined
        - never
        - object `;

	let isDone: boolean = false; // Assignment operator is '='.  Read it as "is assigned the value of"

	let selectedNumber = 0;

	let myArray: number[] = [1, 2, 3, 4, 5]; // Array of numbers
	let myArray2: Array<number> = [1, 2, 3, 4, 5]; // Array of numbers

	let myTuple: [string, number, string] = ['hello', 10, 'world']; // Tuple

	enum Color {
		Red,
		Bahama_Green,
		Island_Teal,
		Quartz
	}

	const sportsCar = {
		make: 'Porsche',
		model: '911',
		year: 2020,
		color: Color.Quartz
	};

	//JSON.stringify(sportsCar)

	function addNumbers(num1: number, num2: number): number {
		selectedNumber = num1 + num2;
		return num1 + num2;
	}

	() => {}; // simplest form of an arrow or anonymous function

	const addNumbers2 = (num1: number, num2: number): number => {
		return num1 + num2;
	};

	const addNumbers3 = (num1: number, num2: number): number => num1 + num2;

	let myNum = 5;
	//console.log(myNum === 5, 0 === false)
</script>

<div class="container h-full mx-auto flex flex-col justify-center items-center">
	<div class="space-y-5">
		
		<p class="text-lg text-slate-400">The result of displaying the value of an enum: {Color[2]}!</p>
	</div>

	<div class="p-4 m-4 bg-slate-600">
		<p>If you don't JSON.stringify() an object, you get this: {sportsCar}</p>
		<p>This object is stringified: {JSON.stringify(sportsCar)}</p>
	</div>
</div>

<h1 class="bg-secondary-100 text-primary-700">
	Here is the result of the addNumbers function: {addNumbers(2, 2)}
</h1>
<p class="text-2xl font-bold bg-green-900 p-4">
	Equality operator is "==". While strict equality is "==="
</p>
<p class="text-2xl font-bold bg-green-900 p-4">console.log(myNum === 5, 0 === false)</p>

{#if selectedNumber > 5}
	<p class="text-2xl font-bold bg-green-300 p-4 m-4">The selected number is: {selectedNumber}</p>
{:else}
	<p class="text-2xl font-bold bg-green-300 p-4 m-4">
		The selected number is less than or equal to 5: {selectedNumber}
	</p>
{/if}

<p>Ternary operator example: {selectedNumber > 5 ?  'The selected number is greater than 5': 'The selected number is less than or equal to 5'}</p>
