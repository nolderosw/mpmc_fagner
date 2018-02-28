var app = require('express')(); //incluindo o framework express
var express = require('express');

app.use(express.static(__dirname + '/public'));

var http = require("http").Server(app);
var io = require("socket.io")(http);

app.get("/", function(req, res){
    res.sendFile("index.html");
}) 



var mySocket;
var serialport = require("serialport"); //incluindo o modulo de comunicação serial
var SerialPort = serialport.SerialPort; //instanciando o objeto serial port


var mySerial = new serialport("/dev/cu.usbserial-A403F0RK", {
    baudRate: 115200,
    parser: new serialport.parsers.Readline('\n')

}); //Comunicando com o arduino na porta "/dev/cu.usbserial-A403F0RK"

mySerial.on("open", function(){
    console.log("porta aberta");
}); //verificar se abriu a porta corretamente

var data_anterior;
mySerial.on("data", function(data){
    var prc = (parseFloat(data)/data_anterior)*100;
    //console.log(parseFloat(data));
    //console.log(data[0].toString());
    if(!(100-prc > 30) && !(prc - 100 > 30)){
        io.emit("dadoArduino", {
            valor: parseFloat(data),
        });
    }
    data_anterior = parseFloat(data);
}); //ocorre quando receber algum dado na serial

http.listen(3000, function (){
    console.log("Servidor rodando na porta 3000");
})


/* johnny five caso queira usar no futuro!!!
var five = require("johnny-five");
var board = new five.Board({ port: "/dev/cu.usbserial-A403F0RK", timeout: 3600 });

board.on("ready", function() {

  // Create a new generic sensor instance for
  // a sensor connected to an analog (ADC) pin
  var temperature = new five.Thermometer({
    controller: "LM35",
    pin: "A0"
  });

  temperature.on("change", function() {
    console.log(this.celsius + "°C");
    var temp = this.celsius;
    io.emit("dadoArduino", {
        valor: parseFloat(temp),
    });
  }),1000;
});
*/