/**
 * Contact page.
 */

import '../../style/terminal.scss'

import CONTACT_ADDRESS from '../../media/text/contact.txt'
import PGP from '../../media/text/pgp.txt'
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
      'reset', 'Reset', 'RESET',
      'yes', 'Yes', 'YES', 'y', 'Y',
      'no', 'No', 'NO', 'n', 'N'
    ]

    const hello = 'Please leave your message below. Encrypted using PGP (:' +
      '\n' + '\n' + 'YES / NO (for alternatives)' + '\n'

    let jQuery = require('jquery.terminal')

    let phase = 0
    let data = []

    jQuery(function($, undefined) {
      $('#terminal').terminal(function(command) {

        // yes / no to leave message.
        if (phase === 0 && commands.slice(7, 12).includes(command)) {
          // yes
          phase += 1
          this.echo(String('\n' + 'Enter your name:' + '\n'))
        } else if (phase === 0 && commands.slice(12, 17).includes(command)) {
          // no
          this.echo(String('\n' + CONTACT_ADDRESS))
          this.echo(String('\n' + PGP + '\n'))
        }

        // If entry not in commands array.
        if (!commands.includes(command)) {
          if (phase === 1) {
            phase += 1
            data[0] = command
            this.echo(String('\n' + 'Enter your contact details:' + '\n'))
          } else if (phase === 2) {
            phase += 1
            data[1] = command
            this.echo(String('\n' + 'Your message (SHIFT + ENTER for line break):' + '\n'))
            // TO DO : sort out overflow-x problem.
          } else if (phase === 3) {
            phase = 0
            data[2] = command
            // TO DO: ENCRYPT MESSAGE pgp
            console.log('Sent data: ' + data)
            $.ajax( {
              async: false,
              url: '/send_message',
              type: 'POST',
              dataType: 'json',
              data: JSON.stringify({ data: data })
              }).done(function(data) {
                setTimeout(function(){ sequencer() }, 3000)
            })
            this.echo(String('\n' + 'Thanks for your message!' + '\n'))
          }
        }

        // List options.
        else if (commands.slice(0, 4).includes(command)) {
          this.echo(String('\n' + 'Help here...' + '\n'))
        }

        // Reset.
        else if (commands.slice(4, 7).includes(command)) {
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
