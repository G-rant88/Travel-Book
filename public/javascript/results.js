$(function () {
    $(".button-collapse").sideNav();

    // changes heart icon from unliked to like, vice versa
    $('.like-btn').click(function (event) {
        event.preventDefault();

        if ($(this).attr('data-status') === 'unliked') {
            $(this).attr('data-status', 'liked');
            $(this).html('<i class="material-icons heart">favorite</i>');
        }
        else {
            $(this).attr('data-status', 'unliked');
            $(this).html('<i class="material-icons heart">favorite_border</i>');
        }
    })
});