<script lang="ts">
	import { Marked } from 'marked';
	import { chatHistoryStore } from '$lib/stores/chatHistoryStore';
	import { readableStreamStore } from '$lib/stores/readableStreamStore';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { fly } from 'svelte/transition';
	import TypingIndicator from '$lib/utils/typingIndicator.svelte'
	// importing optional packages for syntax highlighting
	import { markedHighlight } from 'marked-highlight';
	import hljs from 'highlight.js';
	import javascript from 'highlight.js/lib/languages/javascript';
	import typescript from 'highlight.js/lib/languages/typescript';
	import css from 'highlight.js/lib/languages/css';
	import DOMPurify from 'dompurify';

	// register the languages I want to highlight
	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('typescript', typescript);
	hljs.registerLanguage('css', css);

	const marked = new Marked(
		markedHighlight({
			langPrefix: 'hljs language-',
			highlight: (code, lang) => {
				const language = hljs.getLanguage(lang) ? lang : 'plaintext';
				return hljs.highlight(code, { language }).value;
			}
		})
	)

	let inputChat = '';
	let answerText = '';

	const response = readableStreamStore();

	let responseText = ''

	$: if ($response.text !== '') {
		(async () => {
			const parsedText = await marked.parse($response.text);
			responseText = DOMPurify.sanitize(parsedText).replace(/<script>/g, '&lt;script&gt;').replace(/<\/script>/g, '&lt;/script&gt;');
		})(); // an IIFE (Immediately Invoked Function Expression) to run the async function
	}

	async function handleSubmit(this: HTMLFormElement, event: Event) {
		event.preventDefault();
		if ($response.loading) return;

		const formData: FormData = new FormData(this);
		const message = formData.get('message') as string;

		// we need to check if the message is empty
		if (message === '') return;

		$chatHistoryStore = [...$chatHistoryStore, { role: 'user', content: message }];

		try {
			const answer = response.request(
				new Request('/api/chat', {
					method: 'POST',
					body: JSON.stringify({
						chats: $chatHistoryStore
					}),
					headers: {
						'Content-Type': 'application/json'
					}
				})
			);

			this.reset();

			const answerText = (await answer) as string;
			const parsedAnswer = await marked.parse(answerText)
			const purifiedText = DOMPurify.sanitize(parsedAnswer).replace(/<script>/g, '&lt;script&gt;').replace(/<\/script>/g, '&lt;/script&gt;');

			$chatHistoryStore = [...$chatHistoryStore, { role: 'assistant', content: purifiedText }];
		} catch (error) {
			console.error(error);
			$chatHistoryStore = [
				...$chatHistoryStore,
				{ role: 'assistant', content: `Sorry, I am not able to answer that. ${error}` }
			];
		}
	}

	function deleteAllChats() {
		$chatHistoryStore = [];
	}

  function deleteChat(chat: { role: 'user' | 'assistant'; content: string}) {
    console.log('delete chat');
    return () => {
      $chatHistoryStore = $chatHistoryStore.filter((chatItem) => chatItem !== chat)
    }
  }
</script>

<main class="w-screen h-full flex flex-col items-center">
	<form class="flex flex-col w-full max-w-7xl p-1" on:submit={handleSubmit}>
		
		<div class="space-y-4">
			<!-- 		<input
			class="input m-2"
			type="text"
			name="message"
			placeholder="Type a message"
			bind:value={inputChat}
		/>
		<button class="btn variant-filled-primary m-2" type="submit">Send Chat</button> -->
			{#await new Promise((res) => setTimeout(res, 400)) then _}
				<div class="flex space-x-2">
					<Avatar class="" src={'/img-tutor-girl.png'} rounded="rounded-full" width="w-12" />
					<div in:fly={{ y: 50, duration: 400 }} class="assistant-chat">
						Hello! How can I help you?
					</div>
				</div>
			{/await}
			<!-- Need to display each chat item here -->
			{#each $chatHistoryStore as chat}
				{#if chat.role === 'user'}
					<div class="flex justify-end space-x-2 group/chat hover:bg-gray-400 hover:rounded-lg p-1 ml-auto">
						<Avatar class="h-12 shrink-0" src={'/PikaThorAnime.png'} rounded="rounded-full" width="w-12" />
						<div class="user-chat">
							{chat.content}
						</div>
						<button type="button" class="group/delete invisible btn-icon max-h-6 w-6 hover:bg-gray-500 group-hover/chat:visible" on:click={deleteChat(chat)}>
							<img src="/x-circle-close-delete.svg" alt="Chat close box" />
						</button>
					</div>
				<!-- this else handles the assistant role chat display -->
 				{:else}
				<div class="flex space-x-2 group/chat hover:bg-gray-400 hover:rounded-lg p-1 mr-auto">
					<Avatar class="h-12 shrink-0" src={'/img-tutor-girl.png'} rounded="rounded-full" width="w-12" />
					<div class="assistant-chat">
						{@html chat.content}
					</div>
					<button type="button" class="group/delete invisible btn-icon max-h-6 w-6 hover:bg-gray-500 group-hover/chat:visible" on:click={deleteChat(chat)}>
						<img src="/x-circle-close-delete.svg" alt="Chat close box" />
					</button>
				</div>
				{/if}
			{/each}
			{#if $response.loading}
			{#await new Promise((res) => setTimeout(res, 400)) then _}
				<div class="flex">
					<div class="flex space-x-2">
						<Avatar class="h-12 shrink-0" src={'/img-tutor-girl.png'} rounded="rounded-full" width="w-12" />
						<div class="assistant-chat">
							{#if $response.text === ''}
								<TypingIndicator/>
							{:else}
								{@html responseText}
							{/if}
						</div>
					</div>
				</div>
			{/await}
			{/if}
			<div class="space-y-4">
				<hr />
				<div class="flex space-x-4">
					<textarea class="textarea" placeholder="Type your message..." name="message" rows="3" />
					<div class="flex flex-col justify-between">
						<button class="btn variant-filled-primary" type="submit">Send</button>
						<button class="btn variant-outline-primary" type="reset" on:click={deleteAllChats}>Clear Chats</button>
					</div>
				</div>
			</div>
		</div>
	</form>
</main>

<style lang="postcss">
	.assistant-chat {
		@apply bg-gray-200 text-gray-800 rounded-lg p-2;
	}

	.user-chat {
		@apply bg-slate-800 text-white;
	}
</style>
