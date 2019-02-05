import React from 'react'
import { shallow } from 'enzyme'
import Header from 'app/components/Header.jsx'

describe('app/components/Header.jsx', () => {
  it('renders Header component', () => {
    expect(Header).toBeDefined()
    const tree = shallow(<Header />)
    expect(tree.find('Page')).toBeDefined()
    expect(tree.text()).toContain('Stream things!')
  })
})
