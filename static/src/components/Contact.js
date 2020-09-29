/**
 * Contact page.
 */

import '../../style/terminal.scss'

import PGP from '../../media/text/pgp.txt'
import { text } from '../Main'
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
    let openpgp = require('openpgp')
    let regeneratorRuntime = require('regenerator-runtime')

    let phase = 0
    let data = []

    jQuery(function($, undefined) {
      $('#terminal').terminal(function(command) {

        // Yes / no to leave message.
        if (phase === 0 && commands.slice(7, 12).includes(command)) {
          // yes
          phase += 1
          this.echo(String('\n' + 'Enter your name:' + '\n'))
        } else if (phase === 0 && commands.slice(12, 17).includes(command)) {
          // no
          this.echo(String('\n' + PGP))
          this.echo(String('\n' + text.contact.mail + '\n'))

        }

        // If entry not in commands array.
        if (!commands.includes(command)) {
          if (phase === 1) {
            phase += 1
            // Name stored to data[0].
            data[0] = command
            this.echo(String('\n' + 'Enter your contact details:' + '\n'))
          } else if (phase === 2) {
            phase += 1
            // Contact details stored to data[1].
            data[1] = command
            this.echo(String('\n' + 'Your message (SHIFT + ENTER for line break):' + '\n')) // TO DO : sort out overflow-x problem when writing message.
          } else if (phase === 3) {
            // Reset counter.
            phase = 0

            const message = async() => {
              const pubKey = PGP
              const options = {
                message: openpgp.message.fromText(command),
                publicKeys: (await openpgp.key.readArmored(pubKey)).keys
              }
              openpgp.encrypt(options).then(ciphertext => {
                const encrypted = ciphertext.data
                // Encrypted string stored to data[2].
                data[2] = encrypted
                $.ajax( {
                  async: false,
                  url: '/send_message',
                  type: 'POST',
                  dataType: 'json',
                  data: JSON.stringify({ data: data })
                  }).done(function() {
                    // TO DO: troubleshoot -- doesn't work in Flask.
                    setTimeout(function(){ sequencer() }, 3000)
                })
              })

            }

            message() // Encrypt and send message.
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
