import io from 'socket.io-client'
import Api from './defaultApi'

export const socket=io(Api)