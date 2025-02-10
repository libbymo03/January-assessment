var song;
var fft;
var button;


function togglesong() {
  if (song.isPlaying()) {
    song.pause();
  } else {
      song.play();
    }
  }


function preload(){
  song = loadSound("coffee.wav");
}

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
  colorMode (HSB)
  button = createButton("toggle");
  button.mousePressed(togglesong);
  song.play();
  fft = new p5.FFT(.9, 256);
}

function draw() {
  background(0);
  let spectrum = fft.analyze();
  
   
   console.log(spectrum);
   noStroke();
   translate(width / 2, height / 2);
   beginShape();
     for (var i = 0; i < spectrum.length; i++) {
     var amp = spectrum[i];
     var angle = map(i, 0, spectrum.length, 0, 360);
     let r = map(amp, 0, 256, 20, 100);
     //fill(i, 255, 255);
     let x = r * cos(angle);
     let y = r * sin(angle);
     stroke(i, 255, 255);
     line(x, y, x, y);
     vertex(x, y);
   }
 endShape();
}