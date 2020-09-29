/**
 * Main JS for eriklintunen.com.
 * pixel-tree, 2020.
 */

import '../style/main.scss'

import { sequencer } from './Utils'

import { Mobile } from './components/Mobile'
import { Nav } from './components/Nav'

/* Metadata */

let env = process.env.NODE_ENV

let page = document.createElement('meta')
page.id = 'page'
document.head.appendChild(page)

page.content = 'about' // Default load page.

/* Load data */

const text = require('../media/json/text.json')
const visual = require('../media/json/visual.json')

/* Main frame */

const playground = document.createElement('div')
playground.id = 'playground'
document.body.appendChild(playground)

/* Rotational content */

const extLink = document.createElement('a')
extLink.setAttribute('href', text.latest)
extLink.setAttribute('target', '_blank')
extLink.setAttribute('rel', 'noopener')
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

const mobile = new Mobile(playground)

/* Initialise page */

if (env !== 'development') {

  // TO DO: troubleshoot file loading for dev-server.

  require('../media/visual/neural.gif')

  require('../media/visual/xd.jpg')
  require('../media/visual/xd_inv.jpg')
  require('../media/visual/resume.jpg')
  require('../media/visual/resume_inv.jpg')

  // animate()
  sequencer()

} else {

  console.log('Development mode.')

  sequencer()

}

export { text, visual }
