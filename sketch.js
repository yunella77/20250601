let video;

function setup() {
  createCanvas(640, 480);
  // 將畫布置中
  let canvas = createCanvas(640, 480);
  canvas.parent(document.body);
  canvas.style('display', 'block');
  canvas.style('margin', 'auto');
  canvas.position(
    (windowWidth - width) / 2,
    (windowHeight - height) / 2
  );

  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();
}

function draw() {
  background(220);
  image(video, 0, 0, width, height);
}
