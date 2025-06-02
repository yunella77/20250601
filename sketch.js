let video;
let handpose;
let predictions = [];

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(640, 480);
  // video.hide(); // 先註解這行

  handpose = ml5.handpose(video, modelReady);
  handpose.on("predict", results => {
    predictions = results;
  });
}

function modelReady() {
  console.log("Handpose model ready!");
}

function draw() {
  background(200);
  image(video, 0, 0, width, height);
}
