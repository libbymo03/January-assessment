var song;
var fft;
var button;
var w;

var volhistory = [];

function togglesong() {
  if (song.isPlaying()) {
    song.pause();
  }else{
      song.play();
    }
  }


function preload(){
  song = loadSound("coffee.wav");
}

function setup() {
  createCanvas(400, 400);
  colorMode(HSB);
  angleMode(DEGREES);
  button = createButton('toggle');
  button.mousePressed(togglesong);
  song.play();
  fft = new p5.FFT(0.9, 64);
  w = width / 64;
}

function draw() {
  background(0);
  var spectrum = fft.analyze();
  stroke(255);
  for (var i = 0; i < spectrum.length; i++) {
    var amp = spectrum[i];
    var y = map(amp, 0, 256, height, 0);
    fill(i, 255, 255);
    rect(i*w, y, w, height-y);
  }
  //console.log(spectrum);
  stroke(255);
  noFill();
}
