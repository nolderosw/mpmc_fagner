
#include <LiquidCrystal.h>
LiquidCrystal lcd(12, 11, 7, 6, 5, 4);
const int LM35 = 0;
float temperatura_atual = 0;
int ADClido = 0;
float temperatura_setada = 30;
const int led_vermelho = 8;
const int led_verde = 9;
void setup(){
 pinMode(led_vermelho, OUTPUT);
 pinMode(led_verde, OUTPUT);

 Serial.begin(115200);
 analogReference(INTERNAL); //Se estiver usando Arduino Mega, use INTERNAL1V1
 attachInterrupt(digitalPinToInterrupt(2),aumenta_temp,RISING);
 attachInterrupt(digitalPinToInterrupt(3),diminui_temp,RISING);
}
void loop(){
 ADClido = analogRead(LM35);
 temperatura_atual = ADClido * 0.1075268817204301;
 if(temperatura_atual >= temperatura_setada + 2){
    //esfria
    digitalWrite(led_verde, HIGH);
    digitalWrite(led_vermelho, LOW);
 }
 else if(temperatura_atual <=  temperatura_setada - 2){
    //aquece
    digitalWrite(led_verde, LOW);
    digitalWrite(led_vermelho, HIGH); 
 }
 else{
    //tudo desligado
    digitalWrite(led_verde, LOW);
    digitalWrite(led_vermelho, LOW);
 }
 delay(100);
 lcd.begin(16, 2);
 lcd.setCursor(0,0);
 lcd.print("Atual: ");
 lcd.print(temperatura_atual);
 lcd.print(" *C");
 lcd.setCursor(0,1);
 lcd.print("Setada: ");
 lcd.print(temperatura_setada);
 lcd.print(" *C");
 //Serial.print(float(temperatura_atual));
 //Serial.print(2);
 delay(1000);
}

void aumenta_temp(){ 
  temperatura_setada++;
}
void diminui_temp(){ 
  temperatura_setada--;
}
