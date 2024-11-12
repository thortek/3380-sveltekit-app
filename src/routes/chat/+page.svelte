<script lang="ts">
	import { marked } from 'marked';
	import { chatHistoryStore } from '$lib/stores/chatHistoryStore';
	import { readableStreamStore } from '$lib/stores/readableStreamStore';

	let inputChat = '';
	let answerText = '';

	async function handleSubmit(this: HTMLFormElement, event: Event) {
		event.preventDefault();
		const formData: FormData = new FormData(this);
		const message = formData.get('message') as string;

		// we need to check if the message is empty
		if (message === '') return;

		$chatHistoryStore = [...$chatHistoryStore, { role: 'user', content: message }];

		const response = await fetch('/api/chat', {
			method: 'POST',
			body: JSON.stringify({
				chats: $chatHistoryStore
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		console.log(response);
		const data = await response.json();
		answerText = await marked.parse(data.message);
	}
</script>

<h1>Chat happens here</h1>

<form on:submit={handleSubmit}>
	<input
		class="input m-2"
		type="text"
		name="message"
		placeholder="Type a message"
		bind:value={inputChat}
	/>
	<button class="btn variant-filled-primary m-2" type="submit">Send Chat</button>
</form>
<div>
	{@html answerText}
</div>
