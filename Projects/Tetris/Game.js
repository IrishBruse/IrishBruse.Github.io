let BOX_SIZE = 40;

let GRID_WIDTH = 10;
let GRID_HEIGHT = 21;

let tiles = [];
let colors = [];
let dropTimer = 0;
let tetromino;
let tetrominoDropSpeed = 1000;
let savedTetromino;
let score = 0;
let allowInput = true;

const SPACEBAR = 32;
const KEY_S = 83;
const LEFT_SHIFT = 16;

function setup()
{
    div = document.getElementById('sketch-div');
    canvas = createCanvas(10,10);
    canvas.parent('sketch-div');

    windowResized()

    restartGame();

    colors[ 0 ] = color(10);
    colors[ 1 ] = color(49, 199, 239);
    colors[ 2 ] = color(247, 211, 8);
    colors[ 3 ] = color(173, 77, 156);
    colors[ 4 ] = color(66, 182, 66);
    colors[ 5 ] = color(239, 32, 41);
    colors[ 6 ] = color(90, 101, 173);
    colors[ 7 ] = color(239, 121, 33);
}

function windowResized()
{
    resizeCanvas(div.offsetWidth, div.offsetHeight);
}

function draw()
{
    clear();
    strokeWeight(2);
    stroke(0, 0, 0, 128);
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

            let xPos = (x * BOX_SIZE);
            xPos += ceil(windowWidth * 0.5);
            xPos -= (BOX_SIZE * 0.5 * GRID_WIDTH);

            square(xPos, 80 + ((y * BOX_SIZE) - BOX_SIZE + 1), BOX_SIZE);
        }
    }

    strokeWeight(0);
    stroke(0);
    fill(0);

    textAlign(CENTER, CENTER);
    textSize(40);
    text("Score: " + score, windowWidth / 2, 20);

    textAlign(LEFT, TOP);
    textSize(20);
    text("Stored piece", 45, 20);

    if (savedTetromino != null)
    {
        fill(colors[ savedTetromino.type ]);
        for (let i = 0; i < savedTetromino.blocks.length; i++)
        {
            let block = savedTetromino.blocks[ i ];
            square(block.x * BOX_SIZE + 80, block.y * BOX_SIZE + 160, BOX_SIZE);
        }
    }
}

function update()
{
    if (tetromino.y != 0)
    {
        if (keyIsDown(DOWN_ARROW) == true || keyIsDown(KEY_S) == true)
        {
            tetrominoDropSpeed = 100;
        }
        else
        {
            tetrominoDropSpeed = 1000;
        }
    }

    if (millis() - dropTimer > tetrominoDropSpeed)
    {
        if (tetromino.checkFallingCollisions() == true)
        {
            placeTetromino();
        }
        else
        {
            tetromino.y++;
        }

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
        tetromino.rotate(-1);
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
    else if (keyCode === LEFT_SHIFT)
    {
        if (savedTetromino == null)
        {
            savedTetromino = new Tetromino(tetromino.type);
            newTetromino();
        }
        else
        {
            let savedType = tetromino.type;
            loadTetromino(savedTetromino.type);
            savedTetromino = new Tetromino(savedType);
        }
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
    checkForLines();
    newTetromino();
}

function checkForLines()
{
    let numLinesCleared = 0;

    for (let line = 0; line < GRID_HEIGHT; line++)
    {
        let fullLine = true;
        for (let x = 0; x < GRID_WIDTH; x++)
        {
            if (line == 0)
            {
                if (tiles[ x ][ line ] != 0)
                {
                    restartGame();
                }
            }

            if (tiles[ x ][ line ] == 0)
            {
                fullLine = false;
            }
        }

        if (fullLine == true)
        {
            numLinesCleared++;
            for (let x = 0; x < GRID_WIDTH; x++)
            {
                tiles[ x ][ line ] = 0;
            }

            for (let y = line - 1; y >= 0; y--)
            {
                for (let x = 0; x < GRID_WIDTH; x++)
                {
                    tiles[ x ][ y + 1 ] = tiles[ x ][ y ];
                }
            }
        }
    }

    switch (numLinesCleared)
    {
        case 1:
            score += 40;
            break;
        case 2:
            score += 100;
            break;
        case 3:
            score += 300;
            break;
        case 4:
            score += 1200;
            break;
    }
}

function loadTetromino(type)
{
    tetromino = new Tetromino(type);
    dropTimer = millis();
    tetrominoDropSpeed = 10;
}

function newTetromino()
{
    tetromino = new Tetromino(ceil(random(6)));
    dropTimer = millis();
    tetrominoDropSpeed = 10;
}

function restartGame()
{
    for (let x = 0; x < GRID_WIDTH; x++)
    {
        tiles[ x ] = [];
        for (let y = 0; y < GRID_HEIGHT; y++)
        {
            tiles[ x ][ y ] = 0;
        }
    }

    score = 0;

    newTetromino();
}