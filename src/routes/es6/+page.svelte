<script lang="ts">
	import { CodeBlock } from '@skeletonlabs/skeleton';

	// Any type
	let notSure: any = {};
	// notSure is of type 'any' so it can be assigned and reassigned any value

	// Void type
	function warnUser(message: any): void {
		alert(message);
	}
	// void is used on functions that return nothing

	// Null and Undefined
	let u: undefined = undefined; // undefined is a JavaScript primitive value, and TypeScript has a type named undefine that corresponds to the JavaScript value

	let n: null = null; // null is a JavaScript primitive value, and TypeScript has a type named null that corresponds to the JavaScript value

	// Never type
	function error(message: string): never {
		throw new Error(message);
	}
	// never is a data type that represents the type of values that never occur
	// an example of this is a function that returns never is a function that always throws an error or one that never returns
</script>

<h1 class="text-3xl bg-slate-100 text-blue-800 text-center py-4">ES6 Examples</h1>

<CodeBlock
	class="m-4"
	language="ts"
	code={`// Any type
let notSure: any = {}
// notSure is of type 'any' so it can be assigned and reassigned any value`}
></CodeBlock>

<CodeBlock
	class="m-4"
	language="ts"
	code={`// Void type
function warnUser(message: any): void {
  alert(message);
}
// void is used on functions that return nothing`}
></CodeBlock>

<CodeBlock
	class="m-4"
	language="ts"
	code={`// Null and Undefined
let u: undefined = undefined; // undefined is a JavaScript primitive value, 
// and TypeScript has a type named undefine that corresponds to the JavaScript value

let n: null = null; // null is a JavaScript primitive value,
// and TypeScript has a type named null that corresponds to the JavaScript value`}
></CodeBlock>

<CodeBlock
    class="m-4"
    language="ts"
    code={`// Never type
	function error(message: string): never {
		throw new Error(message);
	}
	// never is a data type that represents the type of values that never occur
	// an example of this is a function that returns never is a function that 
    // always throws an error or one that never returns`}></CodeBlock>
