let video;
let poseNet;
let poses = [];
let leftWrist = null;
let rightWrist = null;

let questions = [
  {
    question: "何者是教育科技的核心理念？",
    options: ["A. 傳統講述法", "B. 以學生為中心的學習"],
    answer: "B"
  },
  {
    question: "遊戲化學習的優點是？",
    options: ["A. 增加學習動機", "B. 減少學生參與"],
    answer: "A"
  }
];

let currentQuestion = 0;
let showFeedback = "";
let feedbackTimer = 0;
let answered = false;

function setup() {
  let cnv = createCanvas(640, 480);
  cnv.style('display', 'block');
  cnv.position((windowWidth - width) / 2, (windowHeight - height) / 2);

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

function draw() {
  background(220);
  push();
  translate(width, 0);
  scale(-1, 1); // 鏡像畫面
  image(video, 0, 0, width, height);
  pop();

  drawHands();
  drawQuestion();

  if (!answered) {
    checkHandAnswer();
  }

  if (showFeedback !== "") {
    textSize(80);
    fill(showFeedback === "O" ? "green" : "red");
    textAlign(CENTER, CENTER);
    text(showFeedback, width / 2, height / 2);
  }

  if (answered && millis() - feedbackTimer > 1000) {
    nextQuestion();
  }
}

function drawHands() {
  if (leftWrist) {
    fill(0, 255, 0);
    noStroke();
    ellipse(width - leftWrist.x, leftWrist.y, 20, 20); // 鏡像後的X
  }
  if (rightWrist) {
    fill(0, 0, 255);
    noStroke();
    ellipse(width - rightWrist.x, rightWrist.y, 20, 20);
  }
}

function drawQuestion() {
  if (currentQuestion < questions.length) {
    fill(0);
    textSize(20);
    textAlign(CENTER);
    let q = questions[currentQuestion];
    text(q.question, width / 2, 40);
    text(q.options[0], width / 4, height - 40);
    text(q.options[1], (3 * width) / 4, height - 40);
  }
}

function checkHandAnswer() {
  if (leftWrist && width - leftWrist.x < width / 3) {
    handleAnswer("A");
  } else if (rightWrist && width - rightWrist.x > 2 * width / 3) {
    handleAnswer("B");
  }
}

function handleAnswer(choice) {
  answered = true;
  let correct = questions[currentQuestion].answer;
  showFeedback = choice === correct ? "O" : "X";
  feedbackTimer = millis();
}

function nextQuestion() {
  currentQuestion++;
  showFeedback = "";
  answered = false;

  if (currentQuestion >= questions.length) {
    noLoop();
    alert("遊戲結束！你完成所有題目！");
  }
}
