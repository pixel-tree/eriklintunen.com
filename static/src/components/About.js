/**
 * About page.
 */

import { text, visual } from '../Main'

class About {
  constructor(container) {

    // Main frame.
    const content = document.getElementById('content')

    // Bio.
    const bio = document.createElement('div')
    bio.id = 'bio'
    content.appendChild(bio)

    for (let i = 0; i < text.bio.length; i++) {
      const paragraph = document.createElement('p')
      paragraph.innerText = text.bio[i]
      bio.appendChild(paragraph)
    }

  }
}

export { About }
