let handpose;
let hands = [];

function setup() {
  createCanvas(480, 640);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  handpose = ml5.handpose(video, () => {
    console.log("Handpose model ready!");
  });

  handpose.on("predict", results => {
    hands = results;
  });
}

function draw() {
  image(video, 0, 0, width, height);

  // 如果偵測到手
  for (let hand of hands) {
    for (let i = 0; i < hand.landmarks.length; i++) {
      let [x, y, z] = hand.landmarks[i];
      fill(0, 255, 0);
      noStroke();
      ellipse(x, y, 10);
    }

    // 抓住判定：拇指尖 (4) 跟 食指尖 (8) 接近
    let thumbTip = hand.landmarks[4];
    let indexTip = hand.landmarks[8];
    let d = dist(thumbTip[0], thumbTip[1], indexTip[0], indexTip[1]);
    if (d < 30) {
      fill(255, 0, 0);
      textSize(32);
      text("抓到了！", 10, 30);
    }
  }
}
