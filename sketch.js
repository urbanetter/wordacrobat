

var game = {
    width: 18,
    height: 18,
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

function setup() {
    createCanvas(540, 540)
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