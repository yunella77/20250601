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
  console.log(video);
  image(video, 0, 0, width, height);
  drawHands();
}

function drawHands() {
  for (let i = 0; i < predictions.length; i++) {
    const hand = predictions[i];
    // palmBase 是手掌中心點
    const palm = hand.annotations.palmBase[0];
    fill(255, 0, 0);
    noStroke();
    ellipse(palm[0], palm[1], 20, 20);

    // 顯示左右手資訊
    fill(0);
    textSize(16);
    text(hand.handInViewConfidence > 0.8 ? (hand.handedness === "Left" ? "左手" : "右手") : "", palm[0] + 10, palm[1]);
  }
}
