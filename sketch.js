let video;
let poseNet;
let poses = [];
let leftWrist = null;
let rightWrist = null;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);
}

function draw() {
  image(video, 0, 0, width, height);
}
