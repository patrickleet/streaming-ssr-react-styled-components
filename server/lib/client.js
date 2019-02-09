import fs from 'fs'
import path from 'path'

const htmlPath = path.join(process.cwd(), 'dist', 'client', 'index.html')
const rawHTML = fs.readFileSync(htmlPath).toString()

const appString = '<div id="app">'
const splitter = '###SPLIT###'
const [startingRawHTMLFragment, endingRawHTMLFragment] = rawHTML
  .replace(appString, `${appString}${splitter}`)
  .split(splitter)

export const getHTMLFragments = ({ drainHydrateMarks }) => {
  const startingHTMLFragment = `${startingRawHTMLFragment}${drainHydrateMarks}`
  return [startingHTMLFragment, endingRawHTMLFragment]
}
