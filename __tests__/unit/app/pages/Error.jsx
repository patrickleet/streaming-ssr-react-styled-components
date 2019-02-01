import React from 'react'
import { shallow } from 'enzyme'
import Error from 'app/pages/Error.jsx'

describe('app/pages/Error.jsx', () => {
  it('renders Error page', () => {
    expect(Error).toBeDefined()
    const tree = shallow(<Error />)
    expect(tree.find('Page')).toBeDefined()
    expect(tree.text()).toEqual('Error!')
  })
})
