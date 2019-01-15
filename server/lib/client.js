import fs from 'fs';
import path from 'path';
import cheerio from 'cheerio';

export const htmlPath = path.join(process.cwd(), 'dist', 'client', 'index.html');
export const rawHTML = fs.readFileSync(htmlPath).toString();

export const parseRawHTMLForData = (template, selector = "#js-entrypoint") => {
  const $template = cheerio.load(template);
  let src = $template(selector).attr('src')

  return {
    src
  }
}

const clientData = parseRawHTMLForData(rawHTML)

const appString = '<div id="app"\>'
const splitter = '###SPLIT###'
const [ 
  startingRawHTMLFragment, 
  endingRawHTMLFragment 
] = rawHTML
      .replace(appString, `${appString}${splitter}`)
      .split(splitter)

export const getHTMLFragments = ({ drainHydrateMarks }) => {
  const startingHTMLFragment = `${startingRawHTMLFragment}${drainHydrateMarks}`
  const endingHTMLFragment = endingRawHTMLFragment.replace(`.client.js`, clientData.src)
  return [startingHTMLFragment, endingHTMLFragment]
}
