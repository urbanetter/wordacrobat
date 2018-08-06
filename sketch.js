

var simple = {
    width: 18,
    height: 18,
    canvasWidth: 540,
    canvasHeight: 540,
    minWordLength: 4,
    maze: [
        [1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1],
        [1,0,0,1,0,0,1,0,1,0,0,0,1,0,0,0,0,1],
        [1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,1,1,1],
        [1,0,0,1,0,0,1,0,1,0,0,0,1,0,0,0,0,1],
        [1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1],
        [1,0,0,1,0,0,1,0,0,0,1,0,1,0,1,0,0,1],
        [1,1,1,1,0,1,1,1,1,0,1,0,0,0,1,1,1,1],
        [1,0,0,1,0,0,0,0,1,0,1,0,1,0,1,0,0,1],
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
    charsDefault: {},
    current: false,
    steps: 0,
    batch: 50,
}

var hard = {
    width: 14,
    height: 14,
    canvasWidth: 560,
    canvasHeight: 560,
    minWordLength: 7,
    maze: [
        [0,0,1,1,1,1,1,1,1,0,0,0,0,0],
        [0,0,1,0,1,0,1,0,0,0,0,0,0,0],
        [1,1,1,1,1,1,1,0,0,0,0,0,0,0],
        [1,0,1,1,1,1,1,1,1,0,0,0,0,0],
        [1,1,1,1,1,1,1,0,0,0,0,0,0,0],
        [1,0,1,1,1,1,1,1,1,0,1,0,0,0],
        [1,1,1,1,1,1,1,0,1,0,1,0,0,1],
        [1,0,0,1,0,1,0,1,1,1,1,1,1,1],
        [1,0,0,1,0,1,1,1,1,1,1,1,0,1],
        [0,0,0,0,0,0,0,1,1,1,1,1,1,1],
        [0,0,0,0,0,1,1,1,1,1,1,1,0,1],
        [0,0,0,0,0,0,0,1,1,1,1,1,1,1],
        [0,0,0,0,0,0,0,1,0,1,0,1,0,1],
        [0,0,0,0,0,1,1,1,1,1,1,1,0,0],
    ],
    words: [
        "aerztin", "alraune", "antares", "ausfall", "austral", "aventin",
        "beklagt", "benefiz", "buerste", "grantig", "hausrat", "hebamme",
        "marilyn", "mausern", "mindern", "musisch", "parnger", "phaeake",
        "rusalka", "satteln", "schauer", "spontan", "sprosse", "sprudel"
    ],
    slots: [],
    charsDefault: {"4/0": "s"},
    current: false,
    steps: 0,
    batch: 100000,
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
    game = hard;

    createCanvas(game.canvasWidth + 1, game.canvasHeight + 1)
    textSize(24)
    textAlign(CENTER)


    findSlots();
    game.slots.sort(function(a,b) {
        return b.length - a.length;
    })
    game.words.sort(function(a,b) {
        return b.length - a.length;
    });

    game.chars = Object.assign({}, game.charsDefault);
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

function createDecisionNode(parent) {
    var wordIndex = (parent) ? parent.wordIndex + 1 : 0;
    var word = game.words[wordIndex];
    return {
        word: word,
        possibilities: game.slots.filter(function(slot) {
            return word.length == slot.length
        }).filter(function(slot) {
            return canWriteInSlot(slot, word)
        }),
        wordIndex: wordIndex,
        parent: parent,
        choosen: false
    }
}

function mouseClicked() {

    if (!game.current) {
        game.current = createDecisionNode(false);
        game.root = game.current;
    }

    var step = 0;

    while (step < game.batch) {

        var node = game.current;

        if (node.wordIndex == game.words.length - 1) {
            console.log("done in", game.steps, "steps");
            return;
        }

        game.steps++;

        if (node.possibilities.length) {
            node.choosen = node.possibilities[0];
            writeInSlot(node.choosen, node.word);
            node.next = createDecisionNode(node);
            game.current = node.next;    
        } else {
            // no future, back up
            node.parent.possibilities.splice(node.parent.possibilities.indexOf(node.parent.choosen), 1);
            node.parent.choosen = false;
            game.current = node.parent;
            game.chars = Object.assign({}, game.charsDefault);
            replaySteps(game.root);
        }
        step++;
    }
    console.log("steps", game.steps);
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

function canWriteInSlot(slot, word) {
    var x = slot.x, y = slot.y;
    return word.split("").every(function(char) {
        if (typeof(game.chars[y + "/" + x]) !== 'undefined' && game.chars[y + "/" + x] != char) {
            return false;
        }
        if (slot.isHorizontal) {
            x++;
        } else {
            y++;
        }
        return true;
    });
}

function replaySteps(node) {
    if (node.choosen) {
        writeInSlot(node.choosen, node.word);
        replaySteps(node.next);        
    }
}

function draw() {
    background(255);

    var squareWidth = (width - 1) / game.width;
    var squareHeight = (height - 1) / game.height;

    for (var y = 0; y < game.height; y++) {
        for (var x = 0; x < game.width; x++) {
            if (game.maze[y][x] == 1) {
                fill(230);
                rect(x * squareWidth, y * squareHeight, squareWidth, squareHeight)
                fill(0)
                if (typeof(game.chars[y + "/" + x]) != 'undefined') {
                    text(game.chars[y + "/" + x].toUpperCase(), x * squareWidth + 15, y * squareHeight + squareHeight - 5)    
                }                
            }
        }
    }
}