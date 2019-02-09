/**
 * @jest-environment node
 */
import defaultSSR, { ssr, write, end } from 'server/lib/ssr.js'

jest.mock('llog')

const mockReq = {
  originalUrl: '/'
}

const mockRes = {
  redirect: jest.fn(),
  status: jest.fn(),
  end: jest.fn(),
  write: jest.fn(),
  on: jest.fn(),
  removeListener: jest.fn(),
  emit: jest.fn()
}

describe('server/lib/ssr.js', () => {
  describe('ssr', () => {
    it('redirects when context.url is set', () => {
      const req = Object.assign({}, mockReq)
      const res = Object.assign({}, mockRes)
      const getApplicationStream = jest.fn((originalUrl, context) => {
        context.url = '/redirect'
      })
      const doSSR = ssr(getApplicationStream)

      expect(typeof doSSR).toBe('function')
      doSSR(req, res)
      expect(res.redirect).toBeCalledWith(301, '/redirect')
    })

    it('catches error and logs before returning 500', () => {
      const log = require('llog')
      const req = Object.assign({}, mockReq)
      const res = Object.assign({}, mockRes)
      const getApplicationStream = jest.fn((originalUrl, context) => {
        throw new Error('test')
      })
      const doSSR = ssr(getApplicationStream)
      expect(typeof doSSR).toBe('function')
      doSSR(req, res)
      expect(log.error).toBeCalledWith(Error('test'))
      expect(res.status).toBeCalledWith(500)
      expect(res.end).toBeCalled()
    })
  })
  describe('defaultSSR', () => {
    it('renders app with default SSR', () => {
      const req = Object.assign({}, mockReq)
      const res = Object.assign({}, mockRes)
      defaultSSR(req, res)
      expect(res.status).toBeCalledWith(200)
      expect(res.write.mock.calls[0][0]).toContain('<!DOCTYPE html>')
      expect(res.write.mock.calls[0][0]).toContain(
        'window.___REACT_DEFERRED_COMPONENT_MARKS'
      )
    })
  })

  describe('#write', () => {
    it('write queues data', () => {
      const context = {
        queue: jest.fn()
      }
      const buffer = new Buffer.from('hello')
      write.call(context, buffer)
      expect(context.queue).toBeCalledWith(buffer)
    })
  })

  describe('#end', () => {
    it('end queues endingFragment and then null to end stream', () => {
      const context = {
        queue: jest.fn()
      }
      const endingFragment = '</html>'
      const doEnd = end(endingFragment)
      doEnd.call(context)
      expect(context.queue).toBeCalledWith(endingFragment)
      expect(context.queue).toBeCalledWith(null)
    })
  })
})
