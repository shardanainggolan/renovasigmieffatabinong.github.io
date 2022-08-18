"use strict";

$(function () {
  $('.header__menu-btn').click(function (e) {
    e.preventDefault();
    e.stopPropagation();
    $('body').toggleClass('menu-active');
  });
  $('.js-buy').click(function (e) {
    e.preventDefault();
    var id = $(this).attr('data-id');
    Paddle.Checkout.open({
      product: id
    });
  }); // const players = Array.from(document.querySelectorAll('.js-video')).map(p => new Plyr(p, {
  //   hideControls: true,
  // }));
  // const mainVideo = new Plyr(document.querySelector('.js-main-video'), {hideControls: true});
  // mainVideo.on('ready', function() {
  //   setTimeout(function() {
  //     $('.main-video__video').addClass('is-ready');
  //   }, 500);
  // });

  $('.main-section__video-preloader video').on('loadeddata', function () {
    $('.main-section__video-preloader').addClass('is-ready');
  });
  var playersWithoutControls = Array.from(document.querySelectorAll('.js-video-no-controls')).map(function (p) {
    return new Plyr(p, {
      controls: false,
      clickToPlay: false
    });
  });
  $(document).click(function (event) {
    var $target = $(event.target);

    if (!$target.closest('.sm-menu').length && $('body').hasClass('menu-active')) {
      $('body').removeClass('menu-active');
    }
  });
  $('.tutorial__nav a').click(function (e) {
    e.preventDefault();
    var target = $(this).attr('href');
    $('html,body').animate({
      scrollTop: $(target).offset().top - 100
    }, 500);
  });
  $('.video-benefit__replay').click(function (e) {
    e.preventDefault();
    var video = $(this).closest('.video-benefit').find('video')[0];
    video.pause();
    video.currentTime = 0;
    video.play();
  });
  initForms();
  initModals();
});
new WOW().init();

function initModals() {
  $('.js-modal-open').click(function (e) {
    e.preventDefault();
    $($(this).attr('data-modal')).addClass('is-active');
  });
  $('.js-modal-close').click(function (e) {
    e.preventDefault();
    $(this).closest('.modal').removeClass('is-active');
  });
  $(document).keyup(function (e) {
    if (e.key === "Escape") {
      $('.modal.is-active').removeClass('is-active');
    }
  });
}

function initForms() {
  $('.s-form').submit(function (e) {
    e.preventDefault();
    formSubmit($(this));
  });
  $('.s-form-success-btn').click(function (e) {
    e.preventDefault();
    $(this).closest('.s-form').removeClass('success');
  });
}

function formSubmit($form) {
  if ($form.hasClass('loading')) {
    return;
  }

  var email = $form.find('input[type="email"]').val();

  if (email === '') {
    $form.addClass('error');
    $form.find('.s-form-error').html('Enter email.');
    return;
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    $form.addClass('error');
    $form.find('.s-form-error').html('Enter correct email.');
    return;
  }

  var $submit = $form.find('.s-form-submit');
  $form.removeClass('error').removeClass('success').addClass('loading');
  $submit.addClass('loading');
  var encodedEmail = encodeURIComponent(email);
  var isDemoForm = $form.attr('data-type') === 'demo-form';
  var url = isDemoForm ? "https://static.mailerlite.com/webforms/submit/r0i5a1?&fields%5Bemail%5D=".concat(encodedEmail, "&ml-submit=1&anticsrf=true&ajax=1&guid=ef190c80-d383-c61e-aa97-26f33da63241&_=1647368183569") : "https://static.mailerlite.com/webforms/submit/u0i4l9?fields%5Bemail%5D=".concat(encodedEmail, "&ml-submit=1&anticsrf=true&ajax=1&guid=3998981f-f1b7-aa2a-877b-0ba2221587f0&_=1647286663083");
  $.ajax({
    // type: $form.attr('method'),
    url: url,
    // data: $form.serialize(),
    // cache: false,
    // dataType: 'json',
    // contentType: "application/json; charset=utf-8",
    error: function error(err) {
      $form.removeClass('loading').addClass('error');
      $submit.removeClass('loading');
    },
    crossDomain: true,
    success: function success(data) {
      if (!data.success) {
        $form.removeClass('loading').addClass('error');
        $form.find('.s-form-error').html(data.errors.fatal);
        $submit.removeClass('loading');
      } else {
        $form.removeClass('loading').addClass('success');
        $submit.removeClass('loading');
      }
    }
  });
}
//# sourceMappingURL=main-v3-22.js.map