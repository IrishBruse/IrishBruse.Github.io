$.get("/Navbar/navbar.html", function (data)
{
    $("#nav-placeholder").replaceWith(data);
});