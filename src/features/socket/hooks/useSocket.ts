import { useSocketContext } from '../SocketProvider'

export function useSocket() {
  return useSocketContext()
}
