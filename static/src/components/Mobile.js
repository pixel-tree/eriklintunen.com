/**
 * Mobile.
 */

import { text } from '../Main'

class Mobile {
  constructor(container) {

    // Minimal nav.
    const olMin = document.createElement('ol')
    olMin.id = 'olMin'
    nav.appendChild(olMin)

    const liMin = document.createElement('li')
    liMin.innerHTML = '<a href="mailto:' + text.contact.mail + '">contact</a>'
    olMin.appendChild(liMin)

    // Bio.
    const contentMin = document.createElement('div')
    contentMin.id = 'contentMin'
    playground.appendChild(contentMin)

    for (let i = 0; i < text.bio.length; i++) {
      const paragraph = document.createElement('p')
      paragraph.innerText = text.bio[i]
      contentMin.appendChild(paragraph)
    }

  }
}

export { Mobile }
