import { SimpleLogger } from '@hellocacbantre/logger'
import Redis from 'ioredis'

const Logger = SimpleLogger

export function createConnect(uri: string): Redis {
  const client: Redis = new Redis(uri, {
    connectTimeout: 5000, // maximum time to connect to Redis, default is 10S
    enableReadyCheck: true, // check Redis connection before starting to use
    maxRetriesPerRequest: 5, // max reconnects per command execution, default is 20
    retryStrategy: (times) => {
      // try reconnecting after the number of seconds returned.
      if (times <= 3) {
        return 1000
      }
      return null
    }
  })

  client.on('connect', () => {
    Logger.info('[RedisIo:::] connected!!')
  })

  client.on('error', (err) => {
    Logger.error(err, `[RedisIo:::] client Error ${err.message}`)
  })

  process.on('SIGINT', async () => {
    client.disconnect()
    process.exit(0)
  })

  process.on('SIGTERM', async () => {
    client.disconnect()
    process.exit(0)
  })

  return client
}
