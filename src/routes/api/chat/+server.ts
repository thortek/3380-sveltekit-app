import OpenAI from 'openai'

const openai = new OpenAI({
    baseURL: 'http://localhost:11434/v1',
    apiKey: 'ollama', // required but unused
})

export type MessageBody = { chats: { role: 'user' | 'assistant'; content: string }[] };

export const POST = async ({ request }) => {
    const body: MessageBody = await request.json()
    console.log(body.chats)

    const stream = await openai.chat.completions.create({
        model: 'llama3.2',
        messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'assistant', content: 'Hello! How can I help you today?' },
            ...body.chats
        ],
        stream: true
    })

    // Create a new ReadableStream for the response
		const readableStream = new ReadableStream({
			async start(controller) {
				for await (const chunk of stream) {
					const text = chunk.choices[0]?.delta?.content || '';
					controller.enqueue(text);
				}
				controller.close();
			}
		})

    return new Response(readableStream, {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}