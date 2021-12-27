let song, songDuration, button, amp, wave, img, x, y, fs;

let volHistory = [];
function preload() {
  song = loadSound("./sound/Tempest-trim.mp3");
  img = loadImage("./1.jpeg");
}
let highPoint = false;
var playing = false;
let reachHighPoint = false;
let wA = [];
let startTempo = 0;
function setup() {
  var w;
  let wA = [];
  createCanvas(windowWidth, windowHeight);
  button = createButton("play");
  button.position(windowWidth / 2, 0);
  button.mousePressed(tooglePlay);
  amp = new p5.Amplitude();
  songDuration = song.buffer.duration.toFixed(0);
  w = windowWidth;
  for (let i = 0; i < w; i++) {
    wA.push(i);
  }
  console.log("wa", wA);
}

function tooglePlay() {
  if (!song.isPlaying()) {
    song.play();
    button.html("pause");
    playing = true;
    fullscreen(!fs);
  } else {
    song.pause();
    button.html("play");
    playing = false;
    fullscreen(!fs);
    fs = fullscreen();
  }
}
// RESPONSIVE CANVAS
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// DRAW IS A LOOP
function draw() {
  let vol = amp.getLevel();
  let bigVolume = (vol * 100).toFixed(2);
  let mediumVolume = (vol * 80).toFixed(2);
  let diameter = map(vol, 0, 0.3, 100, 200);
  volHistory.push(bigVolume);

  bigVolume > 50 ? (highPoint = true) : (highPoint = false);
  // rectMode(CENTER);
  // if (bigVolume > 8 && bigVolume < 25) {
  //   background(18, 18, 106);
  // } else if (bigVolume > 25 && bigVolume < 50) {
  //   background(86, 7, 142);
  // }
  strokeWeight(bigVolume);
  if (playing) {
    startTempo = startTempo + 1;
  }
  // console.log("tempo", startTempo);
  if (startTempo > 100 && playing) {
    ellipse(random(0, windowWidth), random(0, windowHeight), 50);
  }
  if (startTempo > 300 && playing) {
    fill(0);
    ellipse(random(0, windowWidth), random(0, windowHeight), 120);
  }

  if (bigVolume > 50) {
    reachHighPoint = true;
    if (reachHighPoint) {
      background(103, 45, 143);
    } else {
      background(0, 0, 0);
    }
  }
  console.log(reachHighPoint);
  if (!highPoint) {
    return [
      fill(0, 0, 255, 100),
      // ellipse(0, height / 2, diameter, diameter),
      // ellipse(width, height / 2, diameter, diameter),
      stroke(29, 205, 196),
      line(0, windowHeight, 200, 0),
      line(0, windowHeight / 2, windowWidth, windowHeight / 2),
      stroke(56, 10, 164),
      line(0, windowHeight / 2, windowWidth, windowHeight / 2),
      stroke(58, 58, 164),
      line(0, 0, windowWidth, windowHeight / 2),
      stroke(19, 159, 204),
      // strokeWeight(bigVolume / 2),
      line(0, 0, windowWidth / 2, windowHeight / 2),
      stroke(29, 205, 196),
      line(windowWidth / 2, 0, windowWidth, windowHeight / 2),
      stroke(28, 78, 171),
      line(windowWidth, windowHeight, windowWidth / 2, windowHeight / 4),
      stroke(47, 101, 202),
      line(40, windowHeight, windowWidth / 2, windowHeight / 4),
      stroke(44, 109, 231),
      line(windowWidth, windowHeight, windowWidth / 2, windowHeight / 2),
    ];
  }

  if (highPoint) {
    return [
      line(windowWidth * 2, windowHeight, 0, 0),
      line(windowWidth / 2, windowHeight, 0, 0),
      ellipse(windowWidth / 2, height / 2, diameter, diameter),
      line(0, windowHeight / 5, windowWidth, windowHeight / 5),
      ellipse(random(0, windowWidth), windowHeight / 10, diameter, diameter),
      rect(random(0, windowWidth), random(0, windowHeight), diameter, diameter),
    ];
  }
}


// POINTS
//// w 1440 h 737
    // 720 369.toFixed(2)
    // 670  319
    noStroke();
    let Waround = windowWidth / 3;
    let Haround = windowHeight;
    let space = 206;

    for (var x = 0; x <= windowWidth; x += 20) {
      for (var y = 0; y <= windowHeight; y += 20) {
        if (
          y > Waround.toFixed(2) - space &&
          y < Waround.toFixed(2) + space &&
          x > Haround.toFixed(2) - space &&
          x < Haround.toFixed(2) + space
        ) {
          strokeWeight(superBigVolume);

          ellipse(x, y, diameter, vol);
        } else {
          if (highPoint) {
            fill(218, 69, 4);
            strokeWeight(mediumVolume);
            ellipse(x, y, 20, mediumVolume);
          } else {
            fill(255, 255, 255);
            strokeWeight(lowVolume);
            ellipse(x, y, 10, lowVolume);
          }
          // ellipse(x, y, 10);
        }
        // r = random(255); // r is a random number between 0 - 255
        // g = random(100, 200); // g is a random number betwen 100 - 200
        // b = random(100); // b is a random number between 0 - 100
        // a = random(200, 255); // a is a random number between 200 - 255

        // fill(r, g, b, a);

        // fill(218, 69, 4);

        // if (
        //   x > random(100, 255) &&
        //   x < random(100, 255) &&
        //   y > random(200, 255) &&
        //   y < random(200, 455)
        // ) {
        //   a = 400;
        // } else {
        //   a = 20;
        // }