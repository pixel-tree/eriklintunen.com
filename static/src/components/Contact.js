/**
 * Contact page.
 */

import '../../style/terminal.scss'

import { sequencer } from '../Utils'

class Contact {
  constructor(container) {

    // Frame.
    this._element = document.createElement('div')
    this._element.id = 'terminal'
    content.appendChild(this._element)

    /*
     * Terminal.
     */

    const commands = [
      '',
      'help', 'Help', 'HELP',
      'reset', 'Reset', 'RESET'
    ]

    const hello = 'Please leave your message here. ' +
      'Type ' + '[[i;;]' + 'help ' + ']' + 'for available commands; ' +
      '[[i;;]' + 'reset ' + ']' + 'to clear form... ' +
      'INSERT YOUR NAME.' + '\n' + '\n'

    // '[[b;;]' + message + ']' + '\n' + '\n'

    let jQuery = require('jquery.terminal')

    let phase = 0

    jQuery(function($, undefined) {
      $('#terminal').terminal(function(command) {

// TO DO : feed back messaged for each phase + remove temp console.logs.
// TO DO : sort out overflow-x problem.

        // If entry not in command array.
        if (!commands.includes(command)) {
          if (phase === 0) {
            let name = command
            phase += 1
            console.log(name)
          } else if (phase === 1) {
            let address = command
            phase += 1
            console.log(address)
          } else if (phase === 2) {
            let message = command
            phase += 1
            console.log(message)
          } else if (phase === 3) {
            if (command === 'y'
              || command === 'Y'
              || command === 'yes'
              || command === 'Yes'
              || command === 'YES'
            ) {
              // encrypt message
              phase += 1
              console.log('encrypted')
              console.log(phase)
            } else if (command === 'n'
              || command === 'N'
              || command === 'no'
              || command === 'No'
              || command === 'NO'
            ) {
              phase += 1
              console.log('not encrypted')
              console.log(phase)
            } else {
              // "you have to choose."
              console.log('sperg')
            }
            if (phase === 4) {
              // send message
              // "thanks, etc."
              console.log('message sent')
              sequencer()
            }

          }
        }

        //   this.echo(String('\n' + '[[b;;]' + messaging() + ']' + '\n'), {keepWords: true})

        // List options.
        else if (commands.indexOf(command) > 0 && commands.indexOf(command) < 4) {
          this.echo(String('\n' + '\n' + 'Help here...' + '\n' + '\n'))
          console.log('Help here...')
        }

        // Reset.
        else if (commands.indexOf(command) >= 4 && commands.indexOf(command) < 7) {
          sequencer()
        }

      },
      {
        name: 'Erik',
        greetings: hello,
        prompt: '~> '
      })
    })

  }
}

export { Contact }
