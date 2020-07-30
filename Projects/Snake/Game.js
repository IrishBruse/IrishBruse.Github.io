let grid = [];

let GRID_WIDTH = 20;
let GRID_HEIGHT = 20;

let BOX_SIZE = 40;

let snake;
let food;

let updateTimer = 0;

let canvas;

let score;

let div;

function setup()
{
    div = document.getElementById('sketch-div');
    canvas = createCanvas(100, 100);
    canvas.parent('sketch-div');
    canvas.mouseClicked(mouseClicked);

    windowResized()


    for (let x = 0; x < GRID_WIDTH; x++)
    {
        grid[ x ] = [];
    }

    for (let x = 0; x < GRID_WIDTH; x++)
    {
        for (let y = 0; y < GRID_HEIGHT; y++)
        {
            grid[ x ][ y ] = 0;
        }
    }

    restartGame();
}

function windowResized()
{
    resizeCanvas(div.offsetWidth, div.offsetHeight);
}

function draw()
{
    clear();

    update();

    strokeWeight(2);
    stroke(0);
    fill(10, 10, 10);

    for (let x = 0; x < GRID_WIDTH; x++)
    {
        for (let y = 0; y < GRID_HEIGHT; y++)
        {
            let v = ArrayToScreenPosition(x, y);
            square(v.x, v.y, BOX_SIZE);
        }
    }

    strokeWeight(2);
    stroke(128, 5, 5);
    fill(255, 10, 10);

    let size = floor(BOX_SIZE * 0.6);
    let foodWorldPosition = ArrayToScreenPosition(food.x, food.y);
    square(foodWorldPosition.x + 8, foodWorldPosition.y + 8, size);

    snake.draw();

    strokeWeight(0);
    stroke(0);
    fill(255);
    textSize(50);
    textAlign(CENTER, TOP);
    text("Score: " + score, windowWidth / 2, 0);

    if (snake.dead == true)
    {
        textSize(100);
        strokeWeight(0);
        stroke(0);
        fill(192);
        textAlign(CENTER, BOTTOM);
        text("GAME OVER", windowWidth / 2, windowHeight / 2);

        textSize(50);
        textAlign(CENTER, TOP);
        text("Click to restart!", windowWidth / 2, windowHeight / 2);
    }
}

function update()
{
    if (millis() - updateTimer > 200)
    {
        updateTimer = millis();
        snake.update();

        if (snake.headPosition.equals(food.x, food.y))
        {
            snake.maxSize++; score++;
            food = RandomizeFoodLocation();
        }
    }
}

function ArrayToScreenPosition(x, y)
{
    let xPos = (x * BOX_SIZE) + floor(windowWidth * 0.5) - (BOX_SIZE * 0.5 * GRID_WIDTH);
    let yPos = (y * BOX_SIZE) - BOX_SIZE + floor(windowHeight * 0.5) - (BOX_SIZE * 0.5 * GRID_HEIGHT);
    return createVector(xPos, yPos);
}

function RandomizeFoodLocation()
{
    let result;
    let isValid = false;
    while (isValid == false)
    {
        result = createVector(floor(random(20)), floor(random(20)));
        isValid = true;

        if (result == snake.headPosition)
        {
            isValid = false;
        }

        for (let i = 0; i < snake.bodyParts.length; i++)
        {
            let part = snake.bodyParts[ i ];
            if (part.equals(result))
            {
                isValid = false;
            }
        }
    }

    return result;
}

function keyPressed()
{
    snake.input();
}

function mouseClicked()
{
    if (snake.dead == true)
    {
        restartGame();
    }
}

function restartGame()
{
    snake = new Snake();
    food = RandomizeFoodLocation();
    score = 0;
}