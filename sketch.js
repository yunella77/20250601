let video;
let poseNet;
let poses = [];
let leftWrist = null;
let rightWrist = null;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on('pose', function(results) {
    poses = results;
    if (poses.length > 0) {
      let pose = poses[0].pose;
      leftWrist = pose.leftWrist;
      rightWrist = pose.rightWrist;
    }
  });
}

function modelReady() {
  console.log('PoseNet ready');
}

let questions = [
  {
    question: "太陽從哪邊升起？",
    optionA: "A. 東邊",
    optionB: "B. 西邊",
    answer: "A"
  },
  {
    question: "草是什麼顏色？",
    optionA: "A. 綠色",
    optionB: "B. 紅色",
    answer: "A"
  },
  {
    question: "2+2等於？",
    optionA: "A. 4",
    optionB: "B. 5",
    answer: "A"
  }
];
let current = 0;
let selected = null;
let showResult = false;
let resultTimer = 0;

function draw() {
  image(video, 0, 0, width, height);

  // 顯示題目與選項
  fill(255);
  rect(0, height - 100, width, 100);
  fill(0);
  textSize(24);
  textAlign(CENTER, TOP);
  text(questions[current].question, width / 2, height - 90);
  textAlign(LEFT, TOP);
  text(questions[current].optionA, 20, height - 50);
  textAlign(RIGHT, TOP);
  text(questions[current].optionB, width - 20, height - 50);

  // 標記左右手
  if (!showResult) {
    if (leftWrist) {
      fill(0, 255, 0);
      noStroke();
      ellipse(leftWrist.x, leftWrist.y, 20, 20);
      if (leftWrist.x < width / 3) {
        selected = "A";
        showResult = true;
        resultTimer = millis();
      }
    }
    if (rightWrist) {
      fill(0, 0, 255);
      noStroke();
      ellipse(rightWrist.x, rightWrist.y, 20, 20);
      if (rightWrist.x > width * 2 / 3) {
        selected = "B";
        showResult = true;
        resultTimer = millis();
      }
    }
  } else {
    // 顯示選擇結果
    fill(255, 0, 0);
    textSize(32);
    textAlign(CENTER, CENTER);
    if (selected === questions[current].answer) {
      text("O", width / 2, height / 2);
    } else {
      text("X", width / 2, height / 2);
    }
    // 1秒後自動切換到下一題
    if (millis() - resultTimer > 1000) {
      current++;
      if (current >= questions.length) current = 0; // 循環題目
      selected = null;
      showResult = false;
    }
  }
}
