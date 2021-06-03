/**
 * eriklintunen.com
 * pixel-tree, 2021
 */

import '../styles.scss'

import { Media } from './Dev'
import { Init, Bg, Socials, Footer, Nav, sequencer } from './Utils'

/* Metadata */

let env = process.env.NODE_ENV

let page = document.createElement('meta')
page.id = 'page'
document.head.appendChild(page)

page.content = 'portfolio'  // Default load page.

/* Load data */

const data = require('../media/data.json')

const math = document.createElement('script')
math.type = 'text/javascript'
math.id = 'MathJax-script'
math.async = true
math.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js'
document.head.appendChild(math)

/* Main frames */

const playground = document.createElement('div')
playground.id = 'playground'
playground.style.display = 'none'
document.body.appendChild(playground)

const scrollbox = document.createElement('div')
scrollbox.id = 'scrollbox'
playground.appendChild(scrollbox)

/* Shared elements */

const bg = new Bg(playground)
const socials = new Socials(playground)
const navigation = new Nav(playground)
const footer = new Footer(playground)

/* Main content */

const content = document.createElement('div')
content.id = 'content'
scrollbox.appendChild(content)

/* Initialise */

if (env === 'development') {

  console.log('Development mode.')

  // To do: troubleshoot file loading for dev server.
  const loader = new Media()

  // Skip init and load default page.
  const $ = require('jquery')
  $('#playground').show()
  sequencer()

} else {

  // Load production-specific init page.
  const init = new Init(document.body)

}

export { data }
