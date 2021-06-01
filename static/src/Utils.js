/**
 * Utilities for portfolio.
 */

import { Portfolio } from './components/Portfolio'
import { Blog } from './components/Blog'
import { Contact } from './components/Contact'

import { data } from './Main'

/* Init */

class Init {
  constructor(container) {

    // Imports.
    const $ = require('jquery')

    // Frame.
    const init = document.createElement('div')
    init.id = 'init'
    document.body.appendChild(init)

    const cursor = document.createElement('p')
    init.appendChild(cursor)

    let i = 0
    typeWriter('init')

    function typeWriter(id) {

      let speed = Math.random() * (60 - 30) + 30,
          cursorElement = $('#' + id),
          string = data.init,
          typeText = cursorElement.children('p')

      typeText.addClass('initcursor')

      if (i < string.length) {
        typeText.text(typeText.text() + string.charAt(i))
        i++
        setTimeout(function() { typeWriter(id) }, speed)
      } else if (i == string.length) {
        setTimeout(function() {
          typeText.text('\n')
      }, 500)
        setTimeout(function() {
          $('#init').remove()
          sequencer()
          $('#playground').fadeIn(1500)
        }, 1200)
      }

    }

  }
}

/* Background */

class Bg {
  constructor(container) {

    // Main frame.
    const playground = document.getElementById('playground')

    // REGL frame.
    const reglFrame = document.createElement('div')
    reglFrame.id = 'bg'
    playground.insertBefore(reglFrame, document.getElementById('scrollbox'))

    // Particle parameters.
    let FREQ_X = 1
    let FREQ_Y = 1
    let NUM_POINTS = 3e3

    particles()

    function particles() {

      // Imports.
      const regl = require('regl')(reglFrame)
      const mat4 = require('gl-mat4')
      const hsv2rgb = require('hsv2rgb')

      const VERT_SIZE = 4 * (4 + 4 + 3)

      const pointBuffer = regl.buffer(Array(NUM_POINTS).fill().map(function () {
        const color = hsv2rgb(Math.random() * 360, 0.3, 0.9)
        return [
          // freq
          Math.random() * FREQ_X,
          Math.random() * FREQ_Y,
          Math.random() * 10,
          Math.random() * 10,
          // phase
          2.0 * Math.PI * Math.random(),
          2.0 * Math.PI * Math.random(),
          2.0 * Math.PI * Math.random(),
          2.0 * Math.PI * Math.random(),
          // color
          color[0] / 0, color[1] / 0, color[2] / 0
        ]
      }))

      const drawParticles = regl({
        vert: `
        precision mediump float;
        attribute vec4 freq, phase;
        attribute vec3 color;
        uniform float time;
        uniform mat4 view, projection;
        varying vec3 fragColor;
        void main() {
          vec3 position = 8.0 * cos(freq.xyz * time + phase.xyz);
          gl_PointSize = 3.0 * (1.0 + cos(freq.w * time + phase.w));
          gl_Position = projection * view * vec4(position, 1);
          fragColor = color;
        }`,

        frag: `
        precision lowp float;
        varying vec3 fragColor;
        void main() {
          if (length(gl_PointCoord.xy - 0.5) > 0.5) {
            discard;
          }
          gl_FragColor = vec4(fragColor, 1);
        }`,

        attributes: {
          freq: {
            buffer: pointBuffer,
            stride: VERT_SIZE,
            offset: 0
          },
          phase: {
            buffer: pointBuffer,
            stride: VERT_SIZE,
            offset: 16
          },
          color: {
            buffer: pointBuffer,
            stride: VERT_SIZE,
            offset: 32
          }
        },

        uniforms: {
          view: ({tick}) => {
            return mat4.lookAt([],
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0])
          },
          projection: () =>
            mat4.perspective([],
              Math.PI / 3,
              window.innerWidth / window.innerHeight,
              0.01,
              1000),
          time: ({tick}) => tick * 0.0003
        },

        count: NUM_POINTS,

        primitive: 'points'
      })

      regl.frame(() => {
        regl.clear({
          depth: 1,
          color: [0, 0, 0, 0]
        })

        drawParticles()

      })
    }

  }
}

/* Links to socials */

class Socials {
  constructor(container) {

    // Main frame.
    const playground = document.getElementById('playground')

    // Frame for links.
    const socials = document.createElement('div')
    socials.id = 'socials'

    // CV button.
    const cv = document.createElement('button')
    cv.id = 'cv'
    cv.setAttribute('class', 'social')
    cv.innerText = 'CV'
    socials.appendChild(cv)

    // Generate socials.
    for (let i = 0; i < data.socials.length; i++) {
      let social = document.createElement('a')
      social.setAttribute('class', 'social')
      social.setAttribute('href', Object.values(data.socials[i]))
      social.setAttribute('target', '_blank')
      social.setAttribute('rel', 'noopener')
      social.innerText = Object.keys(data.socials[i])
      socials.appendChild(social)
    }
    playground.appendChild(socials)

    // CV overlay.

    const $ = require('jquery')

    const overlay = document.createElement('div')
    overlay.id = 'overlay'
    playground.appendChild(overlay)

    const vibing = document.createElement('img')
    vibing.id = 'vibing'
    vibing.src = data.cv
    overlay.appendChild(vibing)

    $('#cv').click(function() {
      if ($('#playground').hasClass('light')) {
        $('#overlay').css('filter', 'invert(100%)')
      }
      $('#overlay').show()
    })

    $('#overlay').click(function() {
      $('#overlay').hide()
      $('#overlay').css('filter', '')
    })

  }
}

