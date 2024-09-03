<script lang="ts">
  // var name = 'world';
  let foo: any = 'foo'
  const bar = ['baz', 'qux']

  foo = {} // you can reassign foo because it's type is 'any'
  bar.push('quux') // you can modify the array, just not reassign it

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
        - object `

let isDone: boolean = false; // Assignment operator is '='.  Read it as "is assigned the value of"
let num1 = 3
let num2 = 3
let num3 = num1 + num2

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
}

//JSON.stringify(sportsCar)

</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-5">
		<h1 class="text-4xl text-slate-400">Welcome to my JavaScript Site!</h1>
		<p class="text-lg text-slate-400">Result is {Color[2]}!</p>
	</div>
</div>
