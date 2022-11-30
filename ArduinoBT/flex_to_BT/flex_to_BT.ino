#include <SoftwareSerial.h>

#define AR_SIZE 3
#define FLEX_NUM 5
boolean bBluetooth = true;
SoftwareSerial SerialBT(2, 3); // RX, TX
String myV[AR_SIZE][FLEX_NUM] = {{"1", "2", "3", "4", "5"},{"1.1", "2.2", "3.3", "4.4", "5.5"},{"10", "20", "30", "40", "50"}};
//importante guardar los flex values como strings (em processing ya los pasaremos a float)

void setup() {
  Serial.begin(9600);
  
  if(bBluetooth) SerialBT.begin(9600);

}

void loop() {
  SerialBT.flush();
  if(bBluetooth)  {
    for (int i=0; i<AR_SIZE; ++i){
      for (int j=0; j<FLEX_NUM; ++j){
        SerialBT.println(myV[i][j]);
        delay(200);
      }
    }
  } 
  //}
  delay(200);

  
}
