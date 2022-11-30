import processing.serial.*;
import oscP5.*;
import netP5.*;

Serial myPort;  // The serial port
OscP5 oscP5;
NetAddress remoteLocation;

void setup() {
  //printArray(Serial.list());    // List all the available serial ports
  int num = 2; // Select here your Bluetooth device
  myPort = new Serial(this, Serial.list()[num], 9600);
  myPort.clear();
  oscP5 = new OscP5(this,12345);
  remoteLocation = new NetAddress("127.0.0.1", 6448);
  delay(500);
}

void sendData(float[] data) {
  OscMessage msg = new OscMessage("/wek/inputs");
  msg.add(data);
  oscP5.send(msg, remoteLocation);
}

void draw() {
  while (myPort.available() > 0) {
    float[] data = new float[5];
    for (int i=0; i < 5; i = i+1){
      String inBuffer = myPort.readStringUntil('\n');
      
      if(inBuffer != null){
        String dataStr = inBuffer.substring(0, inBuffer.length()-1);
        data[i] = parseFloat(dataStr);
        print(data[i]);
        print(", ");
        
       }else{
         --i;
       }
    }
    println(" ");
    sendData(data);
  }
  delay(200);
}
