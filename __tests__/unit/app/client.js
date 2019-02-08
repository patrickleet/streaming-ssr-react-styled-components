import React from 'react'
import fs from 'fs'
import path from 'path'
import { start, hydrate } from 'app/client'
import { JSDOM } from 'jsdom'

jest.mock('react-dom')
jest.mock('react-imported-component')
jest.mock('app/imported.js')

// mock DOM with actual index.html contents
const pathToIndex = path.join(process.cwd(), 'app', 'index.html')
const indexHTML = fs.readFileSync(pathToIndex).toString()
const DOM = new JSDOM(indexHTML)
const document = DOM.window.document

// this doesn't contribute to coverage, but we
// should know if it changes as it would
// cause our app to break
describe('app/index.html', () => {
  it('has element with id "app"', () => {
    const element = document.getElementById('app')
    expect(element.id).toBe('app')
  })
})

describe('app/client.js', () => {
  // Reset counts of mock calls after each test
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('#start', () => {
    it('renders when in development and accepts hot module reloads', () => {
      // this is mocked above, so require gets the mock version
      // so we can see if its functions are called
      const ReactDOM = require('react-dom')

      // mock module.hot
      const module = {
        hot: {
          accept: jest.fn()
        }
      }

      // mock options
      const options = {
        isProduction: false,
        module,
        document
      }

      start(options)
      expect(ReactDOM.render).toBeCalled()
      expect(module.hot.accept).toBeCalled()
    })

    it('hydrates when in production does not accept hot module reloads', () => {
      const ReactDOM = require('react-dom')
      const importedComponent = require('react-imported-component')
      importedComponent.rehydrateMarks.mockImplementation(() =>
        Promise.resolve()
      )

      // mock module.hot
      const module = {}

      // mock rehydrate function
      const hydrate = jest.fn()

      // mock options
      const options = {
        isProduction: true,
        module,
        document,
        hydrate
      }

      start(options)
      expect(ReactDOM.render).not.toBeCalled()
      expect(hydrate).toBeCalled()
    })
  })

  describe('#hydrate', () => {
    it('uses ReactDOM to hydrate given element with an app', () => {
      const ReactDOM = require('react-dom')
      const element = document.getElementById('app')
      const app = <div />
      const doHydrate = hydrate(app, element)

      expect(typeof doHydrate).toBe('function')

      doHydrate()
      expect(ReactDOM.hydrate).toBeCalledWith(app, element)
    })
  })
})
