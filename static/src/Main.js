/**
 * Main JS;
 * eriklintunen.com;
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
 * Initialise page.
 */

const playground = document.createElement('div')
playground.id = 'playground'
document.body.appendChild(playground)

const loader = document.createElement('div')
loader.id = 'loader'
playground.appendChild(loader)

const navigation = new Navigation(playground)

const content = document.createElement('div')
content.id = 'content'
playground.appendChild(content)

if (env !== 'development') {

  sequencer()

  /**
   * Animations.
   * (Automatically loaded in dev mode.)
   */

  var $ = require('jquery')
  var URL = './build/animate.bundle.js'

  $.ajax({
    type: 'GET',
    dataType: 'script',
    url: URL,
    cache: false,
    xhr: function() {

      var xhr = new window.XMLHttpRequest()

      xhr.addEventListener('progress', function(event) {
        if (event.lengthComputable) {
          var perc = Math.round(event.loaded / event.total * 100)
          loader.innerText = 'loading... ' + perc + '%'
        }
      }, false)

      return xhr

    },
    success: function() {
      $('#loader').text('initialising...')
    },
    error: function() {
      $('#loader').text('loading animations failed.')
    },
    complete: function() {
      $('#loader').text('')
      $('#loader').hide()
    }
  })

} else {

  /**
   * Dev mode.
   * (Sequencer disabled.)
   */

  console.log('Development mode.')

  // Module under development:
  // new Module(container)

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

export { clear, sequencer }
