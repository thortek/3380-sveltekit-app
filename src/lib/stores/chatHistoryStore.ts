import { writable, type Writable } from 'svelte/store';

export const chatHistoryStore: Writable<{ role: 'user' | 'assistant', content: string }[]> = writable([]);

chatHistoryStore.subscribe(value => {
    console.log(value);
})