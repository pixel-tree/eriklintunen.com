/**
 * Works page.
 */

import { sequencer } from '../Utils'
import { xd0, xd1, resume0, resume1 } from '../Media'

class Works {
  constructor(container) {

    // Images.
    const xd = document.createElement('img')
    xd.src = xd0
    xd.id = 'xd'
    content.appendChild(xd)

    const resume = document.createElement('img')
    resume.src = resume0
    resume.id = 'resume'
    content.appendChild(resume)

    let $ = require('jquery')

    $('#xd').hover(function() {
      $(this).attr('src', xd1)
    }, function() {
      $(this).attr('src', xd0)
    })

    $('#resume').hover(function() {
      $(this).attr('src', resume1)
    }, function() {
      $(this).attr('src', resume0)
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
