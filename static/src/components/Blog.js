/**
 * Blog page.
 */

import { text, visual } from '../Main'
import { sequencer } from '../Utils'

class Blog {
  constructor(container) {

    // Currently missing (decide whether to archive or include in live build):
    // 140520: The expressive power of the (digital) line
    // 270420: A case for postdramatic theatre

    // Generate content but skip first object (template).
    for (let i = 1; i < text.blog.length; i++) {

      // Post title (date: header).
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

        // If text includes links.
        if (text.blog[i].links.length > 0) {
          // Replace markers for links and descriptions.
          for (let k = 0; k < text.blog[i].links.length; k++) {
            const link = Object.values(text.blog[i].links[k])
            const description = Object.keys(text.blog[i].links[k])
            const replacement = paragraph.innerHTML.replace('[' + (k + 1) + ']', '<a href="' + link + '">' + description + '</a>')
            paragraph.innerHTML = replacement
          }
        }

      }

      // Include embeds if any.
      if (text.blog[i].embeds.length > 0) {
        for (let j = 0; j < text.blog[i].embeds.length; j++) {
          const paragraph = document.createElement('p')
          paragraph.innerHTML = text.blog[i].embeds[j]
          body.appendChild(paragraph)
        }
      }

    }


  }
}

export { Blog }
