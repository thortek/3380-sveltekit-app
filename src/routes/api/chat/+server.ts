import OpenAI from 'openai'

const openai = new OpenAI({
    baseURL: 'http://localhost:11434/v1',
    apiKey: 'ollama', // required but unused
})

export const POST = async ({ request }) => {
    const body = await request.json()
    console.log(body.chats)

    const completion = await openai.chat.completions.create({
        model: 'llama3.2',
        messages: [
          // { role: 'user', content: 'What is the purpose of life?' },
            ...body.chats
        ]
    })

    console.log(completion.choices[0].message.content)

    return new Response(JSON.stringify({ message: completion.choices[0].message.content }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}