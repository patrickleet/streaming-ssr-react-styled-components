import React from 'react'
import { shallow } from 'enzyme'
import Page from 'app/components/Page.jsx'

describe('app/components/Page.jsx', () => {
  it('renders Page component', () => {
    expect(Page).toBeDefined()
    const tree = shallow(<Page />)
    expect(tree).toBeDefined()
  })
})
