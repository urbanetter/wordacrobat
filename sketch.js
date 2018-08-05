

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
    words: [
        "amos", "asyl", "emil", "gaze", "hari", "kopp", "rhin", "unia",
        "forel", "giger", "immer", "kempf", "muota", "nello", "surer",
        "aladin", "godard", "guisan", "hingis", "hueppi", "rohrer",
        "aktuell", "andress", "ausrede", "lambiel",
        "abgasarm", "allseits", "daeniken", "dreifuss", "inserate", "stielike",
        "meienberg", "osterwald", "sommaruga", "strohsack",
        "fussangeln", "markierung", "martinetti",
        "saintphalle"
    ],
    slots: [],
    chars: [],
    steps: []
}

function isPointInSlots(slots, x, y, horizontal) {
    return slots.filter(function (slot) {
        return slot.isHorizontal == horizontal;
    }).some(function(slot) {
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
    textSize(24)
    textAlign(CENTER)

    findSlots();
    game.slots.sort(function(a,b) {
        return b.length - a.length;
    })
    game.words.sort(function(a,b) {
        return b.length - a.length;
    });
}

function findSlots() {
    for (var y = 0; y < game.height; y++) {
        for (var x = 0; x < game.width; x++) {
            if (!isPointInSlots(game.slots, x, y, true)) {
                var length = slotLength(game.maze, x, y, true);
                if (length >= game.minWordLength) {
                    game.slots.push({
                        x: x,
                        y: y,
                        isHorizontal: true,
                        length: length 
                    })
                }
            }
            if (!isPointInSlots(game.slots, x, y, false)) {
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

function mouseClicked() {
    var word = game.words.shift();
    var slot = game.slots.shift();
    game.steps.push({
        word: word,
        slot: slot
    });
    writeInSlot(slot, word);
}

function writeInSlot(slot, word) {
    var x = slot.x, y = slot.y;
    word.split("").forEach(function(char) {
        game.chars[y + "/" + x] = char;
        if (slot.isHorizontal) {
            x++;
        } else {
            y++;
        }
    });
}

function draw() {
    background(255);

    var squareWidth = width / game.width;
    var squareHeight = height / game.height;

    for (var y = 0; y < game.height; y++) {
        for (var x = 0; x < game.width; x++) {
            if (game.maze[y][x] == 1) {
                rect(x * squareWidth, y * squareHeight, squareWidth, squareHeight)
                if (typeof(game.chars[y + "/" + x]) != 'undefined') {
                    text(game.chars[y + "/" + x].toUpperCase(), x * squareWidth + 15, y * squareHeight + squareHeight - 5)    
                }                
            }
        }
    }
}