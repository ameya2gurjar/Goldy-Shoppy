$(function() {
  console.log('local.js ready');

  var numImages = $('.prod_image').length;
  var counter =0;
  displayImage(counter);
  $('.next-icon').click(function(){
    counter = (counter + 1 )%numImages;
    displayImage(counter);
  });

  $('.prev-icon').click(function(){
    counter = (counter + 1 )%numImages;
    displayImage(counter);
  });

  function displayImage(counter){
    var url = "url("+$('.prod_image')[counter].src+")";
    $('#images').css('background-image',url);
    }

});
