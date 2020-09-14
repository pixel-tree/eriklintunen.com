/**
 * About page.
 */

import { neuralGIF, bioTXT } from '../Media'

class About {
  constructor(container) {

    // Image.
    const neural = document.createElement('img')
    neural.src = neuralGIF
    neural.id = 'neural'
    content.appendChild(neural)

    // Bio.
    const bio = document.createElement('div')
    bio.id = 'bio'
    content.appendChild(bio)

    const bioText = bioTXT.split('\n')

    for (let i = 0; i < bioText.length; i++) {
      const paragraph = document.createElement('p')
      paragraph.innerText = bioText[i]
      bio.appendChild(paragraph)
    }

  }
}

export { About }
