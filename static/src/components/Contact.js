/**
 * Contact page.
 */

import '../../terminal.scss'

import PGP from '../../media/pgp.txt'
import { sequencer } from '../Utils'

class Contact {
  constructor(container) {

    // Main frame.
    const content = document.getElementById('content')

    // Frame.
    this._element = document.createElement('div')
    this._element.id = 'terminal'
    content.appendChild(this._element)

    /*
     * Terminal.
     */

    const forbidden = [
      '',
      'reset', 'Reset', 'RESET'
    ]

    const hello = 'Please leave your message below. Encrypted using PGP (:'
                  + '\n' + '\n' + 'Enter your name:' + '\n'

    let jQuery = require('jquery.terminal')
    let openpgp = require('openpgp')
    let regeneratorRuntime = require('regenerator-runtime')

    let phase = 0
    let data = []

    jQuery(function($, undefined) {
      $('#terminal').terminal(function(command) {

        /*
         * Sequencer.
         * Triggered by entering name...
         */

        // If entry not in forbidden array...
        if (!forbidden.includes(command)) {
          if (phase === 0) {
            phase += 1
            // Name stored to data[0].
            data[0] = command
            this.echo(String('\n' + 'Contact details:' + '\n'))
          } else if (phase === 1) {
            phase += 1
            // Contact details stored to data[1].
            data[1] = command
            this.echo(String('\n' + 'Message (SHIFT+ENTER for line break):' + '\n'))
          } else if (phase === 2) {
            // Reset counter.
            phase = 0
            // Encrypt message.
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
                  data: JSON.stringify({ data: data })
                }).done(function() {
                    setTimeout(function(){ sequencer() }, 3000)
                })
              })

            }

            message()  // Send message.
            this.echo(String('\n' + '[[i;;]Thanks for your message!]' + '\n'))
          }
        }

        // Reset.
        else if (forbidden.slice(1, 4).includes(command)) {
          sequencer()
        }

      },
      {
        name: 'Erik',
        greetings: function() { this.echo(String(hello), {keepWords: true}) },
        prompt: '> '
      })
    })

  }
}

export { Contact }
