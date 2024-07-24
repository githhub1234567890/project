s = "";
//! s = song //!
playing = 0;
time = 0;
leftWristx = 0;
leftWristy = 0;
scoreL = 0;
scoreR = 0;
function preload()
{
    s = loadSound("music.mp3")
}
function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    posenet=ml5.poseNet(video, modelLoaded);
    posenet.on("pose", gotPoses);
}

function modelLoaded(){
    console.log("posey started");
}


function gotPoses(results){
    if (results.length>0){
        console.log(results);
        leftWristx = results[0].pose.leftWrist.x;
        leftWristy = results[0].pose.leftWrist.y;
        scoreL = results[0].pose.keypoints[9].score;
        scoreR = results[0].pose.keypoints[10].score;
    }
}



function draw() {
    image(video, 0, 0, 600, 500);
    time = s.duration();
    time =Math.floor(time/60)
    document.getElementById("timeleft").innerHTML = time;
    fill(255, 0, 0);
    stroke(255, 0, 0);
    if (scoreL > 0.2){
        circle(leftWristx, leftWristy, 20);
        numberLeftY = Number(leftWristy);
        remove = floor(numberLeftY);
        volume = remove/500
        document.getElementById("volume").innerHTML = "volume= "+volume;
        s.setVolume(volume);
    }
}

function play(){
    if(playing == 0){
        s.play();
        playing = 1;
        document.getElementById("button").innerHTML = "Pause";
    }else if(playing == 1){
        s.pause();
        playing = 0;
        document.getElementById("button").innerHTML = "Play";
    }
}
