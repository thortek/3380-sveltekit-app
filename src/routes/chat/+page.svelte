<script lang="ts">

let inputChat = ''
let answerText = ''

async function handleSubmit(this: HTMLFormElement, event: Event) {
       // event.preventDefault();
		const response = await fetch('/api/chat', {
            method: 'POST',
            body: JSON.stringify({
                message: inputChat,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(response)
        const data = await response.json()
        answerText = data.message
	};

</script>

<h1>Chat happens here</h1>

<form on:submit={handleSubmit}>
    <input class="input m-2" type="text" placeholder="Type a message" bind:value={inputChat} />
    <p>{answerText}</p>
    <button class="btn variant-filled-primary m-2" type="submit">Send Chat</button>
</form>