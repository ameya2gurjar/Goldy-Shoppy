$(document).ready(function() {
    // On refresh check if there are values selected
    if (localStorage.selectVal1) {
            // Select the value stored
        $('#select-category').val( localStorage.selectVal1 );
    }
    
    if (localStorage.selectVal2) {
        $('#select-sell-type').val( localStorage.selectVal2 );
    }
});

// On change store the value
$('#select-category').on('change', function(){
    var currentVal1 = $(this).val();
    localStorage.setItem('selectVal1', currentVal1 );
       
});

$('#select-sell-type').on('change', function(){
    var currentVal2 = $(this).val();
    localStorage.setItem('selectVal2', currentVal2 );
});

