let video;
let facemesh;
let predictions = [];

function setup() {
  createCanvas(480, 640); 
  video = createCapture(VIDEO);
  video.size(480, 640);
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

// 畫出左手和右手
    stroke(0, 255, 0);
    beginShape();
    for (let i = 0; i < keypoints.length; i++) {
      const x = keypoints[i][0];
      const y = keypoints[i][1];
      vertex(x, y);
    }
    endShape(CLOSE);
// 畫出臉部關鍵點
    stroke(255, 0, 0);
    for (let i = 0; i < keypoints.length; i++) {
      const x = keypoints[i][0];
      const y = keypoints[i][1];
      point(x, y);
    }
  }
}
