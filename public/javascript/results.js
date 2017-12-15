$(function () {
    $(".button-collapse").sideNav();

    // changes heart icon from unliked to like, vice versa
    $('.like-btn').click(function (event) {
        event.preventDefault();

        if ($(this).attr('data-status') === 'unliked') {
            $(this).attr('data-status', 'liked');
            $(this).html('<i class="material-icons heart">favorite</i>');
            // add result to liked list
                // stored data to display in 
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
            // display rating according to rating scale
            var stars = '';
            var count = 0;
            // whole stars
            for (var i=0; i < resultInfo.rating; i++) {
                count++;
                stars += '<i class="material-icons">star</i>';
            }
            // fill in remaining scale with empty stars
            if (count < 5) {
                for (var i=0; i < (5-count); i++) {
                    stars += '<i class="material-icons">star_border</i>';
                }
            }
            var resultItem = 'Name: ' + resultInfo.name + '<br>' + 'Price: ' + dollarSigns + '<br>' + 'Rating: ' + stars + '<br>' + 'Category: ' + resultInfo.categories + '<br>';
            $('#slide-out').append('<li>' + resultItem + '</li><hr>');
        }
        else {
            $(this).attr('data-status', 'unliked');
            $(this).html('<i class="material-icons heart">favorite_border</i>');
            // remove result from liked list
        }
    });
});