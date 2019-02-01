import React from 'react'
import { shallow } from 'enzyme'
import Home from 'app/pages/Home.jsx'

describe('app/pages/Home.jsx', () => {
  it('renders Home page', () => {
    expect(Home).toBeDefined()
    const tree = shallow(<Home />)
    expect(tree.find('Page')).toBeDefined()
    expect(
      tree
        .find('Helmet')
        .find('title')
        .text()
    ).toEqual('Home Page')
    expect(tree.find('div').text()).toEqual('Follow me at @patrickleet')
    expect(
      tree
        .find('div')
        .find('a')
        .text()
    ).toEqual('@patrickleet')
  })
})
