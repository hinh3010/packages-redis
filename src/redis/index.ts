import set from './set'
import get from './get'
import del from './del'
import getTTL from './getTTL'
import getMulti from './getMulti'
import edit from './edit'

export const RedisIo = {
  set,
  get,
  del,
  getTTL,
  getMulti,
  edit
}
