import { SimpleFalcon, createConnect, SimpleRedlock } from '../src'
import * as dotenv from 'dotenv'
// import '@jest/globals'

const NODE_ENV = process.env.NODE_ENV === 'production' ? 'production.env' : 'dev.env'
dotenv.config({ path: NODE_ENV })

const main = async () => {
  try {
    const client = createConnect(process.env.REDIS_URI ?? '')
    const redlock = new SimpleRedlock([client])
    const lock = await redlock.acquireLock(['ad'], 5400)
    await lock.extend(500)
    await lock.release()

    const falcon = new SimpleFalcon(client)
    console.log(await falcon.set('lock', 'lock'))
  } catch (error) {
    console.error(error)
  }
}

void main()

// ts-node-esm tests/connect.test.ts

// describe('Redlock Lock Tests', () => {
//   const client = createConnect(
//     'redis://:XlDMJV3svB6yXzNnof5ITMBmfYx5cfmd@redis-19276.c15.us-east-1-4.ec2.cloud.redislabs.com:19276'
//   )
//   const redlock = new SimpleRedlock([client])
//   let lock: any

//   beforeEach(async () => {
//     lock = await redlock.acquireLock(['ad'], 5400)
//   }, 100000)

//   afterEach(async () => {
//     await lock.release()
//   })

//   test('should not be able to acquire lock while it is held by another client', async () => {
//     const newClient = createConnect(
//       'redis://:XlDMJV3svB6yXzNnof5ITMBmfYx5cfmd@redis-19276.c15.us-east-1-4.ec2.cloud.redislabs.com:19276'
//     )
//     const newRedlock = new SimpleRedlock([newClient])

//     let error: any
//     try {
//       await newRedlock.acquireLock(['ad'], 100)
//     } catch (e) {
//       error = e
//     }

//     expect(error).toBeDefined()
//     expect(error.message).toContain('Lock not acquired')
//   })
// })

// jest tests/connect.test.ts
