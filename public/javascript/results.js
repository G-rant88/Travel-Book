$(function () {
    $(".button-collapse").sideNav();

    // changes heart icon from unliked to like, vice versa
    $('.like-btn').click(function (event) {
        event.preventDefault();

        if ($(this).attr('data-status') === 'unliked') {
            $(this).attr('data-status', 'liked');
            $(this).html('<i class="material-icons heart">favorite</i>');
            // add result to liked list
            var resultInfo = {
                name: $(this).attr('data-name'),
                price: $(this).attr('data-price'),
                rating: $(this).attr('data-rating'),
                categories: $(this).attr('data-categories')
            }
            // display dollar signs according to price scale
            var dollarSigns = '';
            for (var i=0; i < resultInfo.price; i++) {
                dollarSigns += '$';
            }
            var name = $(this).attr('data-name');
            var resultItem = 'Name: ' + resultInfo.name + '<br>' + 'Price: ' + dollarSigns + '<br>' + 'Rating: ' + resultInfo.rating + '<br>' + 'Category: ' + resultInfo.categories + '<br>';
            console.log(resultItem);
            $('#slide-out').append('<li>' + resultItem + '</li><hr>');
        }
        else {
            $(this).attr('data-status', 'unliked');
            $(this).html('<i class="material-icons heart">favorite_border</i>');
            // remove result from liked list
        }
    });
});