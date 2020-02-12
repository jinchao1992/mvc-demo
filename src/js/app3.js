import './../css/app3.css'
import $ from 'jquery'

const $app3 = $('#app3')
const $square = $app3.find('.square')
$app3.on('click', () => {
  $square.toggleClass('active')
})