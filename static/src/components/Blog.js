/**
 * Blog page.
 */

import { text, visual } from '../Main'
import { sequencer } from '../Utils'

class Blog {
  constructor(container) {

    for (let i = 0; i < text.blog.length; i++) {

      const title = document.createElement('div')
      title.classList.add('title')
      title.innerText = text.blog[i].date + ': ' + text.blog[i].title
      content.appendChild(title)

      const body = document.createElement('div')
      body.classList.add('body')
      content.appendChild(body)

      for (let j = 0; j < text.blog[i].body.length; j++) {
        const paragraph = document.createElement('p')
        paragraph.innerText = text.blog[i].body[j]
        body.appendChild(paragraph)
      }

    }


  }
}

export { Blog }
