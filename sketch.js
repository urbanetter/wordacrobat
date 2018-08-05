

var game = {
    width: 18,
    height: 18,
    minWordLength: 4,
    maze: [
        [1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1],
        [1,0,0,1,0,0,1,0,1,0,0,0,1,0,0,0,0,1],
        [1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,1,1,1],
        [1,0,0,1,0,0,1,0,1,0,0,0,1,0,0,0,0,1],
        [1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1],
        [1,0,0,1,0,0,1,0,0,0,1,0,1,0,1,0,0,1],
        [1,1,1,1,0,1,1,1,1,0,1,0,0,0,1,1,1,1],
        [1,0,0,1,0,0,0,0,1,0,1,0,1,0,1,1,1,1],
        [1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1],
        [0,0,0,0,0,1,0,0,1,0,0,0,1,0,0,0,0,0],
        [1,0,0,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1],
        [1,0,0,0,0,1,0,0,1,0,1,0,1,0,0,0,0,1],
        [1,0,1,0,1,1,1,1,1,0,1,1,1,1,1,1,1,1],
        [1,0,1,0,0,0,0,0,0,0,1,0,0,0,1,0,0,1],
        [1,0,1,0,1,1,1,1,1,1,1,0,1,0,1,1,1,1],
        [1,0,1,0,0,1,0,0,1,0,1,1,1,1,1,0,0,1],
        [1,0,1,0,0,1,0,0,1,0,1,0,1,0,1,0,0,1],
        [1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1] 
    ],
    words: {
        4: ["amos", "asyl", "emil", "gaze", "hari", "kopp", "rhin", "unia"],
        5: ["forel", "giger", "immer", "kempf", "muota", "nello", "surer"],
        6: ["aladin", "godard", "guisan", "hingis", "hueppi", "rohrer"],
        7: ["aktuell", "andress", "ausrede", "lambiel"],
        8: ["abgasarm", "allseits", "daeniken", "dreifuss", "inserate", "stielike"],
        9: ["meienberg", "osterwald", "sommaruga", "strohsack"],
        10: ["fussangeln", "markierung", "martinetti"],
        11: ["saintphalle"]
    },
    slots: []
}

function isPointInSlots(slots, x, y) {
    return slots.some(function(slot) {
        return isPointInSlot(slot, x, y);
    });
}

function isPointInSlot(slot, x, y) {
    if (slot.isHorizontal) {
        return slot.y == y && slot.x <= x && slot.x + slot.length >= x;
    } else {
        return slot.x == x && slot.y <= y && slot.y + slot.length >= y;
    }
}

function slotLength(maze, x, y, horizontal) {
    var length = 0;
    if (horizontal) {
        while (x + length < maze[y].length && maze[y][x + length] == 1) length++;
    } else {
        while (y + length < maze.length && maze[y + length][x] == 1) length++;
    }
    return length;
}

function setup() {
    createCanvas(540, 540)
}

function mouseClicked() {
    // find horizontal slots
    for (var y = 0; y < game.height; y++) {
        for (var x = 0; x < game.width; x++) {
            if (!isPointInSlots(game.slots, x, y)) {
                var length = slotLength(game.maze, x, y, true);
                if (length >= game.minWordLength) {
                    game.slots.push({
                        x: x,
                        y: y,
                        isHorizontal: true,
                        length: length 
                    })
                }
                var length = slotLength(game.maze, x, y, false);
                if (length >= game.minWordLength) {
                    game.slots.push({
                        x: x,
                        y: y,
                        isHorizontal: false,
                        length: length 
                    })
                }
            }
        }
    }
}

function draw() {
    background(255);

    var squareWidth = width / game.width;
    var squareHeight = height / game.height;

    for (var y = 0; y < game.height; y++) {
        for (var x = 0; x < game.width; x++) {
            if (game.maze[y][x] == 1) {
                fill(230)
                rect(x * squareWidth, y * squareHeight, squareWidth, squareHeight)
                //text("" + y + "," + x, x * squareWidth, y * squareHeight + squareHeight)
            }
        }
    }
    
}