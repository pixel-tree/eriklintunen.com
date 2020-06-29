/**
 * Animations.
 */

// TO DO: clean up animation functions (especially P5).
// TO DO: reduce animation sizes.

class Animations {

  constructor(container) {

    // Imports.
    const p5 = require('p5')
    var $ = require('jquery')

    // Animations.
    new Butterfly()
    new Cursor()

    /**
     * Functions.
     */

    function Butterfly() {
      const sketch = (s) => {

        var particles = []

        s.setup = () => {
          s.noCursor()
          let canvas = s.createCanvas(900, 225)
          canvas.id('butterfly')

        }

        s.mouseMoved = () => {
          particles.push(new Particle(s.mouseX, s.mouseY))
        }

        s.draw = () => {
          s.clear()
          for (var i = 0; i < particles.length; i++) {
            particles[i].update()
            particles[i].show()
          }
        }

        function Particle(x, y) {

          var size = 5 // size
          var alpha = 255 // alpha
          var dp = 8 // particle drop
          var h = 20 // particle buffer

          this.x = x
          this.y = y

          this.history = []

          this.update = function() {
            this.x += s.random(-10, 10)
            this.y += s.random(-10, 10)

            for (var i = 0; i < this.history.length; i++) {
              this.history[i].x += s.random(-size, size)
              this.history[i].y += s.random(-size, size)
            }

            var v = s.createVector(this.x, this.y)
            this.history.push(v)
            if (this.history.length > h) {
              this.history.splice(0, dp)
            }
          }

          this.show = function() {
            s.noStroke()
            s.ellipse(this.x, this.y, 2, 2)
            s.noFill()

            s.beginShape()
            for (var i = 0; i < this.history.length; i++) {
              var pos = this.history[i]

              s.fill(s.random(pos.x), s.random(50, 100), s.random(pos.y), alpha)

              s.vertex(pos.x, pos.y)

            }
            s.endShape()
          }

        }

      }

      new p5(sketch, 'ol')
    }

    function Cursor() {

      const cursor = document.createElement('div')
      cursor.id = 'cursor'
      playground.appendChild(cursor)

      $('#playground').on('mousemove', (event) => {
        $('#cursor').css({
          left: event.clientX,
          top: event.clientY
        })
      })

        const p5 = require('p5')

        const sketch = (s) => {

          var layers = []
          var evolution, palette

          s.setup = () => {

            s.createCanvas(300, 300)
            s.background(255)

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
                  0.1 + i / 1.2,
                  s.width / 2, s.height / 2,
                  i * 1,
                  i * s.random(90),
                  palette[s.floor(s.random(8))]
                )
              )
            }

          }

          s.draw = () => {

            s.background(255)

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

      new p5(sketch, 'cursor')
    }
  }

}


export { Animations }
