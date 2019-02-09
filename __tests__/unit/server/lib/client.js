import { getHTMLFragments } from 'server/lib/client.js'

describe('client', () => {
  it('exists', () => {
    const drainHydrateMarks = '<!-- mock hydrate marks -->'
    const [start, end] = getHTMLFragments({ drainHydrateMarks })
    expect(start).toContain('<head>')
    expect(start).toContain(drainHydrateMarks)
    expect(end).toContain('script id="js-entrypoint"')
  })
})
