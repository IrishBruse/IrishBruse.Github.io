let pageCount;

let ItemsPerPage = 16;

$(document).ready(function () 
{
    $.getJSON('projects.json', function (data)
    {
        let items = 200;
        var page;
        data.Projects.forEach(element =>
        {
            if (items >= ItemsPerPage)
            {
                page = document.createElement("div");
                page.className = "row page";
                document.getElementById("pages").appendChild(page);
                items = 0;
            }

            var project = document.createElement("div");
            project.className = "col-md-3 project";

            var img = document.createElement("img");
            img.className = "project-img border rounded-10 raise-up";
            img.id = "projectImage";
            img.src = element.Path + "Thumbnail.png";
            project.appendChild(img);


            var container = document.createElement("div");
            container.className = "mx-auto d-flex";

            var title = document.createElement("p");
            title.className = "project-text font-weight-bold flex-fill";
            title.innerText = element.Title;
            container.appendChild(title);

            var tag = document.createElement("p");
            tag.className = "project-text flex-fill text-right";
            tag.innerText = element.Tags.split(",")[ 0 ];
            container.appendChild(tag);

            project.appendChild(container);


            var path = document.createElement("div");
            path.className = "hide";
            path.id = "path";
            path.innerText = element.Path;
            project.appendChild(path);

            page.appendChild(project);

            items++;
        });

        pageCount = $(".page").length;

        for (let i = 0; i < pageCount; i++)
        {
            var li = document.createElement("li");
            li.className = "page-item page-number";
            var a = document.createElement("a");
            a.className = "page-link ";
            a.innerText = i + 1;
            li.appendChild(a);

            document.getElementById("pageNumbers").appendChild(li);
        }

        $(".prev").click(function ()
        {
            showPage($("#pagin ul .active").index() - 1);
        });

        $(".next").click(function ()
        {
            showPage($("#pagin ul .active").index() + 1);
        });

        $("#pagin ul a").click(function (e)
        {
            e.preventDefault();
            showPage($(this).parent().index());
        });

        $(".project-img").click(function (e)
        {
            e.preventDefault();
            console.log(this.parentElement);

            window.location.href = this.parentElement.querySelector("#path").innerText;
        });

        showPage(0);
    });

    let t = document.getElementsByClassName("page-link");

    for (let i = 0; i < t.length; i++)
    {
        t[ i ].addEventListener("dblclick", event => event.preventDefault());
    }
});

showPage = function (pagination)
{
    if (pagination < 0 || pagination > pageCount - 1)
    {
        return;
    }

    $(".page").hide().eq(pagination).show();
    $("#pagin li").removeClass("active").eq(pagination).addClass("active");
}