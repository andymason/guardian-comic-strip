var stage = new createjs.Stage("strip");
// this lets our drag continue to track the mouse even when it leaves the canvas:
// play with commenting this out to see the difference.
stage.mouseMoveOutside = true;
stage.snapToPixelEnabled = true;

var bgRedClouds = new Image();
bgRedClouds.src = 'images/bg_red_clouds.jpg';


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

    var bubbleText = new createjs.Text("This is some sample test that should spill over onto some new lines.", "bold 14px Arial", "#000");
    bubbleText.textAlign = "left";
    bubbleText.lineWidth = 180;
    bubbleText.name = 'text';
    bubbleText.x = -80;
    bubbleText.y = -40;



    var bubbleImg = new createjs.Bitmap("images/bubble1.png");
    bubbleImg.x = -100;
    bubbleImg.y = -70;

    var bubbleDrag = new createjs.Container();
    bubbleDrag.x  = 100;
    bubbleDrag.y = 100;
    bubbleDrag.addChild(bubbleImg, bubbleText);

    stage.addChild(background, bubbleDrag, frame);


    bubbleDrag.on('dblclick', function(event) {
        console.log(event, this);
        event.currentTarget.getChildByName('text').text = prompt('Enter text');
        stage.update();
    })

    bubbleDrag.on("pressmove",function(evt) {
        // currentTarget will be the container that the event listener was added to:
        evt.currentTarget.x = evt.stageX;
        evt.currentTarget.y = evt.stageY;
        // make sure to redraw the stage to show the change:
        stage.update();   
    });




    stage.update();
    createjs.Ticker.on("tick", stage)
}
