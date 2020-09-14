/**
 * Main JS for eriklintunen.com.
 * pixel-tree, 2020.
 */

import '../style/main.scss'

import { sequencer } from './Utils'
import { latest } from './Media'

import { Nav } from './Nav'

/* Metadata */

let env = process.env.NODE_ENV

let page = document.createElement('meta')
page.id = 'page'
document.head.appendChild(page)

let sub = document.createElement('meta')
sub.id = 'sub'
document.head.appendChild(sub)

page.content = 'contact' // Default load page

/* Main frame */

const playground = document.createElement('div')
playground.id = 'playground'
document.body.appendChild(playground)

/* Rotational content */

const extLink = document.createElement('a')
extLink.setAttribute('href', latest)
extLink.id = 'extLink'
extLink.innerText = '¯\\_(ツ)_/¯'
playground.appendChild(extLink)

/* Shared elements */

const navigation = new Nav(playground)

const content = document.createElement('div')
content.id = 'content'
playground.appendChild(content)

const footer = document.createElement('div')
footer.id = 'footer'
footer.innerText = '© 2020 Erik Lintunen'
playground.appendChild(footer)

/* Initialise */

if (env !== 'development') {

  // animate()
  sequencer()

} else {

  console.log('Development mode.')

  sequencer()

}
