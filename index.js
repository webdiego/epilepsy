let song, songDuration, button, amp, img, fs, visual, r, g, b, a;

let volHistory = [];
let highPoint = false;
var playing = false;
let reachHighPoint = false;
let currentT;
let visualization = false;
let nOFh = [];

function preload() {
  song = loadSound("./sound/Michael Klein - Dismantled Structure (Dubfire Remix) trim .mp3");
  img = loadImage("./1.jpeg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  button = createButton("play");
  button.position(0, 0);
  button.mousePressed(tooglePlay);
  button.style("color:white").style("border:none").style("background-color:black");
  visual = createButton("change visual");
  visual.position(50, 0);
  visual.mousePressed(toogleVisual);
  amp = new p5.Amplitude();
  songDuration = song.buffer.duration.toFixed(0);
}

function tooglePlay() {
  if (!song.isPlaying()) {
    song.play();
    button.html("pause");
    playing = true;
    // fullscreen(!fs);
  } else {
    song.pause();
    button.html("play");
    playing = false;
    // fullscreen(!fs);
    // fs = fullscreen();
  }
}
function toogleVisual() {
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
  let vol = amp.getLevel();
  let superBigVolume = (vol * 300).toFixed(2);
  let bigVolume = (vol * 100).toFixed(2);
  let mediumVolume = (vol * 80).toFixed(2);
  let medium2Volume = (vol * 60).toFixed(2);
  let medium3Volume = (vol * 50).toFixed(2);
  let medium4Volume = (vol * 40).toFixed(2);
  let medium5Volume = (vol * 30).toFixed(2);
  let lowVolume = (vol * 20).toFixed(2);
  let low2Volume = (vol * 10).toFixed(2);
  let low3Volume = (vol * 8).toFixed(2);
  let diameter = map(vol, 0, 0.3, 100, 200);

  // volHistory.push(bigVolume);
  bigVolume > 50 ? clear() : background(0, 0, 0);
  bigVolume > 50 ? (highPoint = true) : (highPoint = false);
  if (bigVolume > 50) {
    reachHighPoint = true;
  }

  currentT = +song.currentTime().toFixed(2);
  console.log(currentT);
  if (visualization) {
    if (!highPoint) {
      fill(0, 0, 255, 100),
        // ellipse(0, height / 2, diameter, diameter),
        // ellipse(width, height / 2, diameter, diameter),
        strokeWeight(mediumVolume),
        stroke(29, 205, 196);
      line(0, windowHeight, 200, 0);

      line(0, windowHeight / 2, windowWidth, windowHeight / 2), stroke(56, 10, 164);
      line(0, windowHeight / 2, windowWidth, windowHeight / 2), stroke(58, 58, 164);
      line(0, 0, windowWidth, windowHeight / 2), strokeWeight(lowVolume);
      stroke(19, 159, 204);
      line(0, 0, windowWidth / 2, windowHeight / 2), stroke(29, 205, 196);
      //

      line(windowWidth / 2, 0, windowWidth, windowHeight / 2), strokeWeight(lowVolume);
      stroke(28, 78, 171);
      line(windowWidth, windowHeight, windowWidth / 2, windowHeight / 4), stroke(47, 101, 202);
      line(40, windowHeight, windowWidth / 2, windowHeight / 4), strokeWeight(lowVolume);
      stroke(44, 109, 231);
      translate(lowVolume, bigVolume);
      line(windowWidth, windowHeight, windowWidth / 2.6, windowHeight / 2), strokeWeight(lowVolume);
      stroke(44, 109, 231);
      line(windowWidth / 2, windowHeight, windowWidth / 2.6, windowHeight / 2),
        strokeWeight(bigVolume);
      // ellipse(windowWidth / 2.2, windowHeight / 2.2, superBigVolume, superBigVolume),
      // line(windowWidth, windowHeight, superBigVolume, superBigVolume),
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
    //POINTS
    // w 1440 h 737
    // 720 369.toFixed(2)
    // 670  319
    // for (var x = 0; x <= windowWidth; x += 20) {
    //   for (var y = 0; y <= windowHeight; y += 20) {
    //     strokeWeight(lowVolume);
    //     fill(250, 230, 24);
    //     strokeWeight(mediumVolume);
    //     ellipse(x, y, 10, 10);
    //   }
    // }
    r = random(255);
    g = random(100, 200);
    b = random(100);
    a = random(200, 255);

    if (!highPoint) {
      if (reachHighPoint) {
        stroke(r, g, b, a);
        background(255, 255, 255);
        fill(255, 255, 255);
      } else {
        stroke(255, 255, 255);
      }

      strokeWeight(mediumVolume);
      // stroke(255, 255, 255);
      ellipse(windowWidth / 2, windowHeight / 2, windowWidth, superBigVolume);
    } else {
      strokeWeight(superBigVolume);
      // stroke(0);

      stroke(r, g, b, a);

      ellipse(windowWidth / 2, windowHeight / 2, windowWidth, superBigVolume);
    }
  }
}