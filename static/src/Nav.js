/**
 * Navigation bar for eriklintunen.com;
 * pixel-tree, 2020.
 */

// TO DO: four big boxes
// => on hover press down with shadow + shade of gray (/low sat colour).

import { clear, sequencer } from './Main.js'

class Navigation {
  constructor(container) {

    var $ = require('jquery')

    // Container.
    this._element = document.createElement('nav')
    this._element.id = 'nav'
    container.appendChild(this._element)

    // Array to store menu items.
    const items = [
      'about',
      'works',
      'blog',
      'contact'
    ]

    /**
     * Menu elements.
     */

    const ol = document.createElement('ol')
    this._element.appendChild(ol)

    for (var i = 0; i < items.length; i++) {

      // Menu item.
      const li = document.createElement('li')
      ol.appendChild(li)

      // Buttons.
      var button = document.createElement('button')
      button.id = i
      button.innerText = items[i]
      li.appendChild(button)

      // Display selected content.
      document.getElementById(i).onclick = function() {
        if (document.getElementById('meta').content !== this.innerHTML) {
          document.getElementById('meta').content = this.innerHTML
          clear('content')
          sequencer()
        }
      }
    }

    /**
     * Menu animation.
     */

    const navSketch = document.createElement('div')
    navSketch.id = 'navSketch'
    this._element.appendChild(navSketch)

    // TO DO: prevent spill parent div.
    // TO DO: menu items over #navSketch div.

    $('#nav').on('mousemove', (event) => {
      $('#navSketch').css({
        left: event.clientX
        /* top: event.clientY */
      })
    })

    const p5 = require('p5')

    const sketch = (s) => {

      var layers = []
      var evolution, palette

      s.setup = () => {

        s.createCanvas(300, 300)
        s.background(0, 255)

        evolution = 0
        palette = [
          s.color(146, 167, 202, 30),
          s.color(186, 196, 219, 30),
          s.color(118, 135, 172, 30),
          s.color(76, 41, 81, 30),
          s.color(144, 62, 92, 30),
          s.color(178, 93, 119, 30),
          s.color(215, 118, 136, 30),
          s.color(246, 156, 164, 30)
        ]

        for (var i = 0; i < 110; i++) {
          layers.push(
            new Layer(
              0.1 + i,
              s.width / 2, s.height / 2,
              i * 1,
              i * s.random(90),
              palette[s.floor(s.random(8))]
            )
          )
        }

      }

      s.draw = () => {

        s.background(0)

        for (var i = 0; i < layers.length; i++) {
          layers[i].show(evolution)
        }

        evolution += 0.01

      }

      function Layer(radius, x_POS, y_POS, distortion, rotation, colour) {

        this.radius = radius
        this.x_POS = x_POS
        this.y_POS = y_POS
        this.distortion = distortion
        this.rotation = rotation
        this.colour = colour

        this.show = function(evolution) {

          s.noStroke()
          s.fill(this.colour)
          s.push()
          /* s.translate(s.mouseX, y_POS) */
          s.translate(x_POS, y_POS)
          s.rotate(this.rotation + evolution)
          s.beginShape()

          var off = 0

          for (var i = 0; i < s.TWO_PI; i += 0.1) {
            var offset = s.map(
              s.noise(off, evolution), 0, 1, - this.distortion, this.distortion
            )
            var r = this.radius + offset
            var x = r * s.cos(i)
            var y = r * s.sin(i)
            s.vertex(x, y)
            off += 0.1
          }

          s.endShape()
          s.pop()

        }

      }

    }

    new p5(sketch, 'navSketch')

  }
}

export { Navigation }
