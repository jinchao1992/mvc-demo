import './../css/app4.css'
import $ from 'jquery';

const $circular = $('#app4 .circular')

$circular.on('mouseenter', () => {
  $circular.addClass('active')
}).on('mouseleave', () => {
  $circular.removeClass('active')
})