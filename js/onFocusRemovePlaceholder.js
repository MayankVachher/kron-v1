$(function () {

    $('#course-info').data('holder', $('#course-info').attr('placeholder'));

    $('#course-info').focusin(function () {
        $(this).attr('placeholder', '');
    });
    $('#course-info').focusout(function () {
        $(this).attr('placeholder', $(this).data('holder'));
    });


});