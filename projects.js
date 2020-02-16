window.onload = function () 
{
    loadJSON(function (response) 
    {
        $.get("project.html", function (data) 
        {
            processProjects(response, data);
        });
    });
}

function processProjects(jsonData, htmlData)
{
    const projectTemplate = new DOMParser().parseFromString(htmlData, "text/html");
    let json = JSON.parse(jsonData);

    for (let i = 0; i < json.projects.length; i++) 
    {
        let project = json.projects[ i ];

        projectTemplate.getElementById("projectImage").src = project.image;
        projectTemplate.getElementById("projectTitle").innerText = project.title;
        projectTemplate.getElementById("projectDiscription").innerText = project.discription;
        projectTemplate.getElementById("projectButton").innerText = project.buttonText;
        projectTemplate.getElementById("projectButton").href = project.buttonLink;

        let newProject = document.importNode(projectTemplate.body.firstElementChild, true);

        document.getElementById("project").appendChild(newProject);
    }
}

function loadJSON(callback)
{
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'projects.json', true);
    xobj.onreadystatechange = function () 
    {
        if (xobj.readyState == 4 && xobj.status == "200") 
        {
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}