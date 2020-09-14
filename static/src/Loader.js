/**
 * Loader.
 */

 /* Animations */

// TO DO : Animate function.


const loader = document.createElement('div')
loader.id = 'loader'
playground.appendChild(loader)

 let $ = require('jquery')

 let URL = './build/animate.bundle.js'

 $.ajax({
   type: 'GET',
   dataType: 'script',
   url: URL,
   cache: false,
   xhr: function() {
     var xhr = new window.XMLHttpRequest()

     xhr.addEventListener('progress', function(event) {
       if (event.lengthComputable) {
         var perc = Math.round(event.loaded / event.total * 100)
         loader.innerText = 'loading... ' + perc + '%'
       }
     }, false)

     return xhr

   },
   success: function() {
     $('#loader').text('initialising...')
   },
   error: function() {
     $('#loader').text('loading failed!')
   },
   complete: function() {
     $('#loader').text('')
     $('#loader').hide()
   }
 })
