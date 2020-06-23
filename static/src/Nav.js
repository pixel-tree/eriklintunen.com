/**
 * Navigation bar for eriklintunen.com;
 * pixel-tree, 2020.
 */

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

    }

    document.getElementById('0').onclick = function() {
      if (document.getElementById('meta').content !== this.innerHTML) {
        document.getElementById('meta').content = this.innerHTML
        clear('content')
        sequencer()
      }
    }

    document.getElementById('1').onclick = function() {
      if (document.getElementById('meta').content !== this.innerHTML) {
        document.getElementById('meta').content = this.innerHTML
        clear('content')
        sequencer()
      }
    }

    document.getElementById('2').onclick = function() {
      if (document.getElementById('meta').content !== this.innerHTML) {
        document.getElementById('meta').content = this.innerHTML
        clear('content')
        sequencer()
      }
    }

    document.getElementById('3').onclick = function() {
      if (document.getElementById('meta').content !== this.innerHTML) {
        document.getElementById('meta').content = this.innerHTML
        clear('content')
        sequencer()
      }
    }



  }
}

export { Navigation }
