int envelopePin = A0; //amplitude
int sensorValue = 0;
int val = 50;

void setup() {
  Serial.begin(9600); 
}

void loop() {
  sensorValue = analogRead(envelopePin);
  int mappedValue = map(sensorValue, 0, 1023, 10, 300); // Map it to a range for the circle size
  Serial.println(mappedValue); // Send the mapped value over Serial
  delay(100);
}

