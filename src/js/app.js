import $ from 'jquery';
import 'owl.carousel';
import 'vegas';
import 'jquery-sticky';
import 'remodal';
import inputmask from 'inputmask';

$('.form__file input[type=file]').change(function() {
  var filename = $(this)
    .val()
    .replace(/.*\\\\/, '');
  $('.form__file-fake span').text(filename);
});

// inputmask
inputmask({ mask: '+7 (999) 999-9999' }).mask('input[type=phone]');

// Scroll to
$(document).on('click', 'a.scroll-to[href^="#"]', function(event) {
  event.preventDefault();
  $('html, body').animate(
    {
      scrollTop: $($.attr(this, 'href')).offset().top - 70
    },
    500
  );
});

// remodal

// fix body overflow in window desctop size
$(function() {
  $(window).on('resize', function() {
    if (window.innerWidth >= 768) {
      $('.app').css({ overflow: 'visible', height: 'auto' });
    }
    console.log(window.innerWidth);
  });
});

// open left panel
$(function() {
  $(document).on('click', '.catalog__open-panel', function(e) {
    var $container = $('.catalog__left');
    var $height = $container.height();
    $container.addClass('is-open');
    $('.app').css({ overflow: 'hidden', height: $height });

    e.preventDefault();
  });
});

// burger open menu
$(function() {
  $(document).on('click', '.top-line__burger-link', function(e) {
    $(this).addClass('is-open');
    $('.navigation').addClass('is-open');
    e.preventDefault();
  });
  $(document).on('click', '.top-line__burger-link.is-open', function(e) {
    $(this).removeClass('is-open');
    $('.navigation').removeClass('is-open');
    e.preventDefault();
  });
});

// city select
$(function() {
  $(document).on('mouseup', function(e) {
    if (
      $(e.target)
        .closest('.top-line__country-href')
        .is('.top-line__country-href')
    ) {
      if (
        $(e.target)
          .parent()
          .hasClass('is-open')
      ) {
        $(e.target)
          .parent()
          .removeClass('is-open');
      } else {
        $(e.target)
          .parent()
          .addClass('is-open');
      }
      e.preventDefault();
    } else if (
      !$(e.target)
        .closest('.top-line__country-list')
        .is('.top-line__country-list')
    ) {
      $('.top-line__country').removeClass('is-open');
    }
  });
});

// navigation
$(function() {
  $('.navigation__submenu')
    .siblings('.navigation__link')
    .addClass('navigation__slink');

  //var $menu = $('.navigation');

  $(document).on('click', function(e) {
    if (
      $(e.target)
        .closest('.navigation__slink')
        .is('.navigation__slink')
    ) {
      e.preventDefault();
      $(e.target)
        .siblings('.navigation__submenu')
        .toggleClass('is-opened');
      // if($(e.target).siblings('.navigation__submenu').hasClass('is-opened')) {
      //   $(e.target).siblings('.navigation__submenu').removeClass('is-opened');
      // } else {
      //   $(e.target).siblings('.navigation__submenu').addClass('is-opened');
      // }
    } else if (
      !$(e.target)
        .closest('.navigation__submenu')
        .is('.navigation__submenu')
    ) {
      $('.navigation__submenu').removeClass('is-opened');
    }
  });
});

// contact tabs
$(function() {
  var $container = $('.js--tabs'); /* container tabs */
  $container.on('click', 'a[data-nav]', function(e) {
    var $link = $(this).data('nav'); /* tabs link */
    var $item = $container.find('*[data-item="' + $link + '"]'); /* tabs item */
    $('*[data-nav], *[data-item]').removeClass('is-active');
    $(this).addClass('is-active');
    $item.addClass('is-active');
    e.preventDefault();
  });
});

// sync slider to project page
$(document).ready(function() {
  var gallery = $('#gallery');
  var thumbs = $('#thumbs');
  var slidesPerPage = 3; //globaly define number of elements per page
  var syncedSecondary = true;

  gallery
    .owlCarousel({
      items: 1,
      slideSpeed: 5000,
      //autoplay: true,
      //nav: true,
      dots: false,
      loop: true,
      responsiveRefreshRate: 200,
      navText: [
        '<svg width="100%" height="100%" viewBox="0 0 11 20"><path style="fill:none;stroke-width: 1px;stroke: #000;" d="M9.554,1.001l-8.607,8.607l8.607,8.606"/></svg>',
        '<svg width="100%" height="100%" viewBox="0 0 11 20" version="1.1"><path style="fill:none;stroke-width: 1px;stroke: #000;" d="M1.054,18.214l8.606,-8.606l-8.606,-8.607"/></svg>'
      ]
    })
    .on('changed.owl.carousel', syncPosition);

  thumbs
    .on('initialized.owl.carousel', function() {
      thumbs
        .find('.owl-item')
        .eq(0)
        .addClass('current');
    })
    .owlCarousel({
      items: slidesPerPage,
      dots: false,
      //nav: true,
      margin: 10,
      smartSpeed: 200,
      slideSpeed: 500,
      slideBy: slidesPerPage, //alternatively you can slide by 1, this way the active slide will stick to the first item in the second carousel
      responsiveRefreshRate: 100
    })
    .on('changed.owl.carousel', syncPosition2);

  function syncPosition(el) {
    //if you set loop to false, you have to restore this next line
    //var current = el.item.index;

    //if you disable loop you have to comment this block
    var count = el.item.count - 1;
    var current = Math.round(el.item.index - el.item.count / 2 - 0.5);

    if (current < 0) {
      current = count;
    }
    if (current > count) {
      current = 0;
    }

    //end block

    thumbs
      .find('.owl-item')
      .removeClass('current')
      .eq(current)
      .addClass('current');
    var onscreen = thumbs.find('.owl-item.active').length - 1;
    var start = thumbs
      .find('.owl-item.active')
      .first()
      .index();
    var end = thumbs
      .find('.owl-item.active')
      .last()
      .index();

    if (current > end) {
      thumbs.data('owl.carousel').to(current, 100, true);
    }
    if (current < start) {
      thumbs.data('owl.carousel').to(current - onscreen, 100, true);
    }
  }

  function syncPosition2(el) {
    if (syncedSecondary) {
      var number = el.item.index;
      gallery.data('owl.carousel').to(number, 100, true);
    }
  }

  thumbs.on('click', '.owl-item', function(e) {
    e.preventDefault();
    var number = $(this).index();
    gallery.data('owl.carousel').to(number, 300, true);
  });

  $('.project__thumbs-arr--left').on('click', function() {
    gallery.trigger('prev.owl.carousel');
  });
  $('.project__thumbs-arr--right').on('click', function() {
    gallery.trigger('next.owl.carousel');
  });
});

