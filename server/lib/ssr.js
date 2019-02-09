import React from 'react'
import { renderToNodeStream } from 'react-dom/server'
import { HelmetProvider } from 'react-helmet-async'
import { StaticRouter } from 'react-router-dom'
import { ServerStyleSheet } from 'styled-components'
import { printDrainHydrateMarks } from 'react-imported-component'
import log from 'llog'
import through from 'through'
import App from '../../app/App'
import { getHTMLFragments } from './client'
// import { getDataFromTree } from 'react-apollo';

const getApplicationStream = (originalUrl, context) => {
  const helmetContext = {}
  const app = (
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={originalUrl} context={context}>
        <App />
      </StaticRouter>
    </HelmetProvider>
  )

  const sheet = new ServerStyleSheet()
  return sheet.interleaveWithNodeStream(
    renderToNodeStream(sheet.collectStyles(app))
  )
}

export function write (data) {
  this.queue(data)
}

export const end = endingHTMLFragment =>
  function end () {
    this.queue(endingHTMLFragment)
    this.queue(null)
  }

export const ssr = getApplicationStream => (req, res) => {
  try {
    // If you were using Apollo, you could fetch data with this
    // await getDataFromTree(app);

    const context = {}
    const stream = getApplicationStream(req.originalUrl, context)

    if (context.url) {
      return res.redirect(301, context.url)
    }

    const [startingHTMLFragment, endingHTMLFragment] = getHTMLFragments({
      drainHydrateMarks: printDrainHydrateMarks()
    })

    res.status(200)
    res.write(startingHTMLFragment)
    stream.pipe(through(write, end(endingHTMLFragment))).pipe(res)
  } catch (e) {
    log.error(e)
    res.status(500)
    res.end()
  }
}

const defaultSSR = ssr(getApplicationStream)

export default defaultSSR
