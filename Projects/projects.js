let pageCount = 0;
let currentPage = 0;

let ItemsPerPage = 12;
let projects;
let dividors;
let page;

$(document).ready(function () 
{
    $.getJSON('projects.json', function (data)
    {
        let items = 200;

        page = document.getElementById("page");

        data.Projects.forEach(element =>
        {
            if (items >= ItemsPerPage)
            {
                pageCount += 1;

                var li = document.createElement("li");
                li.className = "page-item";
                var a = document.createElement("a");
                a.className = "page-link pallet-button";
                a.innerText = pageCount;
                li.appendChild(a);

                document.getElementById("pageNumbers").appendChild(li);

                items = 0;
            }

            var project = document.createElement("div");
            project.className = "col project pallet-card";

            var img = document.createElement("img");
            img.className = "project-img";
            img.src = element.Path + "Thumbnail.png";
            project.appendChild(img);


            var container = document.createElement("div");
            container.className = "mx-auto pl-2 pr-2 pb-2 d-flex text";

            var title = document.createElement("p");
            title.className = "project-text font-weight-bold flex-fill title pallet-title";
            title.innerText = element.Title;
            container.appendChild(title);

            var tag = document.createElement("p");
            tag.className = "project-text flex-fill text-right pallet-paragraph";
            tag.innerText = element.Tags.split(",")[ 2 ];
            container.appendChild(tag);

            project.appendChild(container);


            var path = document.createElement("div");
            path.hidden = true;
            path.id = "path";
            path.innerText = element.Path;
            project.appendChild(path);

            page.appendChild(project);

            items++;
        });

        $(".prev").click(function ()
        {
            if (currentPage > 0)
            {
                currentPage--;
            }
            ShowPage(currentPage);
        });

        $(".next").click(function ()
        {
            if (currentPage < pageCount - 1)
            {
                currentPage++;
            }
            ShowPage(currentPage);
        });

        $("#pagin ul a").click(function (e)
        {
            e.preventDefault();
            currentPage = $(this).parent().index();
            ShowPage(currentPage);
        });

        $(".project-img").click(function (e)
        {
            e.preventDefault();
            window.location.href = this.parentElement.querySelector("#path").innerText;
        });

        projects = document.getElementById("page").getElementsByClassName("project");

        ShowPage(currentPage);
    });

    let t = document.getElementsByClassName("page-link");

    for (let i = 0; i < t.length; i++)
    {
        t[ i ].addEventListener("dblclick", event => event.preventDefault());
    }
});

ShowPage = function (pagination)
{
    let shown = 0;
    for (let i = 0; i < projects.length; i++)
    {
        projects[ i ].hidden = true;

        if (projects[ i ].classList.contains("hide") == false)
        {
            if (i >= pagination * ItemsPerPage)
            {
                if (shown % 4 == 3)
                {
                    var divider = document.createElement("div");
                    divider.className = "w-100"
                    page.appendChild(divider);
                    projects[ i ].after(divider);
                }

                if (shown < ItemsPerPage)
                {
                    projects[ i ].hidden = false;
                }
                shown++;
            }
        }
    }

    $("#pagin li").removeClass("pallet-active").eq(pagination).addClass("pallet-active");
}

Searchbar = function ()
{
    let input = document.getElementById("search").getElementsByTagName("input")[ 0 ].value.toUpperCase();

    for (let i = 0; i < projects.length; i++)
    {
        let p = projects[ i ].getElementsByClassName("text")[ 0 ].getElementsByClassName("title")[ 0 ];

        let txtValue = (p.textContent || p.innerText).toUpperCase();

        if (txtValue.indexOf(input) !== -1)
        {
            projects[ i ].classList.remove("hide");
        }
        else
        {
            projects[ i ].classList.add("hide");
        }
    }

    ShowPage(0);
}