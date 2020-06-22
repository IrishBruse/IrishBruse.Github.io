$(function ()
{  // $(document).ready shorthand
    $('.monster').fadeIn('slow');
});

$(document).ready(function ()
{
    fadeIn();
    /* Every time the window is scrolled ... */
    $(window).scroll(function ()
    {
        fadeIn();
    });

});

function fadeIn()
{
    /* Check the location of each desired element */
    $('.fade-in').each(function (i)
    {
        var bottom_of_object = $(this).position().top;
        var bottom_of_window = $(window).scrollTop() + $(window).height();

        if (bottom_of_window > bottom_of_object)
        {
            $(this).animate({ 'opacity': '1' }, 1500);
        }
    });
}