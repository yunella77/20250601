let video;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(640, 480);
  // video.hide(); // 先註解這行
}

function draw() {
  background(200);
  image(video, 0, 0, width, height);
}
