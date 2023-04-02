import type Client from 'ioredis'

export class SimpleFalcon {
  public readonly client: Client
  public readonly prefix: string = ''

  constructor(client: Client, prefix?: string) {
    this.client = client
    this.prefix = prefix ?? ''
  }

  async close(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      void this.client.quit((error) => {
        if (error) {
          return reject(error)
        }

        return resolve(true)
      })
    })
  }

  _keyWithPrefix(key: string): string {
    if (!this.prefix) return key

    return `${this.prefix}:${key}`
  }

  async get(key: string): Promise<string | null> {
    const vKey = this._keyWithPrefix(key)

    return this.client.get(vKey)
  }

  async set(key: string, value: string): Promise<string | null> {
    const vKey = this._keyWithPrefix(key)

    return this.client.set(vKey, value)
  }

  async del(key: string) {
    const vKey = this._keyWithPrefix(key)

    return this.client.del(vKey)
  }

  async getJSON(key: string): Promise<any> {
    const vKey = this._keyWithPrefix(key)

    const valueStr = await this.client.get(vKey)

    if (valueStr === null) return valueStr

    return JSON.parse(valueStr)
  }

  async setJSON(key: string, value: object): Promise<string | null> {
    const vKey = this._keyWithPrefix(key)

    const valueStr = JSON.stringify(value)

    return this.client.set(vKey, valueStr)
  }

  async keys(pattern: string, withPrefix: boolean = true) {
    const vPattern = withPrefix ? this._keyWithPrefix(pattern) : pattern

    return this.client.keys(vPattern)
  }

  async expire(key: string, seconds: number): Promise<boolean> {
    const vKey = this._keyWithPrefix(key)

    const res = await this.client.expire(vKey, seconds)

    return !!res
  }

  async hget(key: string, field: string): Promise<string | null> {
    const vKey = this._keyWithPrefix(key)

    return this.client.hget(vKey, field)
  }

  async hset(key: string, field: string, value: string): Promise<number> {
    const vKey = this._keyWithPrefix(key)

    return this.client.hset(vKey, field, value)
  }

  async hdel(key: string) {
    const vKey = this._keyWithPrefix(key)

    return this.client.hdel(vKey)
  }

  async hexists(key: string, field: string): Promise<boolean> {
    const vKey = this._keyWithPrefix(key)

    const res = await this.client.hexists(vKey, field)

    return !!res
  }

  async hsetJSON(key: string, field: string, value: object): Promise<number> {
    const valueStr = JSON.stringify(value)

    return this.hset(key, field, valueStr)
  }

  async hgetJSON(key: string, field: string): Promise<any> {
    const valueStr = await this.hget(key, field)

    if (valueStr === null) return valueStr

    return JSON.parse(valueStr)
  }

  clone(prefix?: string): SimpleFalcon {
    return new SimpleFalcon(this.client, prefix)
  }
}