// top navigation sticky
$(window).scroll(function() {
  var scroll = $(window).scrollTop();
  if (scroll >= 40) {
    $('.navigation').addClass('navigation__shadow');
  } else {
    $('.navigation').removeClass('navigation__shadow');
  }
});

$(window).on('resize load', function() {
  if ($(this).outerWidth() <= 991) {
    $('.top-line').sticky({
      topSpacing: 0,
      className: 'navigation__shadow',
      zIndex: '11'
    });
    $('.navigation').unstick();
  } else {
    $('.navigation').sticky({
      topSpacing: 0,
      className: 'navigation__shadow',
      zIndex: '10'
    });
    $('.top-line').unstick();
  }
  $('.navigation').sticky('update');
  $('.top-line').sticky('update');
});

// tabs
$(document).on('click touchend', '.js--tab', function(e) {
  var tabsItem = $(this)
    .parent()
    .find('.tabs__item');
  $('.tabs .tabs__item').css('height', 0);
  if (tabsItem.height() === 0) {
    autoHeightAnimate(tabsItem, 200);
    $(this).addClass('tabs__link--is-open');
  } else {
    tabsItem.stop().animate({ height: '0' }, 200);
    $('.tabs__link').removeClass('tabs__link--is-open');
  }
  e.preventDefault();
});

/* Function to animate height: auto */
function autoHeightAnimate(element, time) {
  var curHeight = element.height(), // Get Default Height
    autoHeight = element.css('height', 'auto').height(); // Get Auto Height
  element.height(curHeight); // Reset to Default Height
  element.stop().animate({ height: autoHeight }, time); // Animate to Auto Height
}

// main-production tabs
$('.main-production__item').on('click touchend mouseover', function() {
  $('.main-production__item').removeClass('main-production__item--is-active');
  if ($(this).hasClass('main-production__item--is-active')) {
    $('.main-production__item').removeClass('main-production__item--is-active');
  } else {
    $(this).addClass('main-production__item--is-active');
  }
});

// project tabs
$('.inp__item').on('click touchend mouseover', function() {
  $('.inp__item').removeClass('inp__item--is-active');
  if ($(this).hasClass('inp__item--is-active')) {
    $('.inp__item').removeClass('inp__item--is-active');
  } else {
    $(this).addClass('inp__item--is-active');
  }
});

// pb catalog-inner slider
var pbslider = $('.js--pb');
pbslider.owlCarousel({
  items: 1
});
$('.pb__arr--left.pb__arr--pb').on('click', function() {
  pbslider.trigger('prev.owl.carousel');
});
$('.pb__arr--right.pb__arr--pb').on('click', function() {
  pbslider.trigger('next.owl.carousel');
});

// pa catalog-inner slider
var paslider = $('.js--pa');
paslider.owlCarousel({
  responsive: {
    // breakpoint from 0 up
    0: {
      items: 1
    },
    // breakpoint from 480 up
    640: {
      items: 2,
      margin: 20
    }
  }
});
$('.pb__arr--pa.pb__arr--left').on('click', function() {
  paslider.trigger('prev.owl.carousel');
});
$('.pb__arr--pa.pb__arr--right').on('click', function() {
  paslider.trigger('next.owl.carousel');
});

// main page slider
var mslider = $('.main-project__list');
mslider.owlCarousel({
  loop: true,
  items: 3,
  center: true,
  margin: 15,
  onInitialized: counter, //When the plugin has initialized.
  onTranslated: counter, //When the translation of the stage has finished.
  responsive: {
    // breakpoint from 0 up
    0: {
      items: 1,
      center: true
    },
    // breakpoint from 480 up
    640: {
      items: 2,
      center: true
    }
  }
});
// счетчик слайдов
function counter(event) {
  var $index =
    event.item.index -
    ((event.relatedTarget._clones.length / 2) % event.item.count);
  $('.main-project__counter-current').html($index + 1);
  $('.main-project__counter-total').html(event.item.count);
}
// биндим стрелки
$('.main-project__arr--left').on('click', function() {
  mslider.trigger('prev.owl.carousel');
});
$('.main-project__arr--right').on('click', function() {
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
    console.log(slideSettings);
  }
});
$('.slider__arr--right').on('click', function(e) {
  $('.slider').vegas('next');
  e.preventDefault();
});
$('.slider__arr--left').on('click', function(e) {
  $('.slider').vegas('prev');
  e.preventDefault();
});

$('.slider__dot').on('click', function() {
  var $number = $(this).data('slide');
  $('.slider__dot').removeClass('slider__dot--active');
  $('.slider').vegas('jump', $number);
  $(this).addClass('slider__dot--active');
});
