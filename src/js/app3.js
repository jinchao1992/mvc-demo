import './../css/app3.css'
import $ from 'jquery'

const $app3 = $('#app3')
const $square = $app3.find('.square')
const localKey = 'app3.active'
const active = localStorage.getItem(localKey) === 'yes'

// if(active) {
//   $square.addClass('active')
// } else {
//   $square.removeClass('active')
// }
$square.toggleClass('active', active)

$square.on('click', () => {
  if (!$square.hasClass('active')) {
    $square.addClass('active')
    localStorage.setItem(localKey, 'yes')
  } else {
    $square.removeClass('active')
    localStorage.setItem(localKey, 'no')
  }
})