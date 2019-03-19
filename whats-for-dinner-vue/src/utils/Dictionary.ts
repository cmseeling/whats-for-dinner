import * as _ from 'lodash';

export interface IDictionary<T> {
    Upsert(key: string, value: T): void;
    ContainsKey(key: string): boolean;
    Count(): number;
    Item(key: string): T;
    Keys(): string[];
    Remove(key: string): T;
    Values(): T[];
    toJSON(): string;
}

interface IKeyValueCache<T> {
    keys: string[]|null;
    values: T[]|null;
    count: number|null;
}

export class Dictionary<T> implements IDictionary<T> {
    private items: { [index: string]: T };

    private count: number = 0;
    private cache: IKeyValueCache<T>|null = null;

    constructor(items: { [index: string]: T } = {}) {
        this.items = items;
    }

    public ContainsKey(key: string): boolean {
        return this.items.hasOwnProperty(key);
    }

    public Count(): number {
        let fillCache = false;
        if (!this.cache) {
            this.cache = {
                keys: [],
                values: null,
                count: null
            };
            fillCache = true;
        }
        if (this.cache.count === null) {
            this.cache.count = 0;
            fillCache = true;
        }

        if (fillCache) {
            this.cache.count = _.keys(this.items).length;
        }

        return this.cache.count;
    }

    public Upsert(key: string, value: T) {
        if (!this.items.hasOwnProperty(key)) {
            this.count++;
        }
        this.cache = null;
        this.items[key] = value;
    }

    public Remove(key: string): T {
        const val = this.items[key];
        delete this.items[key];
        this.count--;
        this.cache = null;
        return val;
    }

    public Item(key: string): T {
        return this.items[key];
    }

    public Keys(): string[] {
        let fillCache = false;
        if (!this.cache) {
            this.cache = {
                keys: [],
                values: null,
                count: null
            };
            fillCache = true;
        }
        if (!this.cache.keys) {
            this.cache.keys = [],
            fillCache = true;
        }

        if (fillCache) {
            for (const prop in this.items) {
                if (this.items.hasOwnProperty(prop)) {
                    this.cache.keys.push(prop);
                }
            }
        }

        return this.cache.keys;
    }

    public Values(): T[] {
        let fillCache = false;
        if (!this.cache) {
            this.cache = {
                keys: null,
                values: [],
                count: null
            };
            fillCache = true;
        }
        if (!this.cache.values) {
            this.cache.values = [],
            fillCache = true;
        }

        if (fillCache) {
            for (const prop in this.items) {
                if (this.items.hasOwnProperty(prop)) {
                    this.cache.values.push(this.items[prop]);
                }
            }
        }

        return this.cache.values;
    }

    public toJSON(): string {
        return JSON.stringify(this.items);
    }
}
