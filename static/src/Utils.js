/**
 * Utilities.
 */

import { About } from './components/About'
import { Works, XD, Resume } from './components/Works'
import { Blog } from './components/Blog'
import { Contact } from './components/Contact'

/* Clear element */

function clear(elementID) { document.getElementById(elementID).innerHTML = '' }

/* Sequencer */

function sequencer() {

  clear('content')

  // About.
  if (page.content === 'about') {
    new About(playground)
  }

  // Works.
  else if (page.content === 'works') {
    new Works(playground)
  } else if (page.content === 'xd') {
    new XD(playground)
  } else if (page.content === 'resume') {
    new Resume(playground)
  }

  // Blog.
  else if (page.content === 'blog') {
    new Blog(playground)
  }

  // Contact.
  else if (page.content === 'contact') {
    new Contact(playground)
  }

}

export { sequencer }
