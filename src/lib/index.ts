// place files you want to import through the `$lib` alias in this folder.
import { LocalStore } from './localStorage.svelte';
export function localStore<T>(key: string, value: T) {
  return new LocalStore(key, value);
}
export {parseDiceString, rollDice} from './dice/parse';
