import './../css/app4.css'
import $ from 'jquery';

const html = `
  <section id="app4">
    <div class="circular"></div>
  </section>
`
const $element = $(html).appendTo($('body > .wrap'))

const $circular = $('#app4 .circular')

$circular.on('mouseenter', () => {
  $circular.addClass('active')
}).on('mouseleave', () => {
  $circular.removeClass('active')
})