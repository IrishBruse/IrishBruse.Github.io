let bodies = [];

function setup()
{
    createCanvas(800, 800);

    var body = new Body(50, 0, 0, 1000);
    bodies.push(body);
    body = new Body(40, 200, 0, 100);
    bodies.push(body);
}

function draw()
{
    background(255);
    for (i = 0; i < bodies.length; i++)
    {
        for (j = 0; j < bodies.length; j++)
        {
            bodies[ i ].Attract(bodies[ j ]);
        }

        bodies[ i ].Update();
        bodies[ i ].Draw();
    }
}

function mousePressed()
{

}