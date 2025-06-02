let video;
let facemesh;
let predictions = [];

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  facemesh = ml5.facemesh(video, modelReady);
  facemesh.on("predict", results => {
    predictions = results;
  });
}

function modelReady() {
  console.log("Facemesh model ready!");
}

function draw() {
  image(video, 0, 0, width, height);

  if (predictions.length > 0) {
    const keypoints = predictions[0].scaledMesh;

    // 範例：畫出鼻子與左眼、右眼
    fill(0, 255, 0);
    noStroke();

    // 鼻尖：168，左眼：33，右眼：263
    ellipse(keypoints[168][0], keypoints[168][1], 10); // 鼻尖
    ellipse(keypoints[33][0], keypoints[33][1], 10);   // 左眼
    ellipse(keypoints[263][0], keypoints[263][1], 10); // 右眼
  }
}
