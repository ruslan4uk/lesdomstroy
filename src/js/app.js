import $ from 'jquery';
import 'owl.carousel';
import 'vegas';


$('.main-production__item').on('click touchend',function() {
  $('.main-production__item').removeClass('main-production__item--is-active');
  if($(this).hasClass('main-production__item--is-active')) {
    $('.main-production__item').removeClass('main-production__item--is-active');
  } else {
    $(this).addClass('main-production__item--is-active');
  }
});

var mslider = $('.main-project__list');
mslider.owlCarousel({
  loop:true,
  items:3,
  center: true,
  margin:15,
  onInitialized  : counter, //When the plugin has initialized.
  onTranslated : counter, //When the translation of the stage has finished.
  responsive : {
    // breakpoint from 0 up
    0 : {
      items:1,
      center: true,
    },
    // breakpoint from 480 up
    640 : {
      items:2,
      center: true,
    },
  }
});
// счетчик слайдов
function counter(event) {
  var $index = event.item.index - event.relatedTarget._clones.length / 2 % event.item.count;
  $('.main-project__counter-current').html($index + 1);
  $('.main-project__counter-total').html(event.item.count);
}
// биндим стрелки
$('.main-project__arr--left').on('click',function() {
  mslider.trigger('prev.owl.carousel');
});
$('.main-project__arr--right').on('click',function() {
  mslider.trigger('next.owl.carousel');
});

// slider__list
$('.slider').vegas({
  delay: 7000,
  slides: [
    { src: '/img/slider/2.jpg' },
    { src: '/img/slider/3.jpg' },
    { src: '/img/slider/4.jpg' },
    { src: '/img/slider/5.jpg' }
  ],
  // биндим навигацию по слайдеру
  walk: function(index, slideSettings) {
    $('.slider__dot').removeClass('slider__dot--active');
    var $slide = $('.slider__dots').find(`[data-slide='${index}']`);
    $($slide).addClass('slider__dot--active');
  }
});
$('.slider__arr--right').on('click', function(e) { $('.slider').vegas('next'); e.preventDefault(); });
$('.slider__arr--left').on('click', function(e) { $('.slider').vegas('prev'); e.preventDefault(); });

$('.slider__dot').on('click',function() {
  var $number = $(this).data('slide');
  $('.slider__dot').removeClass('slider__dot--active');
  $('.slider').vegas('jump', $number);
  $(this).addClass('slider__dot--active');
});
