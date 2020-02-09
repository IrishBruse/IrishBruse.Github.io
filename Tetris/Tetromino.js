let type;

let x;
let y;
let rotation;

let blocks;

class Tetromino
{
    constructor(newType)
    {
        this.type = newType;
        this.x = 4;
        this.y = 0;
        this.rotation = 0;
        this.blocks = this.getRotatedShape(0);
    }

    checkTile(posX, posY)
    {
        for (let i = 0; i < this.blocks.length; i++)
        {
            let a = createVector(this.blocks[ i ].x, this.blocks[ i ].y);
            a.add(this.x, this.y);
            let b = createVector(posX, posY);

            if (a.equals(b))
            {
                return true;
            }
        }

        return false;
    }

    getRotatedShape(rotation)
    {
        const I = [ createVector(+0, +0), createVector(+1, +0), createVector(+2, +0), createVector(-1, +0) ];
        const J = [ createVector(+0, +0), createVector(+1, +0), createVector(-1, +0), createVector(-1, -1) ];
        const L = [ createVector(+0, +0), createVector(+1, +0), createVector(-1, +0), createVector(+1, -1) ];
        const O = [ createVector(+0, +0), createVector(+1, +0), createVector(+0, +1), createVector(+1, +1) ];
        const S = [ createVector(+0, +0), createVector(-1, +0), createVector(+0, -1), createVector(+1, -1) ];
        const T = [ createVector(+0, +0), createVector(+1, +0), createVector(-1, +0), createVector(+0, +1) ];
        const Z = [ createVector(+0, +0), createVector(+1, +0), createVector(+0, -1), createVector(-1, -1) ];

        switch (this.type)
        {
            case 1:
                return this.applyRotationToShape(I, rotation);
            case 2:
                return this.applyRotationToShape(J, rotation);
            case 3:
                return this.applyRotationToShape(L, rotation);
            case 4:
                return this.applyRotationToShape(O, rotation);
            case 5:
                return this.applyRotationToShape(S, rotation);
            case 6:
                return this.applyRotationToShape(T, rotation);
            case 7:
                return this.applyRotationToShape(Z, rotation);
        }
    }

    applyRotationToShape(tiles, rotation)
    {
        for (let index = 0; index < tiles.length; index++)
        {
            let v = tiles[ index ];
            if (this.type == 1 || this.type == 4)
            {
                v.sub(0.5, 0.5);
            }

            v.rotate(rotation * HALF_PI);

            if (this.type == 1 || this.type == 4)
            {
                v.add(0.5, 0.5);
            }

            tiles[ index ] = createVector(round(v.x), round(v.y));
        }

        return tiles;
    }

    checkFallingCollisions()
    {
        for (let i = 0; i < this.blocks.length; i++)
        {
            let block = this.blocks[ i ];

            if (this.y + block.y == GRID_HEIGHT - 1)
            {
                return true;
            }
            else if (tiles[ this.x + block.x ][ this.y + block.y + 1 ] != 0)
            {
                return true
            }
        }
        return false;
    }

    move(direction)
    {
        for (let i = 0; i < this.blocks.length; i++)
        {
            let block = createVector(this.blocks[ i ].x + direction + this.x, this.blocks[ i ].y + this.y);

            if (block.x < 0 || block.x > GRID_WIDTH - 1)
            {
                return;
            }

            if (block.x >= 0 && block.x < GRID_WIDTH - 1)
            {
                if (tiles[ block.x ][ block.y ] != 0)
                {
                    return;
                }
            }
        }

        this.x += direction;
    }

    rotate(direction)
    {
        let rotatedBlocks = this.getRotatedShape(this.rotation + direction);

        for (let i = 0; i < rotatedBlocks.length; i++)
        {
            let block = createVector(rotatedBlocks[ i ].x + this.x, rotatedBlocks[ i ].y + this.y);

            if (block.y > GRID_HEIGHT - 1)
            {
                return;
            }

            // kick
            if (block.x > GRID_WIDTH - 1)
            {
                if (this.type == 1 && this.rotation == 3)
                {
                    this.x -= 1;
                }
                this.x -= 1;
                break;
            }
            else if (block.x < 0)
            {
                if (this.type == 1 && this.rotation == 1)
                {
                    this.x += 1;
                }
                this.x += 1;
                break;
            }

            if (block.x >= 0 && block.x <= GRID_WIDTH - 1 && block.y >= 0 && block.y <= GRID_HEIGHT - 1)
            {
                if (tiles[ block.x ][ block.y ] != 0)
                {
                    return;
                }
            }
        }

        this.rotation += direction;
        this.blocks = rotatedBlocks;
    }
}