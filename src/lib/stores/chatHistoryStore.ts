import { writable, type Writable } from 'svelte/store';
import { localStorageStore } from '@skeletonlabs/skeleton';

export const chatHistoryStore: Writable<{ role: 'user' | 'assistant', content: string }[]> = localStorageStore('chatHistory', []);

chatHistoryStore.subscribe(value => {
    console.log(value);
})