
#include <LiquidCrystal.h>
LiquidCrystal lcd(12, 11, 5, 4, 3, 2);
const int LM35 = 0;
float temperatura_atual = 0;
int ADClido = 0;
float temperatura_setada = 5;
void setup(){
 Serial.begin(9600);
 analogReference(INTERNAL); //Se estiver usando Arduino Mega, use INTERNAL1V1
}
void loop(){
 ADClido = analogRead(LM35);
 temperatura_atual = ADClido * 0.1075268817204301;
 lcd.begin(16, 2);
 lcd.setCursor(0,0);
 lcd.print("Atual : ");
 lcd.print(temperatura_atual);
 lcd.print(" *C");
 lcd.setCursor(0,1);
 lcd.print("Setada : ");
 lcd.print(temperatura_setada);
 lcd.print(" *C");
 Serial.print(float(temperatura_atual));
 delay(1000);
}
