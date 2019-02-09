import express from 'express'
import { server, serveStatic } from 'server/lib/server.js'

describe('server/lib/server', () => {
  it('should provide server APIs to use', () => {
    expect(server).toBeDefined()
    expect(server.use).toBeDefined()
    expect(server.get).toBeDefined()
    expect(server.listen).toBeDefined()
    expect(serveStatic).toEqual(express.static)
  })
})