/* Footer */

class Footer {
  constructor(container) {

    // Main frame.
    const playground = document.getElementById('playground')

    const footer = document.createElement('a')
    footer.setAttribute('href', 'https://github.com/pixel-tree/licenses/blob/main/MIT-2020')
    footer.setAttribute('target', '_blank')
    footer.setAttribute('rel', 'noopener')
    footer.id = 'footer'
    footer.innerText = data.footer
    playground.appendChild(footer)

  }
}

/* Navigation */

class Nav {
  constructor(container) {

    // Main frame.
    const playground = document.getElementById('playground')

    // Frame.
    this._element = document.createElement('nav')
    this._element.id = 'nav'
    playground.appendChild(this._element)

    // Menu items.
    const items = [
      'portfolio',
      'blog',
      'contact'
    ]

    const ol = document.createElement('ol')
    ol.id = 'ol'
    this._element.appendChild(ol)

    for (let i = 0; i < items.length; i++) {

      // Individual items.
      const li = document.createElement('li')
      li.innerText = items[i]

      // Style menu item for default load page.
      if (document.getElementById('page').content === li.innerHTML) {
        li.classList.add('liActive')
      }

      // On item click.
      li.onclick = function() {

        // Style only active menu link.
        for (let j = 0; j < ol.children.length; j++) {
          ol.children[j].classList.remove('liActive')
        }
        li.classList.add('liActive')

        // Sequencer.
        if (document.getElementById('page').content !== this.innerHTML) {
          document.getElementById('page').content = this.innerHTML
          sequencer()
        }
      }

      ol.appendChild(li)
    }

  }
}

/* Media loader for dev server */

class Media {
  constructor() {
    // CV.
    require('../media/files/vibing.png')
    // Portfolio.
    require('../media/files/cl.png')
    require('../media/files/pythia.gif')
    require('../media/files/representations.png')
    require('../media/files/neuroimagining.png')
    require('../media/files/dreamscape.png')
    require('../media/files/fanfare.png')
    require('../media/files/mios.png')
    require('../media/files/mios360.png')
    require('../media/files/iklectik.png')
    require('../media/files/OII.gif')
    require('../media/files/bacteriaRNG.gif')
    require('../media/files/migra.png')
    require('../media/files/probability.gif')
    require('../media/files/eeg.png')
    require('../media/files/secret.png')
    require('../media/files/barbican.png')
    require('../media/files/ableton.png')
    require('../media/files/openlab.png')
    require('../media/files/bm.gif')
    require('../media/files/radio.png')
    require('../media/files/pixeltears.png')
    require('../media/files/garage.png')
    require('../media/files/spill.png')
    require('../media/files/tate.png')
    require('../media/files/gasworks.png')
    require('../media/files/workshop.png')
    require('../media/files/lakes.png')
    // Blog.
    require('../media/files/bed.png')
    require('../media/files/wow.png')
    require('../media/files/fomo.png')
    require('../media/files/bacteria.jpg')
    require('../media/files/loveable.jpg')
    require('../media/files/gpu.jpg')
    require('../media/files/superia400-1.png')
    require('../media/files/natura1600-1.png')
    require('../media/files/delta3200-1.png')
    require('../media/files/implosion100-1.png')
    require('../media/files/implosion100-2.png')
    require('../media/files/portra800-1.png')
    require('../media/files/portra800-2.png')
    require('../media/files/portra800-3.png')
    require('../media/files/various-1.png')
    require('../media/files/various-2.png')
    require('../media/files/various-3.png')
    require('../media/files/various-4.png')
    require('../media/files/various-5.png')
    require('../media/files/various-6.png')
    require('../media/files/various-7.png')
    require('../media/files/various-8.png')
    require('../media/files/various-9.png')
    require('../media/files/various-10.png')
  }
}

/*
 * Utility functions.
 */

/* Clear element */

function clear(elementID) { document.getElementById(elementID).innerHTML = '' }

/* Sequencer */

function sequencer() {

  const $ = require('jquery')

  clear('content')

  let scrollingElement = (document.scrollingElement || document.body)
  scrollingElement.scrollTop = scrollingElement.scrollHeight

  // Portfolio.
  if (page.content === 'portfolio') {
    new Portfolio(playground)
    $('#playground').removeClass('light').addClass('dark').hide().fadeIn(300)
  }

  // Blog.
  else if (page.content === 'blog') {
    new Blog(playground)
    $('#playground').removeClass('dark').addClass('light').hide().fadeIn(300)
  }

  // Contact.
  else if (page.content === 'contact') {
    new Contact(playground)
    $('#playground').removeClass('light').addClass('dark').hide().fadeIn(300)
  }

}

export { Init, Bg, Socials, Footer, Nav, Media, sequencer }
