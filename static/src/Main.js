/**
 * Main JS for eriklintunen.com;
 * pixel-tree, 2020.
 */

import '../style/main.scss'

import { Animations } from './Animate.js'
import { Navigation } from './Nav.js'

/**
 * Essential metadata.
 */

var env = process.env.NODE_ENV

var meta = document.createElement('meta')
meta.id = 'meta'
document.head.appendChild(meta)

/**
 * Initialise page (dev section at bottom of page).
 */

const playground = document.createElement('div')
playground.id = 'playground'
document.body.appendChild(playground)

const navigation = new Navigation(playground)

const animations = new Animations(playground)

const content = document.createElement('div')
content.id = 'content'
playground.appendChild(content)

if (env !== 'development') {
  sequencer()
}

/**
 * Utilities.
 */

// Clear element.
function clear(elementID) {
  document.getElementById(elementID).innerHTML = ''
}

// Sequencer (to determine content).
function sequencer() {

  // About.
  if (meta.content === 'about') {
    clear('content')
    const about = new About(playground)
  }

  // Works.
  else if (meta.content === 'works') {
    clear('content')
    const works = new Works(playground)
  }

  // Blog.
  else if (meta.content === 'blog') {
    clear('content')
    const blog = new Blog(playground)
  }

  // Contact.
  else if (meta.content === 'contact') {
    clear('content')
    const contact = new Contact(playground)
  }

}

/**
 * Dev section.
 */

if (env !== 'production') {
  console.log('Development mode!')

  // Module under development:
  // new Module(container)

 }

/* --------- */

export { clear, sequencer }
