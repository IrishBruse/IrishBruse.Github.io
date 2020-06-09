$.get("navigation.html", function (data)
{
    $("#nav-placeholder").replaceWith(data);
});

$(document).ready(function() 
{   
    $( ".raise-up" ).hover(
        function() {
          $(this).addClass('shadow-lg').css('cursor', 'pointer'); 
        }, function() {
          $(this).removeClass('shadow-lg');
        }
      );
});