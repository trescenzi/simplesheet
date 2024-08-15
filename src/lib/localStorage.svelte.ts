import { browser } from '$app/environment';

export class LocalStore<T> {
  _value = $state<T>() as T;
  _key = '';

  constructor(key: string, value: T) {
    this._key = key;
    this._value = value;

    if (browser) {
      const item = localStorage.getItem(key);
      if (item) this._value = JSON.parse(item);
    }

    $effect(() => {
      localStorage.setItem(this._key, JSON.stringify(this._value));
    });

    // reflect values
    if(value != undefined && typeof value === 'object') {
      const keys = Object.keys(value) as Array<keyof T>;
      Object.defineProperties(this, keys.reduce((properties, key) => ({
        ...properties,
        [key]: {
          get: () => this._value[key] as T[typeof key],
          set: (value: T[typeof key]) => {
            this._value[key] = value;
          }
        }
      }), {}));
    }
  }
}
