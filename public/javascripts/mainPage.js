$("#addRequest").click(function(){
    $(".requestForm").addClass("is-active");
});

$("#closeRequestForm").click(function(){
    $(".requestForm").removeClass("is-active");
});

$(".addComment").click(function(){
   $(".commentForm").addClass("is-active");
   $("#sendMailTo").val($(this).closest(".card").attr("postedBy"));
});

$("#closeCommentForm").click(function(){
    $(".commentForm").removeClass("is-active");
});


$('#saveRequest').click(function(e) {
  console.log("Mein aya");
    // how to select the file itself
    $('#errorDiv').css('display', 'none');

    var request = Object();

    request.category = $('#category').val();
    request.requirement = $('#requirement').val();
    request.requestMessage = $('#requestMessage').val();



console.log($('#name').val());
    console.log(request);


    $.ajax({
      url: '/addRequest',
      data: request,
      type: 'POST',
      success: function(data) {
        console.log('data', data);
        if(!!data.Error){
          $('#errorDiv').css('display', 'inline-block');
          $('#errorText').html(data.Error);
          // alert(data.Error);
        }else{
          $(".requestForm").removeClass("is-active");
          window.location = "/";
        }
        $('#ajaxResponse').html(JSON.stringify(data));

      }
    });

  });

  $('#saveComment').click(function(e) {
    console.log("Mein aya");
      // how to select the file itself
      $('#errorDiv').css('display', 'none');

      var request = Object();
      request.comment = $('#commentMessage').val();

      console.log($('#name').val())
      console.log(request);


      $.ajax({
        url: '/addComment',
        data: request,
        type: 'POST',
        success: function(data) {
          console.log('data', data);
          if(!!data.Error){
            $('#errorDiv').css('display', 'inline-block');
            $('#errorText').html(data.Error);
            // alert(data.Error);
          }else{
            $(".requestForm").removeClass("is-active");
            window.location = "/";
          }
          $('#ajaxResponse').html(JSON.stringify(data));

        }
      });

    });
