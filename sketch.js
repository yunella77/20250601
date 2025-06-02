let video;
let handpose;
let predictions = [];

let options = [
  { text: "Photoshop", x: 100, y: 200 },
  { text: "Word", x: 100, y: 280 },
  { text: "ChatGPT", x: 100, y: 360 },
  { text: "Excel", x: 100, y: 440 },
];
let correctAnswer = "ChatGPT";
let selected = false;

function setup() {
  createCanvas(480, 640);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  handpose = ml5.handpose(video, () => {
    console.log("handpose ready!");
  });

  handpose.on("predict", (results) => {
    predictions = results;
  });

  textSize(32);
  textAlign(LEFT, CENTER);
}

function draw() {
  background(220);

  // 水平翻轉視訊畫面
  push();
  translate(width, 0);
  scale(-1, 1);
  image(video, 0, 0, width, height);
  pop();

  // 題目
  fill(0);
  text("哪一個是生成式 AI？", 20, 50);

  // 顯示選項
  for (let opt of options) {
    fill(255);
    stroke(0);
    rect(opt.x - 10, opt.y - 20, 300, 50, 10);
    fill(0);
    noStroke();
    text(opt.text, opt.x, opt.y);
  }

  if (predictions.length > 0) {
    let hand = predictions[0];
    let thumb = hand.landmarks[4];
    let index = hand.landmarks[8];

    // 顯示手指點
    fill(255, 0, 0);
    ellipse(thumb[0], thumb[1], 10);
    ellipse(index[0], index[1], 10);

    // 抓取點
    let gx = (thumb[0] + index[0]) / 2;
    let gy = (thumb[1] + index[1]) / 2;

    fill(0, 255, 0);
    ellipse(gx, gy, 15);

    let d = dist(thumb[0], thumb[1], index[0], index[1]);

    // 如果兩指靠近並未選過，就開始偵測是否選到選項
    if (d < 40 && !selected) {
      for (let opt of options) {
        if (
          gx > opt.x - 10 &&
          gx < opt.x + 300 &&
          gy > opt.y - 20 &&
          gy < opt.y + 30
        ) {
          selected = true;
          if (opt.text === correctAnswer) {
            alert("✅ 答對了！");
          } else {
            alert("❌ 答錯了，答案是：" + correctAnswer);
          }
        }
      }
    }

    // 如果兩指打開，重新允許選擇
    if (d > 60) {
      selected = false;
    }
  }
}
