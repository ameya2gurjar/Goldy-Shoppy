 $("#addRequest").click(function(){
    $(".requestForm").addClass("is-active");
});

$("#closeRequestForm").click(function(){
    $(".requestForm").removeClass("is-active");
})

$("#saveRequest").click(function()){
    $(".requestForm").removeClass("is-active");
    //Send it to database
}
