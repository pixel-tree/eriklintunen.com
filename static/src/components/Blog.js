/**
 * Blog page.
 */

import { text, visual } from '../Main'
import { sequencer } from '../Utils'

class Blog {
  constructor(container) {

    // Main frame.
    const content = document.getElementById('content')

    // Generate content but skip first object (template).
    for (let i = 1; i < text.blog.length; i++) {

      // Entry header (date: title).
      const title = document.createElement('div')
      title.classList.add('blogTitle')
      title.innerText = text.blog[i].date + ': ' + text.blog[i].title
      content.appendChild(title)

      // Main body.
      const body = document.createElement('div')
      body.classList.add('blogBody')
      content.appendChild(body)

      // Generate individual paragraphs.
      for (let j = 0; j < text.blog[i].body.length; j++) {

        // Text.
        const paragraph = document.createElement('p')
        paragraph.innerHTML = text.blog[i].body[j]
        body.appendChild(paragraph)

        // If links included.
        if (text.blog[i].links.length > 0) {
          // Replace markers ([1], [2], ...) for links and descriptions.
          for (let k = 0; k < text.blog[i].links.length; k++) {
            const link = Object.values(text.blog[i].links[k])
            const description = Object.keys(text.blog[i].links[k])
            const replacement = paragraph.innerHTML.replace(
              '[' + (k + 1) + ']',
              '<a target="_blank" rel="noopener" href="' + link + '">' + description + '</a>'
            )
            paragraph.innerHTML = replacement
          }
        }

        // If visual media included.
        if (text.blog[i].media.length > 0) {
          // Replace markers ({1}, {2}, ...) for images and descriptions.
          for (let k = 0; k < text.blog[i].media.length; k++) {
            const path = Object.values(text.blog[i].media[k])
            const alt = Object.keys(text.blog[i].media[k])
            const replacement = paragraph.innerHTML.replace(
              '{' + (k + 1) + '}',
              '<img class="blogImage" src="' + path + '" alt="' + alt + '">'
            )
            paragraph.innerHTML = replacement
          }
        }

      }

    }

  }
}

export { Blog }
