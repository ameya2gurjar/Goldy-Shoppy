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

    $("button[name='postComment']").click(function(){
      var comment = $('textarea[name="comment"]').val();
      userid = $('input[name="userId"]').val();
      username = $('input[name="userName"]').val();
      userpic = $('input[name="userPic"]').val();
      productId = $('input[name="productId"]').val();
      if(!!comment){
        $.post( "/product/comment", {productId:productId, userid: userid,username: username,userpic: userpic, comment:comment })
      .done(function( data ) {
          location.reload();
      });
      }
    });

});
