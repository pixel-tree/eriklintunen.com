/**
 * Works page.
 */

import { text, visual } from '../Main'
import { sequencer } from '../Utils'

class Works {
  constructor(container) {

    // Images.
    const xd = document.createElement('img')
    xd.src = visual.works.xd.path
    xd.id = 'xd'
    content.appendChild(xd)

    const resume = document.createElement('img')
    resume.src = visual.works.resume.path
    resume.id = 'resume'
    content.appendChild(resume)

    let $ = require('jquery')

    $('#xd').hover(function() {
      $(this).attr('src', visual.works.xd_inv.path)
    }, function() {
      $(this).attr('src', visual.works.xd.path)
    })

    $('#resume').hover(function() {
      $(this).attr('src', visual.works.resume_inv.path)
    }, function() {
      $(this).attr('src', visual.works.resume.path)
    })

    xd.onclick = function() {
      document.getElementById('page').content = 'xd'
      sequencer()
    }

    resume.onclick = function() {
      document.getElementById('page').content = 'resume'
      sequencer()
    }

  }
}

class XD {
  constructor(container) {

    // Title.
    const header = document.createElement('div')
    header.classList.add('workHeader')
    header.innerText = 'experimental design (works in progress)'
    content.appendChild(header)

    // Listing.
    for (let i = 0; i < text.xd.length; i++) {

      const title = document.createElement('div')
      title.classList.add('xdTitle')
      title.innerText = text.xd[i].title
      content.appendChild(title)

      // Container.
      const body = document.createElement('div')
      body.classList.add('xdBody')
      content.appendChild(body)

      // Content.
      for (let j = 0; j < text.xd[i].body.length; j++) {
        const paragraph = document.createElement('p')
        paragraph.innerText = text.xd[i].body[j]
        body.appendChild(paragraph)
      }

    }

  }
}

class Resume {
  constructor(container) {

    // Title.
    const header = document.createElement('div')
    header.classList.add('workHeader')
    header.innerText = 'résumé (selected experience)'
    content.appendChild(header)

    // Categories.
    for (let i = 0; i < text.resume.length; i++) {

      const category = document.createElement('div')
      category.classList.add('resumeCategory')
      category.innerText = text.resume[i].category
      content.appendChild(category)

      // Entries under categories, each with year and title.
      for (let j = 0; j < text.resume[i].entries.length; j++) {

        // Container.
        const entry = document.createElement('div')
        entry.classList.add('resumeEntry')
        category.appendChild(entry)

        // Common keys for each entry.
        const year = document.createElement('div')
        year.classList.add('resumeYear')
        year.innerText = text.resume[i].entries[j].year
        entry.appendChild(year)

        const title = document.createElement('div')
        title.classList.add('resumeTitle')
        title.innerText = text.resume[i].entries[j].title
        entry.appendChild(title)

        const meta = document.createElement('div')
        meta.classList.add('resumeMeta')
        entry.appendChild(meta)

        // Extract key-value pairs for category-specific data.
        const keys = Object.keys(text.resume[i].entries[j])

        // Set height (px) of each entry relative to
        // the number of lines required for metadata.
        let height = 19  // base height (font-size + 4).

        // Loop through keys but ignore year and title (common keys).
        keys.slice(2).forEach((key, index) => {

          // Multiple paragraphs if no. venues > 1.
          // TO DO: store some of below in variables to make more legible.
          if (`${key}` === 'venue') {
            for (let k = 0; k < `${text.resume[i].entries[j][key].length}`; k++) {
              const metaData = document.createElement('p')
              // Punctuation within venue list.
              if (k < `${text.resume[i].entries[j][key].length}` - 1) {
                metaData.innerText = `${text.resume[i].entries[j][key][k]}` + ';'
              } else if (k === `${text.resume[i].entries[j][key].length}` - 1 && k !== 0){
                metaData.innerText = 'and ' + `${text.resume[i].entries[j][key][k]}`
              } else {
                metaData.innerText = `${text.resume[i].entries[j][key][k]}`
              }
              // metaData.classList.add('venue')
              meta.appendChild(metaData)
              height += 14  // font-size + 4.
            }
          } else {  // All other works.
            const metaData = document.createElement('p')
            metaData.innerText = `${text.resume[i].entries[j][key]}`
            meta.appendChild(metaData)
            height += 14  // font-size + 4.
          }
        })

        // Update height.
        entry.style.height = height + 'px'

      }

    }

  }
}

export { Works, XD, Resume }
