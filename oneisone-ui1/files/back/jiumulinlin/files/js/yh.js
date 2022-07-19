
$(function () {
    $("#box").on('mouseenter','.n_case',function(){
        $(this).find('.list_eye').css('display','block');
    }).on('mouseleave','.n_case',function(){
        $(this).find('.list_eye').css('display','none');
    });
});
