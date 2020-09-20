/**
 * Blog page.
 */

import { text, visual } from '../Main'
import { sequencer } from '../Utils'

class Blog {
  constructor(container) {

    // Blog categories.
    const categories = [
      'writings',
      'maths',
      'news'
    ]

    /* Elements */

    for (let i = 0; i < categories.length; i++) {

      const category = document.createElement('div')
      category.classList.add('categories')
      category.innerText = categories[i]

      category.onclick = function() {
        if (document.getElementById('page').content !== this.innerHTML) {
          document.getElementById('page').content = this.innerHTML
          sequencer()
        }
      }

      content.appendChild(category)

    }

  }
}

class Writings {
  constructor(container) {

    console.log('writings')

  }
}

class Maths {
  constructor(container) {

    console.log('maths')

  }
}

class News {
  constructor(container) {

    console.log('news')

  }
}

export { Blog, Writings, Maths, News }
