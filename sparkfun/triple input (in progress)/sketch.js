let port;
let serial;
let envelope = 0;
let audio = 0; 
let gate = 0;
let fft;
let micBuffer = []; // Store raw audio for FFT visualization



function setup() {
    createCanvas(800, 600);
    background(0);

    port = createSerial();
    port.open('/dev/tty.usbmodem1101');  // Change this to your port

    fft = new p5.FFT();  // Initialize FFT
}

function draw() {
    background(0, 50);  // Slight fade effect

    // Envelope-based circle
    let radius = map(envelope, 0, 1023, 10, 300);
    let alpha = map(envelope, 0, 1023, 50, 255);
    
    fill(0, 255, 150, alpha);
    noStroke();
    ellipse(width / 2, height / 2, radius);

    // Store raw audio in a buffer (limit to 256 samples)
    if (micBuffer.length > 256) {
        micBuffer.shift(); // Remove oldest value
    }
    micBuffer.push(map(audio, 0, 1023, -1, 1)); // Normalize

    // Perform FFT on micBuffer
    let spectrum = fft.analyze();
    
    // Draw FFT bars
    for (let i = 0; i < spectrum.length; i++) {
        let amp = spectrum[i];
        let y = map(amp, 0, 255, height, 0);
        stroke(255, 0, 150);
        line(i * 3, height, i * 3, y);
    }

    // Gate trigger effect (flash screen on loud noise)
    if (gate === 1) {
        background(255, 0, 0, 100);
    }
}

// Function to read incoming serial data
function serialEvent() {
    let data = port.readUntil("\n");
    if (data) {
        let values = data.trim().split(",");
        if (values.length === 3) {
            envelope = int(values[0]);  // Smoothed amplitude
            audio = int(values[1]);     // Raw audio signal
            gate = int(values[2]);      // Clap detection
        }
    }
}
