Template.sign_in.onRendered(function() {
  $('body').addClass('body-main');
});


Template.sign_in.onDestroyed(function() {
  $('body').removeClass('body-main');
});
