int envelopePin = A0; //amplitude
int audioPin = A1;       
int gatePin = 2;

void setup() {
  Serial.begin(115200); 
  pinMode(gatePin, INPUT); 
}

void loop() {
  int envelope = analogRead(envelopePin);
  int audio = analogRead(audioPin);
  int gate = digitalRead(gatePin);

  Serial.print(envelope);
  Serial.print(",");
  Serial.print(audio);
  Serial.print(",");
  Serial.println(gate);

  delay(20);
}

