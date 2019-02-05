import React from 'react'
import { shallow } from 'enzyme'
import App, { renderAboutPage } from 'app/App.jsx'

describe('app/App.jsx', () => {
  it('renders App', () => {
    expect(App).toBeDefined()
    const tree = shallow(<App />)
    expect(tree).not.toBeNull()
  })

  it('#renderAboutPage', () => {
    const tree = shallow(renderAboutPage())
    expect(tree).not.toBeNull()
  })
})
