/**
 * Navigation for eriklintunen.com.
 */

import { clear, sequencer } from './Main.js'

class Navigation {
  constructor(container) {

    // Container.
    this._element = document.createElement('nav')
    this._element.id = 'nav'
    playground.appendChild(this._element)

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
    ol.id = 'ol'
    this._element.appendChild(ol)

    for (var i = 0; i < items.length; i++) {

      // Menu item.
      const li = document.createElement('li')
      li.id = i
      li.innerText = items[i]
      ol.appendChild(li)

      // Display selected content.
      document.getElementById(i).onclick = function() {
        if (document.getElementById('meta').content !== this.innerHTML) {
          document.getElementById('meta').content = this.innerHTML
          clear('content')
          sequencer()
        }
      }

    }

  }
}

export { Navigation }
