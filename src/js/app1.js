import './../css/app1.css'
// 引入JQuery
import $ from 'jquery'

const $button1 = $('#add')
const $button2 = $('#subtract')
const $button3 = $('#multiply')
const $button4 = $('#divide')
const $number = $('#number')
const n = localStorage.getItem('n')
$number.text(n || 100)

$button1.on('click', () => {
  let n = parseInt($number.text())
  n += 1
  $number.text(n)
  localStorage.setItem('n', n)
})

$button2.on('click', () => {
  let n = parseInt($number.text())
  n -= 1
  $number.text(n)
  localStorage.setItem('n', n)
})

$button3.on('click', () => {
  let n = parseInt($number.text())
  n *= 2
  $number.text(n)
  localStorage.setItem('n', n)
})

$button4.on('click', () => {
  let n = parseInt($number.text())
  n *= 3
  $number.text(n)
  localStorage.setItem('n', n)
})