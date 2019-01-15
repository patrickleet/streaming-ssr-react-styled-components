import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
/* Base 10 typography scale courtesty of @wesbos 1.6rem === 16px */
html {
  font-size: 10px;
}

body {
  font-size: 1.6rem;
}

/* Relative Type Scale */
/* https://blog.envylabs.com/responsive-typographic-scales-in-css-b9f60431d1c4 */
:root {
  --step-up-5: 2em;
  --step-up-4: 1.7511em;
  --step-up-3: 1.5157em;
  --step-up-2: 1.3195em;
  --step-up-1: 1.1487em;
  /* baseline: 1em */
  --step-down-1: 0.8706em;
  --step-down-2: 0.7579em;
  --step-down-3: 0.6599em;
  --step-down-4: 0.5745em;
  --step-down-5: 0.5em;
  /* Colors */
  --header: rgb(0,0,0);
}

/* https://css-tricks.com/snippets/css/system-font-stack/ */
/* Define the "system" font family */
/* Fastest loading font - the one native to their device */
@font-face {
  font-family: system;
  font-style: normal;
  font-weight: 300;
  src: local(".SFNSText-Light"), local(".HelveticaNeueDeskInterface-Light"), local(".LucidaGrandeUI"), local("Ubuntu Light"), local("Segoe UI Light"), local("Roboto-Light"), local("DroidSans"), local("Tahoma");
}

/* Modern CSS Reset */
/* https://alligator.io/css/minimal-css-reset/ */
body, h1, h2, h3, h4, h5, h6, p, ol, ul, input[type=text], input[type=email], button {
  margin: 0;
  padding: 0;
  font-weight: normal;
}

body, h1, h2, h3, h4, h5, h6, p, ol, ul, input[type=text], input[type=email], button {
  font-family: "system"
}

*, *:before, *:after {
  box-sizing: inherit;
}

ol, ul {
  list-style: none;
}

img {
  max-width: 100%;
  height: auto;
}

/* Links */
a {
  text-decoration: underline;
  color: inherit;

  &.active {
    text-decoration: none;
  }
}

`
