/**
 * eriklintunen.com
 * pixel-tree, 2021
 */

import '../styles.scss'

import { Init, Bg, Socials, Footer, Nav, Media, sequencer } from './Utils'

/* Metadata */

let env = process.env.NODE_ENV

let page = document.createElement('meta')
page.id = 'page'
document.head.appendChild(page)

page.content = 'portfolio'  // Default load page

/* Load data */

const data = require('../media/data.json')

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

  // to do: troubleshoot file loading for dev server.
  const loader = new Media()

  const $ = require('jquery')
  $('#playground').show()
  sequencer()

} else { const init = new Init(document.body) }

export { data }
