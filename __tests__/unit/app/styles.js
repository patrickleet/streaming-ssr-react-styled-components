import React from 'react'
import { shallow } from 'enzyme'
import { GlobalStyles } from 'app/styles.js'

describe('app/styles.js', () => {
  it('renders styles page', () => {
    expect(GlobalStyles).toBeDefined()
    const tree = shallow(<GlobalStyles />)
    expect(tree).not.toBeNull()
  })
})
