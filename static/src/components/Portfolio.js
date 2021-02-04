/**
 * Portfolio page.
 */

import { data } from '../Main'
import { sequencer } from '../Utils'

class Portfolio {
  constructor(container) {

    // Content frame.
    const content = document.getElementById('content')

    // Introduction.
    const about = document.createElement('div')
    about.id = 'about'
    content.appendChild(about)

    // Generate intro.
    for (let i = 0; i < data.about.length; i++) {
      // Paragraphs.
      let paragraph = document.createElement('p')
      paragraph.innerHTML = data.about[i]
      about.appendChild(paragraph)
    }

    // Generate content.
    for (let i = 0; i < data.portfolio.length; i++) {

      // Work title.
      let title = document.createElement('div')
      title.classList.add('workH')
      title.innerText = data.portfolio[i].year + ': ' + data.portfolio[i].id
      content.appendChild(title)

      // Work description.
      let body = document.createElement('div')
      body.classList.add('workB')
      content.appendChild(body)

      // Individual paragraphs.
      for (let j = 0; j < data.portfolio[i].body.length; j++) {
          let paragraph = document.createElement('p')
          paragraph.innerHTML = data.portfolio[i].body[j]
          body.appendChild(paragraph)
      }

      // Replace markers {index} with visual media.
      if (typeof data.portfolio[i].media !== "undefined"
      && data.portfolio[i].media.length > 0) {
        for (let j = 0; j < data.portfolio[i].media.length; j++) {
          let path = Object.values(data.portfolio[i].media[j])
          let alt = Object.keys(data.portfolio[i].media[j])
          let replacement = body.innerHTML.replace(
            '{' + (j + 1) + '}',
            '<img class="image" src="' + path + '" alt="' + alt + '">'
          )
          body.innerHTML = replacement
        }
      }

      // Replace markers [index] with links.
      if (typeof data.portfolio[i].links !== "undefined"
      && data.portfolio[i].links.length > 0) {
        for (let j = 0; j < data.portfolio[i].links.length; j++) {
          let url = Object.values(data.portfolio[i].links[j])
          let intext = Object.keys(data.portfolio[i].links[j])
          let replacement = body.innerHTML.replace(
            '[' + (j + 1) + ']',
            '<a target="_blank" rel="noopener" href="' + url + '">' + intext + '</a>'
          )
          body.innerHTML = replacement
        }
      }

    }

  }
}

export { Portfolio }
