let port; 
let connectBtn;
let myVal = 0;

function setup() {
  createCanvas(400, 400);

  port = createSerial();

  connectBtn = createButton('Connect to Arduino');
  connectBtn.position(20, 360);
  connectBtn.mousePressed(connectBtnClick);

}

function draw() {
  background(220);
  fill(50);
  rect(50, 50, 50, 50);

  let val = port.readUntil("\n"); //read each line

  if (val.length > 0) {
    myVal = val; // Update circle size with new value
    text(val, 20, 20);
  }

  circle(200, 200, myVal);

}

function connectBtnClick() {
  if (!port.opened()) {
    port.open('Arduino', 9600);
  } else {
    port.close();
  }
}