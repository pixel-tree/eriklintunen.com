/**
 * Main JS for eriklintunen.com;
 * pixel-tree, 2020.
 */

import '../style/main.scss'

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

// Main container.
const container = document.createElement('div')
container.id = 'container'
document.body.appendChild(container)

// Navigation.
const navigation = new Navigation(container)

if (env !== 'development') {
  sequencer()
}

/**
 * Navigation.
 */



/**
 * Utilities.
 */

// Clear element.
function clear(elementID) {
  document.getElementById(elementID).innerHTML = ''
}

// Sequencer (to determine what content to load).
function sequencer() {

  // About.
  if (meta.content === 'about') {
    clear('content')
    const about = new About(container)
  }

  // Works.
  else if (meta.content === 'works') {
    clear('content')
    const works = new Works(container)
  }

  // Blog.
  else if (meta.content === 'blog') {
    clear('content')
    const blog = new Blog(container)
  }

  // Contact.
  else if (meta.content === 'contact') {
    clear('content')
    const contact = new Contact(container)
  }

}

/**
 * Dev section.
 */

if (env !== 'production') {
  console.log('Development mode!')

  // Module under development:
  // new About(container)

 }

/* --------- */

export { clear, sequencer }
