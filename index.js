let song, songDuration, vol, button, visual, buttonStop, r, g, b, a, FS;
let MIC;
let AMP;
let volHistory = [];
let highPoint = false;
var playing = false;
let reachHighPoint = false;
let currentT;
let visualization = false;
let fs = false;
let microphone = false;

function preload() {
  song = loadSound('./sound/[SUARA450]Augusto Taito-Peoplear(Original Mix).mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  MIC = new p5.AudioIn();

  button = createButton('Play');
  button.position(0, 10);
  button.mousePressed(togglePlay);
  button.style('color:white').style('border:none').style('background-color:black');

  buttonStop = createButton('Stop');
  buttonStop.position(0, 30);
  buttonStop.mousePressed(() => song.stop());
  buttonStop.style('color:white').style('border:none').style('background-color:black');

  visual = createButton('Change visual');
  visual.position(0, 50);
  visual.mousePressed(toggleVisual);
  visual.style('color:white').style('border:none').style('background-color:black');

  FS = createButton('FullScreen');
  FS.position(0, 70);
  FS.mousePressed(toggleFS);
  FS.style('color:white').style('border:none').style('background-color:black');

  songDuration = song.buffer.duration.toFixed(0);
  song.stop();

  AMP = new p5.Amplitude();
}

function togglePlay() {
  if (!song.isPlaying()) {
    song.play();
    button.html('Pause');
    playing = true;
  } else {
    song.pause();
    button.html('Play');
    playing = false;
  }
}
function toggleFS() {
  fs = !fs;
  fullscreen(fs);
}

function toggleVisual() {
  if (visualization) {
    visualization = !visualization;
  } else {
    visualization = !visualization;
  }
}

// RESPONSIVE CANVAS
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// DRAW IS A LOOP

function draw() {
  vol = AMP.getLevel();

  console.log(MIC.enabled);
  let superBigVolume = (vol * 300).toFixed(2);
  let bigVolume = (vol * 100).toFixed(2);
  let mediumVolume = (vol * 80).toFixed(2);
  let lowVolume = (vol * 20).toFixed(2);
  let diameter = map(vol, 0, 0.3, 100, 200);

  bigVolume > 48 ? clear() : background(0, 0, 0);
  bigVolume > 48 ? (highPoint = true) : (highPoint = false);
  if (bigVolume > 50) {
    reachHighPoint = true;
  }

  currentT = +song.currentTime().toFixed(2);

  if (visualization) {
    if (!highPoint) {
      fill(0, 0, 255, 100), strokeWeight(mediumVolume), stroke(29, 205, 196);
      line(0, windowHeight, 200, 0);
      line(0, windowHeight / 2, windowWidth, windowHeight / 2), stroke(56, 10, 164);
      line(0, windowHeight / 2, windowWidth, windowHeight / 2), stroke(58, 58, 164);
      line(0, 0, windowWidth, windowHeight / 2);

      strokeWeight(lowVolume);
      stroke(19, 159, 204);
      line(0, 0, windowWidth / 2, windowHeight / 2), stroke(29, 205, 196);
      line(windowWidth / 2, 0, windowWidth, windowHeight / 2);

      strokeWeight(lowVolume);
      stroke(28, 78, 171);
      line(windowWidth, windowHeight, windowWidth / 2, windowHeight / 4), stroke(47, 101, 202);
      line(40, windowHeight, windowWidth / 2, windowHeight / 4), strokeWeight(lowVolume);

      stroke(44, 109, 231);
      translate(lowVolume, bigVolume);
      line(windowWidth, windowHeight, windowWidth / 2.6, windowHeight / 2), strokeWeight(lowVolume);

      stroke(44, 109, 231);
      line(windowWidth / 2, windowHeight, windowWidth / 2.6, windowHeight / 2),
        strokeWeight(bigVolume);
    }

    if (highPoint) {
      line(windowWidth * 2, windowHeight, 0, 0);
      line(windowWidth / 2, windowHeight, 0, 0);
      ellipse(windowWidth / 2, height / 2, diameter, diameter);
      line(0, windowHeight / 5, windowWidth, windowHeight / 5);
      ellipse(random(0, windowWidth), windowHeight / 10, diameter, diameter);
      rect(random(0, windowWidth), random(0, windowHeight), diameter, diameter);
    }
  } else {
    for (var x = 0; x <= windowWidth; x += 20) {
      for (var y = 0; y <= windowHeight; y += 20) {
        strokeWeight(bigVolume);
        fill(0);
        strokeWeight(vol);
        ellipse(x, y, 8, 8);
      }
    }
    r = random(255);
    g = random(100, 200);
    b = random(100);
    a = random(200, 255);
    circle(windowWidth / 2, windowHeight / 1, windowWidth, superBigVolume);

    if (!highPoint && bigVolume < 40) {
      if (reachHighPoint && bigVolume > 60) {
        stroke(0);
        background(255, 255, 255);
        stroke(r, g, b, a);
      } else {
        stroke(255, 255, 255);
      }

      strokeWeight(mediumVolume);
      // stroke(255, 255, 255);
      ellipse(windowWidth / 2, windowHeight / 2, superBigVolume, lowVolume);
      circle(windowWidth / 2, windowHeight / 2, superBigVolume, superBigVolume);
      ellipse(windowWidth / 2, height / 2, diameter, diameter);
    } else {
      strokeWeight(mediumVolume);

      fill(0);
      if (bigVolume > 50) {
        background(145, 72, 223);
      } else if (bigVolume >= 45 && bigVolume <= 47) {
        background(224, 224, 227);
      } else {
        background(255, 255, 255);
      }

      stroke(0);
      fill(0);
      circle(windowWidth / 6, windowHeight / random(0, 6), windowWidth / random(0, 3), lowVolume);
      stroke(0);
      fill(0);
      circle(windowWidth, windowHeight / 4, windowWidth / random(0, 3), bigVolume);
      fill(255, 255, 255);
      circle(windowWidth / 2, windowHeight / 2, windowWidth / 10, superBigVolume);
    }
  }
}
