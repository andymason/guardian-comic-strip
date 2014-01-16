var stage = new createjs.Stage("strip");

stage.canvas.onmousedown = function(event) {
    event.preventDefault();
}

// this lets our drag continue to track the mouse even when it leaves the canvas:
// play with commenting this out to see the difference.
stage.mouseMoveOutside = true;
stage.snapToPixelEnabled = true;

var bgRedClouds = new Image();
bgRedClouds.src = 'images/bg_red_clouds.jpg';

var queenImg = new Image();
queenImg.src = 'images/queen.png';

var cameronImg = new Image();
cameronImg.src = 'images/cameron.png';

function addDragImg(img, _x, _y, isFlipped) {
    var imgContainer = new createjs.Container();
    imgContainer.x = (_x === undefined) ? 100 : _x;
    imgContainer.y = (_y === undefined) ? 100 : _y;
    var imgObj = new createjs.Bitmap(img);
    imgObj.x = -50;
    imgObj.y = -100;
    imgObj.scaleX = (isFlipped) ? -1 : 1;
    img.regX = 100;
    imgObj.name = 'image';
    imgContainer.addChild(imgObj);
    
    imgContainer.on('pressmove', function(evt) {
        evt.currentTarget.x = evt.stageX;
        evt.currentTarget.y = evt.stageY;
        stage.update();   
    });

    imgObj.on('dblclick', function(event) {
        event.currentTarget.x += event.currentTarget.image.width * event.currentTarget.scaleX;
        event.currentTarget.scaleX = event.currentTarget.scaleX * -1;
    })

    stage.addChildAt(imgContainer, 1);
    stage.update();
}


function addQueen() {
    addDragImg(queenImg);
}

var queenBtn = document.querySelector('#addQueen');
queenBtn.addEventListener('click', addQueen, false);


var bgClouds = new Image();
bgClouds.onload = render;
bgClouds.src = 'images/bg_clouds.jpg';



var background = new createjs.Bitmap("images/bg_clouds.jpg");

var bgBtn = document.querySelector('#background');
bgBtn.addEventListener('click', function() {
    background.image = bgRedClouds;
    stage.update();
});

var frame = new createjs.Container();

var border = new createjs.Shape();
border.graphics.beginStroke('#000').drawRect(1, 1, stage.canvas.width-2, stage.canvas.height-2);
border.name = "border";


var col1 = new createjs.Shape();
col1.graphics.beginStroke('#000').beginFill('#FFF').drawRect(305, -1, 10, stage.canvas.height+2);
col1.name = "col1";

var col2 = new createjs.Shape();
col2.graphics.beginStroke('#000').beginFill('#FFF').drawRect(620, -1, 10, stage.canvas.height+2);
col2.name = "col1";

frame.addChild(border, col1, col2);


function render() {

    var bubbleText = new createjs.Text("This is some sample test that should spill over onto some new lines.", "normal 16px 'Gloria Hallelujah', cursive", "#000");
    bubbleText.textAlign = "left";
    bubbleText.lineWidth = 180;
    bubbleText.name = 'text';
    bubbleText.x = -75;
    bubbleText.y = -55;

    var hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#fff").drawRect(-80 , -50, 150,60));
    bubbleText.hitArea = hitArea;


    var bubbleImg = new createjs.Bitmap("images/bubble1.png");
    bubbleImg.x = -100;
    bubbleImg.y = -70;

    var bubbleDrag = new createjs.Container();
    bubbleDrag.x  = 150;
    bubbleDrag.y = 70;
    bubbleDrag.addChild(bubbleImg, hitArea, bubbleText);

    stage.addChild(background, bubbleDrag, frame);


    hitArea.on('dblclick', function(event) {
        var userText = prompt('Enter text');
        if (userText)
            bubbleText.text = userText;
        stage.update();
    });

    bubbleImg.on('dblclick', function(event) {
        event.currentTarget.x += event.currentTarget.image.width * event.currentTarget.scaleX;
        event.currentTarget.scaleX = event.currentTarget.scaleX * -1;
        stage.update();
    })

    bubbleDrag.on("pressmove",function(evt) {
        // currentTarget will be the container that the event listener was added to:
        evt.currentTarget.x = evt.stageX;
        evt.currentTarget.y = evt.stageY;
        // make sure to redraw the stage to show the change:
        stage.update();   
    });


    addDragImg(cameronImg, 10, 200);
    addDragImg(queenImg, 360, 220, true);

    stage.update();
    createjs.Ticker.on("tick", stage)
}
