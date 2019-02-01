import React from 'react'
import { shallow } from 'enzyme'
import About from 'app/pages/About.jsx'

describe('app/pages/About.jsx', () => {
  it('renders About page', () => {
    expect(About).toBeDefined()
    const tree = shallow(<About />)
    expect(tree.find('Page')).toBeDefined()
    expect(
      tree
        .find('Helmet')
        .find('title')
        .text()
    ).toEqual('About Page')
    expect(tree.find('div').text()).toEqual('This is the about page')
  })
})
