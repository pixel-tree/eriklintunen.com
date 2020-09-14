/**
 * Navigation.
 */

import { clear, sequencer } from './Utils'

class Nav {
  constructor(container) {

    // Frame.
    this._element = document.createElement('nav')
    this._element.id = 'nav'
    playground.appendChild(this._element)

    // Menu items.
    const items = [
      'about',
      'works',
      'blog',
      'contact'
    ]

    /* Elements */

    const ol = document.createElement('ol')
    ol.id = 'ol'
    this._element.appendChild(ol)

    for (let i = 0; i < items.length; i++) {

      const li = document.createElement('li')
      li.innerText = items[i]

      li.onclick = function() {
        if (document.getElementById('page').content !== this.innerHTML) {
          document.getElementById('page').content = this.innerHTML
          sequencer()
        }
      }

      ol.appendChild(li)

    }

  }
}

export { Nav }
