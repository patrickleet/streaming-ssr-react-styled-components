import path from 'path'
import log from 'llog'
import { server, serveStatic } from './lib/server'
import ssr from './lib/ssr'

// Expose the public directory as /dist and point to the browser version
server.use(
  '/dist/client',
  serveStatic(path.resolve(process.cwd(), 'dist', 'client'))
)

// Anything unresolved is serving the application and let
// react-router do the routing!
server.get('/*', ssr)

// Check for PORT environment variable, otherwise fallback on Parcel default port
const port = process.env.PORT || 1234
export const onListen = port => () => {
  log.info(`Listening on port ${port}...`)
}
server.listen(port, onListen(port))
