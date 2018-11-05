
var force = 0;

function Body(radius, x, y, mass)
{
    let VelocityX = 0;
    let VelocityY = 0;


    this.Start = function ()
    {
        this.radius = radius;
        this.x = x;
        this.y = y;
        this.mass = mass;
    }

    this.Update = function ()
    {
        x += VelocityX;
        y += VelocityY;
    }

    this.Attract = function (body)
    {
        var vect = createVector(this.x - body.x, this.y - body.y);
        force = (this.mass * body.mass) / vect.magSq();
    }

    this.Draw = function ()
    {
        stroke(255);
        colorMode(HSB, 255);
        fill(255, 180, 255);
        colorMode(RGB, 255);
        ellipse(x + (width / 2), y + (height / 2), radius, radius);
    }
}