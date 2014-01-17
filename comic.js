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

var cloudsImg = new Image();
cloudsImg.src = 'images/bubble1.png';

function addDragImg(img, _x, _y, isFlipped) {
    var imgContainer = new createjs.Container();
    imgContainer.x = (_x === undefined) ? 100 : _x;
    imgContainer.y = (_y === undefined) ? 100 : _y;
    var imgObj = new createjs.Bitmap(img);
    imgObj.x = -(imgObj.getBounds().width /2);
    imgObj.y = -(imgObj.getBounds().height /2);
    if (isFlipped) {
        imgObj.scaleX = (isFlipped) ? -1 : 1;
        imgObj.x *= -1;
    }

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
        stage.update();
    })

    imgContainer.on('click', function(event) {
        stage.setChildIndex(
            event.currentTarget,
            stage.children.length - 2
        );
        //stage.swapChildrenAt(stage.children.length - 1, stage.getChildIndex(frame));
        stage.update();
    });

    //stage.addChildAt(imgContainer, 1);
    stage.addChildAt(imgContainer, stage.children.length - 1);
    stage.update();
}



var bgClouds = new Image();
bgClouds.onload = render;
bgClouds.src = 'images/bg_clouds.jpg';



var background = new createjs.Bitmap("images/bg_clouds.jpg");


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



function addBubble(_text, _x, _y, _img) {
    var img = _img || "images/bubble1.png";
    var bubbleImg = new createjs.Bitmap(img);
    bubbleImg.x = -1 * bubbleImg.getBounds().width /2;
    bubbleImg.y = -1 * bubbleImg.getBounds().height /2;

    var sampleText = [
        'Oh herro. Did you know I\'ve got over eleven goldfish in my bathtub?',
        'OH NOES!!!',
        '...I opened the door and there was blood everywhere',
        'GET OUT OF MY HEAD!',
        'Do you smell poo?',
        'I\'ve tasted human flesh.'
    ];

    var text = (_text === undefined) ? sampleText[Math.floor(sampleText.length * Math.random())] : _text;
    var bubbleText = new createjs.Text(text, "normal 16px 'Gloria Hallelujah', cursive", "#000");
    bubbleText.textAlign = "left";
    bubbleText.lineWidth = 180;
    bubbleText.name = 'text';
    bubbleText.x =  bubbleImg.x + 20;
    bubbleText.y = bubbleImg.y + 20;

    

    var hitArea = new createjs.Shape(
        new createjs.Graphics().beginFill("#FFF").drawRect(
            bubbleImg.x + 20,
            bubbleImg.y + 20,
            bubbleImg.getBounds().width -40,
            bubbleImg.getBounds().height - 50
        )
    );
    //bubbleText.hitArea = hitArea;


    var bubbleDrag = new createjs.Container();
    bubbleDrag.x  = (_x === undefined) ? 100 : _x;
    bubbleDrag.y = (_y === undefined) ? 100 : _y;
    bubbleDrag.addChild(bubbleImg, hitArea, bubbleText);

    hitArea.on('dblclick', updateText);
    bubbleText.on('dblclick', updateText);

    function updateText(event) {
        var userText = prompt('Enter text');
        if (userText)
            bubbleText.text = userText;
        stage.update();
    }

    bubbleDrag.on('click', function(event) {
        stage.setChildIndex(
            event.currentTarget,
            stage.children.length - 2
        );
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

    stage.addChildAt(bubbleDrag, stage.children.length - 1);
    stage.update();
}


function render() {
    stage.addChild(background, frame);
    addDragImg(cameronImg, 60, 200);
    addDragImg(queenImg, 255, 220, true);
    addBubble('WHY ARE YOU STILL HERE DAVID? \n\nHAVEN\'T YOU GOT HOME TO GO TO?', 150, 70);

    stage.update();
}


var faces = document.querySelectorAll('.face');
for (var i=0; i  <  faces.length; i++){
    faces[i].addEventListener('click', function() {
        addDragImg(this.src);
    }, false)
}

var bubbles = document.querySelectorAll('.bubble');
for (var i=0; i  <  bubbles.length; i++){
    bubbles[i].addEventListener('click', function() {
        addBubble(undefined, undefined, undefined, this.src);
    }, false)
} 


WebFont.load({
    google: {
      families: ['Gloria Hallelujah']
    },
    active: function() {
        stage.update();
    }
});


var exportImgPath = document.querySelector('#export_url');
var exportImgLink = document.querySelector('#export_link');
var exportImgTweet = document.querySelector('#export_tweet');

var exportBtn = document.querySelector('#export');
exportBtn.addEventListener('click', imgurUpload, false)

function imgurUpload() {
    //var tmpImg = document.createElement('img');
    var clientId = 'e48f68d422825de';
    var dataURL = stage.canvas.toDataURL('image/png');;
    dataURL = dataURL.replace(/^data:image\/(png|jpg);base64,/, '');

    exportBtn.innerHTML = 'Uploading...';
    exportBtn.setAttribute('disabled', 'disabled');

    $.ajax({
        url: 'https://api.imgur.com/3/image',
        type: 'post',
        headers: {
            'Authorization': 'Client-ID ' + clientId
          },
          data: {
            type: 'base64',
            name: 'guardian-hackday-comic',
            title: 'Guardian Hackday 2014 comic',
            description: 'Guardian Hackday 2014 comic',
            image: dataURL
          },
          dataType: 'json',
          success: function(response) {
              if(response.success) {
                console.log(response);
                var path = 'http://imgur.com/gallery/' + response.data.id;
                exportImgPath.value = path;
                exportImgLink.setAttribute('href', path);
                //window.open('http://imgur.com/gallery/' + response.data.id);

                var tweetLink = 'https://twitter.com/intent/tweet?text=Check%20out%20my%20Guardian%20hack%20day%20comic.&url='
                tweetLink += encodeURIComponent(path);
                exportImgTweet.setAttribute('href', tweetLink);
              }

              exportBtn.innerHTML = 'Export';
              exportBtn.removeAttribute('disabled');
            },
            error: function() {
                exportBtn.innerHTML = 'Export';
              exportBtn.removeAttribute('disabled');
            }
        });
}
