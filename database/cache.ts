import { RedisClientType } from "@redis/client";
import { createClient } from "redis";
import { IUser } from "../store/interfaces/user.interface";

class Cache {
    private client!: RedisClientType;
    async connect() {
        this.client = createClient();
        await this.client.connect();
    }
    async set(key: string, value: object, expiry: number) {
        await this.client.set(key, JSON.stringify(value), { EX: expiry });
    }
    async get(key: string): Promise<IUser> {
        const value = await this.client.get(key);
        return value && JSON.parse(value);
    }
    async delete(key: string) {
        if (!key) return;
        await this.client.del(key);
    }
    async disconnect() {
        await this.client.flushAll();
        await this.client.quit();
    }
}
export const cache = new Cache();
