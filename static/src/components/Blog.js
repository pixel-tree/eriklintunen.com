/**
 * Blog page.
 */

import { text, visual } from '../Main'
import { sequencer } from '../Utils'

class Blog {
  constructor(container) {

    // TO DO: Devise system to algorithmically generate content
    // but need to include a way to load and order links, embeds, media...
    // Currently missing (decide whether to archive or include in live build):
    // 140520: The expressive power of the (digital) line
    // 270420: A case for postdramatic theatre

    // Generate content but skip first object (template).
    for (let i = 1; i < text.blog.length; i++) {

      const title = document.createElement('div')
      title.classList.add('blogTitle')
      title.innerText = text.blog[i].date + ': ' + text.blog[i].title
      content.appendChild(title)

      const body = document.createElement('div')
      body.classList.add('blogBody')
      content.appendChild(body)

      for (let j = 0; j < text.blog[i].body.length; j++) {
        const paragraph = document.createElement('p')
        paragraph.innerHTML = text.blog[i].body[j]
        body.appendChild(paragraph)
      }

    }


  }
}

export { Blog }
