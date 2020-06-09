class Snake
{
    headPosition;
    bodyParts;
    movementDirection;
    maxSize;

    dead;

    constructor()
    {
        this.headPosition = createVector(floor(random(20)), floor(random(20)));
        this.bodyParts = [];
        this.maxSize = 2;
        this.movementDirection = random([ createVector(0, 1), createVector(0, -1), createVector(1, 0), createVector(-1, 0) ]);
        this.dead = false;
    }

    update()
    {
        if (this.headPosition.x < 0 || this.headPosition.x >= GRID_WIDTH || this.headPosition.y < 0 || this.headPosition.y >= GRID_HEIGHT)
        {
            this.dead = true;
        }

        for (let i = 0; i < this.bodyParts.length; i++)
        {
            if (this.headPosition.equals(this.bodyParts[ i ]) == true)
            {
                this.dead = true;
                break;
            }
        }

        if (this.dead == false)
        {
            this.bodyParts.push(this.headPosition.copy());
            if (this.bodyParts.length > this.maxSize)
            {
                this.bodyParts.shift();
            }
            this.headPosition.add(this.movementDirection);
        }
    }

    draw()
    {
        //Head part
        strokeWeight(2);
        stroke(128);

        if (this.dead == true)
        {
            fill(255, 128, 128);
        }
        else
        {
            fill(255);
        }

        let headWorldPosition = ArrayToScreenPosition(this.headPosition.x, this.headPosition.y);
        square(headWorldPosition.x + 5, headWorldPosition.y + 5, 30);

        //Body parts
        strokeWeight(25);
        if (this.dead == true)
        {
            stroke(255, 128, 128);
        }
        else
        {
            stroke(255);
        }
        strokeCap(PROJECT);

        let lastPart;
        if (this.bodyParts.length > 0)
        {
            let t = ArrayToScreenPosition(this.bodyParts[ this.bodyParts.length - 1 ].x, this.bodyParts[ this.bodyParts.length - 1 ].y);
            line(t.x + 20, t.y + 20, headWorldPosition.x + 20, headWorldPosition.y + 20);
        }

        for (let i = 0; i < this.bodyParts.length; i++)
        {
            let bodyPartWorldPosition = ArrayToScreenPosition(this.bodyParts[ i ].x, this.bodyParts[ i ].y);

            if (i > 0)
            {
                line(bodyPartWorldPosition.x + 20, bodyPartWorldPosition.y + 20, lastPart.x + 20, lastPart.y + 20);
            }

            lastPart = bodyPartWorldPosition;
        }
    }

    input()
    {
        if (keyCode === LEFT_ARROW || key == "a")
        {
            this.movementDirection = createVector(-1, 0);
        }
        else if (keyCode === RIGHT_ARROW || key == "d")
        {
            this.movementDirection = createVector(1, 0);
        }
        else if (keyCode === UP_ARROW || key == "w")
        {
            this.movementDirection = createVector(0, -1);
        }
        else if (keyCode === DOWN_ARROW || key == "s")
        {
            this.movementDirection = createVector(0, 1);
        }
    }
}