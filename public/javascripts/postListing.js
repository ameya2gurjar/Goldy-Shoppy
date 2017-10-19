$(function() {
  console.log('postListing.js ready');

  $('#select-category').bind("change keyup",function() {
     $(this).find(":selected").each(function () {
       // do something amazing here
       var selectedValue = $(this).val();
       console.log(selectedValue);

       if(selectedValue === "Apartment"){
         $('#apartment-extras').css('display', 'block');
         $('input[name="beds"]').attr('required', true);
         $('input[name="bath"]').attr('required', true);
         $('input[name="area"]').attr('required', true);

       }else{
           $('#apartment-extras').css('display', 'none');
           $('input[name="beds"]').attr('required', false);
           $('input[name="bath"]').attr('required', false);
           $('input[name="area"]').attr('required', false);
       }
     });
  });

  $('#select-type').bind("change keyup",function() {
     $(this).find(":selected").each(function () {
       // do something amazing here
       var selectedValue = $(this).val();
       console.log(selectedValue);

       if(selectedValue === "Rent"){
         $('#price-label').text("Price ($) / Month");
         $('#price-input').attr("placeholder","Price ($) / Month");
         $('#rent-extras').css('display', 'flex');
         $('input[name="from-date"]').attr('required', true);
         $('input[name="to-date"]').attr('required', true);
       }else{
          $('#price-label').text("Price ($)");
          $('#price-input').attr("placeholder","Price ($)");
           $('#rent-extras').css('display', 'none');
           $('input[name="from-date"]').attr('required', false);
           $('input[name="to-date"]').attr('required', false);
       }
     });
  });

});
