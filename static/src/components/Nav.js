/**
 * Navigation.
 */

import { sequencer } from '../Utils'

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

      if (document.getElementById('page').content === li.innerHTML) {
        li.classList.add('liActive')
      }

      li.onclick = function() {

        for (let j = 0; j < ol.children.length; j++) {
          ol.children[j].classList.remove('liActive')
        }
        li.classList.add('liActive')

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
