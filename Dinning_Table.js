Status = "";
Dinning_Table_image = "";
objects = [];

function preload(){
    Dinning_Table_image = loadImage("Dinning_Table.jpg");
}

function setup(){
    canvas = createCanvas(640,350);
    canvas.position(315,200);
    object_Detector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded!");
    Status = true;
    object_Detector.detect(Dinning_Table_image,gotResults);
}

function gotResults(error,results){
    if(error){
        console.error(error);
    }
    console.log(results);
    objects = results;
}

function draw(){
    image(Dinning_Table_image,0,0,640,350);
    if(status != ""){
        for(i =0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Objects Detected";

            fill("#fc0303");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%",objects[i].x, objects[i].y);
            noFill();
            stroke("#fc0303");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}