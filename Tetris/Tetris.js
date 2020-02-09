let BOX_SIZE = 40;
let BOX_OUTLINE = 1;

let GRID_WIDTH = 10;
let GRID_HEIGHT = 21;

let tiles = new Array(GRID_WIDTH);
let colors = new Array(2);
let dropTimer = 0;

const SPACEBAR = 32;
const KEY_S = 83;

let tetromino;
let savedTetromino = 0;

function setup()
{
    createCanvas(windowWidth, windowHeight);

    tetromino = new Tetromino(1);

    colors[ 0 ] = color(10);
    colors[ 1 ] = color(49, 199, 239);
    colors[ 2 ] = color(247, 211, 8);
    colors[ 3 ] = color(173, 77, 156);
    colors[ 4 ] = color(66, 182, 66);
    colors[ 5 ] = color(239, 32, 41);
    colors[ 6 ] = color(90, 101, 173);
    colors[ 7 ] = color(239, 121, 33);
    colors[ 8 ] = color(248);//cleared

    for (var i = 0; i < tiles.length; i++)
    {
        tiles[ i ] = [];
    }

    for (let x = 0; x < GRID_WIDTH; x++)
    {
        for (let y = 0; y < GRID_HEIGHT; y++)
        {
            tiles[ x ][ y ] = 0;
        }
    }
}

function windowResized()
{
    resizeCanvas(windowWidth, windowHeight);
}

function draw()
{
    background(255);
    strokeWeight(2);
    update();

    for (let x = 0; x < GRID_WIDTH; x++)
    {
        for (let y = 0; y < GRID_HEIGHT; y++)
        {
            let c = color(255);

            if (tetromino.checkTile(x, y) == true)
            {
                c = colors[ tetromino.type ];
            }
            else
            {
                c = colors[ tiles[ x ][ y ] ];
            }

            fill(c);
            stroke(red(c), green(c), blue(c), 0.75);


            let xPos = (x * BOX_SIZE);
            xPos += (BOX_OUTLINE * 0.5);
            xPos += (windowWidth * 0.5);
            xPos -= (BOX_SIZE * 0.5 * GRID_WIDTH);

            square(xPos, (y * BOX_SIZE) + (BOX_OUTLINE * 0.5) - BOX_SIZE + 1, BOX_SIZE - (BOX_OUTLINE * 0.5));
        }
    }
}

function update()
{
    let tetrominoDropSpeed = 1000;

    if (keyIsDown(DOWN_ARROW) == true || keyIsDown(KEY_S) == true)
    {
        tetrominoDropSpeed = 100;
    }

    if (millis() - dropTimer > tetrominoDropSpeed)
    {
        // check collisions
        if (tetromino.checkFallingCollisions() == true)
        {
            placeTetromino();
        }

        tetromino.y++;
        dropTimer = millis();
    }
}

function keyPressed()
{
    if (keyCode === LEFT_ARROW || key == "a")
    {
        tetromino.move(-1);
    }
    else if (keyCode === RIGHT_ARROW || key == "d")
    {
        tetromino.move(+1);
    }
    else if (keyCode === UP_ARROW || key == "w")
    {
        tetromino.rotate(1);
    }
    else if (keyCode === UP_ARROW || key == "c")
    {
        tetromino.rotate(1);
    }
    else if (keyCode === SPACEBAR)
    {
        while (tetromino.checkFallingCollisions() == false)
        {
            tetromino.y++;
        }
        placeTetromino();
    }
    else if (key == "r")
    {
        newTetromino();
    }
}

function placeTetromino()
{
    for (let i = 0; i < tetromino.blocks.length; i++)
    {
        let pos = tetromino.blocks[ i ].add(createVector(tetromino.x, tetromino.y));
        if (pos.x < 0 || pos.x > GRID_WIDTH - 1 || pos.y < 0 || pos.y > GRID_HEIGHT - 1)
        {
            continue;
        }
        tiles[ round(pos.x) ][ round(pos.y) ] = tetromino.type;
    }
    dropTimer = 0;
    newTetromino();
    checkForLines();
}

function checkForLines()
{
    for (let lines = 1; lines < GRID_HEIGHT; lines++)
    {
        let fullLine = true;
        for (let x = 0; x < GRID_WIDTH; x++)
        {
            let block = tiles[ x ][ lines ];
            if (block == 0)
            {
                fullLine = false;
                break;
            }
        }

        if (fullLine == true)
        {
            print("fullLine");
            frameRate(1);
            for (let x = 0; x < GRID_WIDTH; x++)
            {
                const element = array[ x ];

            }
        }
    }
}

function newTetromino()
{
    tetromino = new Tetromino(ceil(random(6)));
}
