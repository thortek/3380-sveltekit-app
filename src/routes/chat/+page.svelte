<script lang="ts">
	import { marked } from 'marked';
	import { chatHistoryStore } from '$lib/stores/chatHistoryStore';
	import { readableStreamStore } from '$lib/stores/readableStreamStore';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { fly } from 'svelte/transition'

	let inputChat = '';
	let answerText = '';

	const response = readableStreamStore();

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

			$chatHistoryStore = [...$chatHistoryStore, { role: 'assistant', content: answerText }];
		} catch (error) {
			console.error(error);
			$chatHistoryStore = [
				...$chatHistoryStore,
				{ role: 'assistant', content: `Sorry, I am not able to answer that. ${error}` }
			];
		}
	}
</script>

<main class="w-screen h-full flex flex-col items-center">
<form class="flex flex-col space-y-4 w-full max-w-7xl p-1" on:submit={handleSubmit}>
	<div>
		<!-- 		<input
			class="input m-2"
			type="text"
			name="message"
			placeholder="Type a message"
			bind:value={inputChat}
		/>
		<button class="btn variant-filled-primary m-2" type="submit">Send Chat</button> -->
		{#await new Promise((res) => setTimeout(res, 1000)) then _}
			<div class="flex space-x-2">
				<Avatar class="" src={'/img-tutor-girl.png'} rounded="rounded-full" width="w-12" />
				<div in:fly={{ y: 50, duration: 1000}} class="assistant-chat">
					Hello! How can I help you?
				</div>
			</div>
		{/await}
		<div class="space-y-4">
			<hr />
			<div class="flex space-x-4">
				<textarea class="textarea" placeholder="Type your message..." name="message" rows="3" />
				<div class="flex flex-col justify-between">
					<button class="btn variant-filled-primary" type="submit">Send</button>
					<button class="btn variant-outline-primary" type="reset">Clear Chats</button>
				</div>
			</div>
		</div>
	</div>
</form>
</main>

<style lang="postcss">
	.assistant-chat {
		@apply bg-gray-200 text-gray-800 rounded-lg p-2
	}

	.user-chat {
		@apply bg-slate-800 text-white
	}
</style>