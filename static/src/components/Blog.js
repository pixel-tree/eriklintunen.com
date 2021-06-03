/**
 * Blog page.
 */

import { data } from '../Main'
import { sequencer } from '../Utils'

class Blog {
  constructor(container) {

    // Content frame.
    const content = document.getElementById('content')

    // Quote.
    const blogQ = document.createElement('div')
    blogQ.id = 'blogQ'
    content.appendChild(blogQ)

    for (let i = 0; i < data.blogQ.length; i++) {
      // Paragraphs.
      let paragraph = document.createElement('p')
      paragraph.innerHTML = data.blogQ[i]
      blogQ.appendChild(paragraph)
    }

    // Generate content.
    for (let i = 0; i < data.blog.length; i++) {

      // Sections.
      let section = document.createElement('div')
      section.classList.add('blogEntry')
      content.appendChild(section)

      // Entry header (date: title).
      const title = document.createElement('div')
      title.classList.add('blogTitle')
      title.innerText = data.blog[i].date + ': ' + data.blog[i].title
      section.appendChild(title)

      // Main body.
      const body = document.createElement('div')
      body.classList.add('blogBody')
      section.appendChild(body)

      // Individual paragraphs.
      for (let j = 0; j < data.blog[i].body.length; j++) {
          let paragraph = document.createElement('p')
          paragraph.innerHTML = data.blog[i].body[j]
          body.appendChild(paragraph)
      }

      // Replace markers {index} with visual media.
      if (typeof data.blog[i].media !== "undefined"
      && data.blog[i].media.length > 0) {
        for (let j = 0; j < data.blog[i].media.length; j++) {
          let path = Object.values(data.blog[i].media[j])
          let alt = Object.keys(data.blog[i].media[j])
          let replacement = body.innerHTML.replace(
            '{' + (j + 1) + '}',
            '<img class="image" src="' + path + '" alt="' + alt + '">'
          )
          body.innerHTML = replacement
        }
      }

      // Replace markers [index] with links.
      if (typeof data.blog[i].links !== "undefined"
      && data.blog[i].links.length > 0) {
        for (let j = 0; j < data.blog[i].links.length; j++) {
          let url = Object.values(data.blog[i].links[j])
          let intext = Object.keys(data.blog[i].links[j])
          let replacement = body.innerHTML.replace(
            '[' + (j + 1) + ']',
            '<a target="_blank" rel="noopener" href="' + url + '">' + intext + '</a>'
          )
          body.innerHTML = replacement
        }
      }

    }

    // Select all <code>.
    let code = document.querySelectorAll('code')
    // Move selected elements into codeBlocks.
    for (let i = 0; i < code.length; i++) {
      let codeBlock = document.createElement('div')
      codeBlock.classList.add('codeBlock')
      code[i].parentNode.insertBefore(codeBlock, code[i])
      codeBlock.appendChild(code[i])
    }

  }
}

export { Blog }
