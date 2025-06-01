let video;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide(); // 隱藏預設的 video 標籤
}

function draw() {
  image(video, 0, 0, width, height);
}
