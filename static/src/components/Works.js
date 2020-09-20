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

    // Placeholder.
    const newimg = document.createElement('img')
    newimg.src = xd0
    newimg.id = 'newimg'
    content.appendChild(newimg)

  }
}

class Resume {
  constructor(container) {

    // Placeholder.
    const newimg2 = document.createElement('img')
    newimg2.src = resume0
    newimg2.id = 'newimg2'
    content.appendChild(newimg2)

  }
}

export { Works, XD, Resume }
