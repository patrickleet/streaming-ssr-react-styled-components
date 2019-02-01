import React from 'react'
import { shallow } from 'enzyme'
import Loading from 'app/pages/Loading.jsx'

describe('app/pages/Loading.jsx', () => {
  it('renders Loading page', () => {
    expect(Loading).toBeDefined()
    const tree = shallow(<Loading />)
    expect(tree.find('Page')).toBeDefined()
    expect(tree.text()).toEqual('Loading...')
  })
})
