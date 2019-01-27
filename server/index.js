import path from 'path'
import express from 'express'
import log from 'llog'
import ssr from './lib/ssr'

const app = express()

// Expose the public directory as /dist and point to the browser version
app.use(
  '/dist/client',
  express.static(path.resolve(process.cwd(), 'dist', 'client'))
)

// Anything unresolved is serving the application and let
// react-router do the routing!
app.get('/*', ssr)

// Check for PORT environment variable, otherwise fallback on Parcel default port
const port = process.env.PORT || 1234
app.listen(port, () => {
  log.info(`Listening on port ${port}...`)
})
