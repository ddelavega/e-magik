$(document).ready(function () {
    $("a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();

            var hash = this.hash;

            $('html, body, .wrapper').animate({
                scrollTop: $(hash).offset().top
            }, 600, function () {

                window.location.hash = hash;
            });
        }
    });
});