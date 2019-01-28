import { onListen } from 'server/index'

jest.mock('llog')
jest.mock('server/lib/server', () => ({
  server: {
    use: jest.fn(),
    get: jest.fn(),
    listen: jest.fn()
  },
  serveStatic: jest.fn(() => "static/path")
}))
jest.mock('server/lib/ssr')

describe('server/index.js', () => {
  it('main', () => {
    const { server, serveStatic } = require('server/lib/server')
    expect(server.use).toBeCalledWith('/dist/client', "static/path")
    expect(serveStatic).toBeCalledWith(`${process.cwd()}/dist/client`)
    expect(server.get).toBeCalledWith('/*', expect.any(Function))
    expect(server.listen).toBeCalledWith(1234, expect.any(Function))
  })

  it('onListen', () => {
    const log = require('llog')
    onListen(4000)()
    expect(log.info).toBeCalledWith('Listening on port 4000...')
  })
})